import type { ManifestParserInterface, Manifest } from './type'

export const ManifestParserImpl: ManifestParserInterface = {
  convertManifestToString: (manifest, env) => {
    return JSON.stringify(manifest, null, 2)
  },
}
