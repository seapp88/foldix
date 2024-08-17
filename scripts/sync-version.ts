import { fileURLToPath } from 'url';

import { resolve, dirname } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

interface TauriConfig {
    package: {
        version: string;
    };
}

// Define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Reading the version from package.json
const packageJsonPath = resolve(__dirname, '../package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

// Path to tauri.conf.json
const tauriConfigPath = resolve(__dirname, '../src-tauri/tauri.conf.json');

// Reading and parsing tauri.conf.json
const tauriConfig: TauriConfig = JSON.parse(readFileSync(tauriConfigPath, 'utf-8'));

// Updating the version in tauri.conf.json
tauriConfig.package.version = packageJson.version;

// Writing the updated tauri.conf.json
writeFileSync(tauriConfigPath, JSON.stringify(tauriConfig, null, 2));

console.log(`Version successfully synchronized: ${packageJson.version}`);