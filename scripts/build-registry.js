#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.dirname(__dirname);

// Read the main registry.json file
const registryPath = path.join(projectRoot, 'registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

// Ensure public/r directory exists
const publicRDir = path.join(projectRoot, 'public', 'r');
if (!fs.existsSync(publicRDir)) {
  fs.mkdirSync(publicRDir, { recursive: true });
}

// Generate individual JSON files for each component
registry.items.forEach((item) => {
  // Read and embed the actual file content for each file entry
  const filesWithContent = item.files.map((file) => {
    const srcPath = path.join(projectRoot, file.path);
    let content = '';
    if (fs.existsSync(srcPath)) {
      content = fs.readFileSync(srcPath, 'utf-8');
    } else {
      console.warn(`  ⚠ File not found: ${file.path}`);
    }
    return {
      path: file.path,
      content,
      type: file.type,
      target: file.target || '',
    };
  });

  const componentJson = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: item.name,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies || [],
    registryDependencies: item.registryDependencies || [],
    files: filesWithContent,
    type: item.type,
  };

  const filePath = path.join(publicRDir, `${item.name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(componentJson, null, 4) + '\n');
  console.log(`✓ Generated ${item.name}.json`);
});

console.log(`\n✅ Registry build complete! ${registry.items.length} components processed.`);
