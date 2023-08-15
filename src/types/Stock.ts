export type Stock = {
  code: string;
  name: string;
  criteria: "PBR" | "ES" | null;
  current: number;
  previous: number | undefined;
  volume: number;
  col_5ema?: number;
  col_20ema?: number;
  col_9rsi?: number;
  col_14rsi?: number;
  pbr: number;
  roe: number;
};
