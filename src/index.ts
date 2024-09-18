import { registerPlugin } from '@capacitor/core';

import type { QonversionPlugin } from './definitions';

const Qonversion = registerPlugin<QonversionPlugin>('Qonversion', {
  web: () => import('./web').then(m => new m.QonversionWeb()),
});

export * from './definitions';
export { Qonversion };
