import { WebPlugin } from '@capacitor/core';
import type { QonversionPlugin } from './definitions';
export declare class QonversionWeb extends WebPlugin implements QonversionPlugin {
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
}
