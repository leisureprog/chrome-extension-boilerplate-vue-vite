import { createStorage, StorageEnum } from '../base/index.js';
const storage = createStorage('theme-storage-key', 'light', {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
});
// You can extend it with your own methods
export const exampleThemeStorage = {
    ...storage,
    toggle: async () => {
        await storage.set(currentTheme => {
            return currentTheme === 'light' ? 'dark' : 'light';
        });
    },
};
