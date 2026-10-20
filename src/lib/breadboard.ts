// Geometry of the 830-point breadboard on the bench, in board units: 10 units = one 0.1" hole pitch.
// Every hole has a coordinate here, so legs, leads and jumpers land on real holes.
export const PITCH = 10;
export const COLS = 63;
export const BB_W = 680;
export const BB_H = 196;

export type Row = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j';
export const ROWS: Row[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
const ROW_Y: Record<Row, number> = { a: 42, b: 52, c: 62, d: 72, e: 82, f: 110, g: 120, h: 130, i: 140, j: 150 };

export const colX = (c: number) => 30 + (c - 1) * PITCH;
export const rowY = (r: Row) => ROW_Y[r];
export const hole = (c: number, r: Row) => ({ x: colX(c), y: rowY(r) });

// centre channel between e and f
export const GROOVE = { y0: 89, y1: 103 };

// power rails: two rows each, holes in groups of five with a gap after every group
export type Rail = 'top+' | 'top-' | 'bot+' | 'bot-';
const RAIL_Y: Record<Rail, number> = { 'top+': 11, 'top-': 21, 'bot+': 171, 'bot-': 181 };
export const RAIL_LINES = { topRed: 5, topBlue: 27, botRed: 165, botBlue: 187 };
export const RAIL_COLS = Array.from({ length: 10 }, (_, g) => Array.from({ length: 5 }, (_, k) => 3 + g * 6 + k)).flat();
export const railHole = (c: number, r: Rail) => ({ x: colX(c), y: RAIL_Y[r] });

// every hole on the board, for anything that wants to enumerate them
export const HOLES = [
  ...ROWS.flatMap((r) => Array.from({ length: COLS }, (_, i) => ({ id: `${r}${i + 1}`, ...hole(i + 1, r) }))),
  ...(Object.keys(RAIL_Y) as Rail[]).flatMap((r) => RAIL_COLS.map((c) => ({ id: `${r}${c}`, ...railHole(c, r) }))),
];
