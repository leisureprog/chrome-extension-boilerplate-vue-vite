import fs from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import process from 'node:process';
import { colorLog, ManifestParser } from '@extension/dev-utils';
const rootDir = resolve(__dirname, '..', '..');
const manifestFile = resolve(rootDir, 'manifest.js');
const getManifestWithCacheBurst = async () => {
    const withCacheBurst = (path) => `${path}?${Date.now().toString()}`;
    /**
     * In Windows, import() doesn't work without file:// protocol.
     * So, we need to convert path to file:// protocol. (url.pathToFileURL)
     */
    if (process.platform === 'win32') {
        return import(withCacheBurst(pathToFileURL(manifestFile).href));
    }
    return import(withCacheBurst(manifestFile));
};
export default function makeManifestPlugin(config) {
    function makeManifest(manifest, to) {
        if (!fs.existsSync(to)) {
            fs.mkdirSync(to);
        }
        const manifestPath = resolve(to, 'manifest.json');
        fs.writeFileSync(manifestPath, ManifestParser.convertManifestToString(manifest, false));
        colorLog(`Manifest file copy complete: ${manifestPath}`, 'success');
    }
    return {
        name: 'make-manifest',
        buildStart() {
            this.addWatchFile(manifestFile);
        },
        async writeBundle() {
            const outDir = config.outDir;
            const manifest = await getManifestWithCacheBurst();
            makeManifest(manifest.default, outDir);
        },
    };
}
