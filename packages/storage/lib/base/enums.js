/**
 * Storage area type for persisting and exchanging data.
 * @see https://developer.chrome.com/docs/extensions/reference/storage/#overview
 */
export var StorageEnum;
(function (StorageEnum) {
    /**
     * Persist data locally against browser restarts. Will be deleted by uninstalling the extension.
     * @default
     */
    StorageEnum["Local"] = "local";
    /**
     * Uploads data to the users account in the cloud and syncs to the users browsers on other devices. Limits apply.
     */
    StorageEnum["Sync"] = "sync";
    /**
     * Requires an [enterprise policy](https://www.chromium.org/administrators/configuring-policy-for-extensions) with a
     * json schema for company wide config.
     */
    StorageEnum["Managed"] = "managed";
    /**
     * Only persist data until the browser is closed. Recommended for service workers which can shutdown anytime and
     * therefore need to restore their state. Set {@link SessionAccessLevelEnum} for permitting content scripts access.
     * @implements Chromes [Session Storage](https://developer.chrome.com/docs/extensions/reference/storage/#property-session)
     */
    StorageEnum["Session"] = "session";
})(StorageEnum || (StorageEnum = {}));
/**
 * Global access level requirement for the {@link StorageEnum.Session} Storage Area.
 * @implements Chromes [Session Access Level](https://developer.chrome.com/docs/extensions/reference/storage/#method-StorageArea-setAccessLevel)
 */
export var SessionAccessLevelEnum;
(function (SessionAccessLevelEnum) {
    /**
     * Storage can only be accessed by Extension pages (not Content scripts).
     * @default
     */
    SessionAccessLevelEnum["ExtensionPagesOnly"] = "TRUSTED_CONTEXTS";
    /**
     * Storage can be accessed by both Extension pages and Content scripts.
     */
    SessionAccessLevelEnum["ExtensionPagesAndContentScripts"] = "TRUSTED_AND_UNTRUSTED_CONTEXTS";
})(SessionAccessLevelEnum || (SessionAccessLevelEnum = {}));
