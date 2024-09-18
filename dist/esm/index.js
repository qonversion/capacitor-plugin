import { registerPlugin } from '@capacitor/core';
const Qonversion = registerPlugin('Qonversion', {
    web: () => import('./web').then(m => new m.QonversionWeb()),
});
export * from './definitions';
export { Qonversion };
//# sourceMappingURL=index.js.map