import deepmerge from 'deepmerge';
export function withUI(tailwindConfig) {
    return deepmerge(tailwindConfig, {
        content: ['../../packages/ui/lib/**/*.{tsx,ts,js,jsx}'],
    });
}
