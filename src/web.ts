import { WebPlugin } from '@capacitor/core';

import type { QonversionPlugin } from './definitions';

export class QonversionWeb extends WebPlugin implements QonversionPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
