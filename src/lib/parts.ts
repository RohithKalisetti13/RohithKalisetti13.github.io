// Where each bench part sits inside its project unit, in board units (10 = one hole pitch).
// Origin: the unit's first column. Top-half parts put their header on row a and rise over the rail;
// bottom-half parts put it on row j and hang over the lower rail. Pins land on multiples of 10.
export type PartKind = 'msa311' | 'wifi' | 'crystal' | 'adxl335' | 'hcsr04' | 'matrix' | 'swd' | 'oled' | 'camera';
export type Box = { x: number; y: number; w: number; h: number };

export const PART_BOX: Record<PartKind, Box> = {
  msa311: { x: 26, y: -42, w: 80, h: 48 },
  wifi: { x: 22, y: -42, w: 88, h: 48 },
  crystal: { x: 22, y: -30, w: 88, h: 36 },
  adxl335: { x: 22, y: -42, w: 78, h: 48 },
  hcsr04: { x: 16, y: -42, w: 100, h: 48 },
  matrix: { x: 34, y: -6, w: 64, h: 52 },
  swd: { x: 30, y: -6, w: 64, h: 46 },
  oled: { x: 30, y: -6, w: 72, h: 52 },
  camera: { x: 34, y: -6, w: 64, h: 52 },
};

// shared parts in the same unit frame: tact switch legs on columns 0 and 2, a 220R from column 3 to 7,
// a 5 mm LED on columns 8 and 9; dy is the switch row offset from the header row (b or i)
export const BUTTON = { cx: 10, dy: 20 };
export const RESISTOR = { x0: 30, x1: 70, dy: 20 };
export const LED = { cx: 85, dy: 20 };
