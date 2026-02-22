'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, children, ...props }: DottedSurfaceProps) {
	const { theme } = useTheme();

	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		particles: THREE.Points[];
		animationId: number;
		count: number;
	} | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		const width = container.clientWidth || window.innerWidth;
		const height = container.clientHeight || window.innerHeight;

		const SEPARATION = 120;
		const AMOUNTX = 50;
		const AMOUNTY = 50;

		// Clean up any existing canvas (handles React StrictMode double-mount)
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}

		// Scene setup
		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(
			75,
			width / height,
			1,
			10000,
		);
		camera.position.set(0, 250, 900);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(width, height);
		renderer.setClearColor(0x000000, 0);

		container.appendChild(renderer.domElement);

		// Create particles
		const particles: THREE.Points[] = [];
		const positions: number[] = [];
		const colors: number[] = [];

		// Create geometry for all particles
		const geometry = new THREE.BufferGeometry();

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				const y = 0; // Will be animated
				const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

				positions.push(x, y, z);
				if (theme === 'dark') {
					colors.push(1.0, 1.0, 1.0);
				} else {
					colors.push(0.2, 0.2, 0.2);
				}
			}
		}

		geometry.setAttribute(
			'position',
			new THREE.Float32BufferAttribute(positions, 3),
		);
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		// Create a circle texture so dots render as circles, not squares
		const circleCanvas = document.createElement('canvas');
		circleCanvas.width = 64;
		circleCanvas.height = 64;
		const ctx = circleCanvas.getContext('2d')!;
		ctx.beginPath();
		ctx.arc(32, 32, 28, 0, Math.PI * 2);
		ctx.fillStyle = '#ffffff';
		ctx.fill();
		const circleTexture = new THREE.CanvasTexture(circleCanvas);

		// Create material
		const material = new THREE.PointsMaterial({
			size: 6,
			map: circleTexture,
			vertexColors: true,
			transparent: true,
			opacity: 0.9,
			sizeAttenuation: true,
			depthWrite: false,
		});

		// Create points object
		const points = new THREE.Points(geometry, material);
		scene.add(points);

		let count = 0;
		let animationId: number = 0;

		// Animation function
		const animate = () => {
			animationId = requestAnimationFrame(animate);

			const positionAttribute = geometry.attributes.position;
			const positions = positionAttribute.array as Float32Array;

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					const index = i * 3;

					// Animate Y position with sine waves
					positions[index + 1] =
						Math.sin((ix + count) * 0.3) * 50 +
						Math.sin((iy + count) * 0.5) * 50;

					i++;
				}
			}

			positionAttribute.needsUpdate = true;

			// Update point sizes based on wave
			const customMaterial = material as THREE.PointsMaterial & {
				uniforms?: any;
			};
			if (!customMaterial.uniforms) {
				// For dynamic size changes, we'd need a custom shader
				// For now, keeping constant size for performance
			}

			renderer.render(scene, camera);
			count += 0.1;
		};

		// Handle window resize
		const handleResize = () => {
			const w = container.clientWidth || window.innerWidth;
			const h = container.clientHeight || window.innerHeight;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};

		window.addEventListener('resize', handleResize);

		// Start animation
		animate();

		// Store references
		sceneRef.current = {
			scene,
			camera,
			renderer,
			particles: [points],
			animationId,
			count,
		};

		// Cleanup function
		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationId);

			// Clean up Three.js objects
			scene.traverse((object) => {
				if (object instanceof THREE.Points) {
					object.geometry.dispose();
					if (Array.isArray(object.material)) {
						object.material.forEach((m) => m.dispose());
					} else {
						object.material.dispose();
					}
				}
			});

			circleTexture.dispose();
			renderer.dispose();

			if (container && renderer.domElement.parentNode === container) {
				container.removeChild(renderer.domElement);
			}

			sceneRef.current = null;
		};
	}, [theme]);

	return (
		<div
			className={cn('relative overflow-hidden', className)}
			{...props}
		>
			<div
				ref={containerRef}
				className="pointer-events-none absolute inset-0 -z-0"
			/>
			{children && (
				<div className="relative z-10">{children}</div>
			)}
		</div>
	);
}
