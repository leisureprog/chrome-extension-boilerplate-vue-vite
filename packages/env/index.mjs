import { baseEnv, dynamicEnvValues } from './lib/index.js';
export * from './lib/const.js';
export * from './lib/index.js';
const env = {
    ...baseEnv,
    ...dynamicEnvValues,
};
export default env;
