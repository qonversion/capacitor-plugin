export interface QonversionPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
