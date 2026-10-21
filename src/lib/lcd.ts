// 2002 character LCD in the hero: geometry, HD44780-style glyphs and the lit-dot path,
// shared by the server render and the client boot log.

// module and its viewing window (local coordinates inside the module)
export const LCD = { w: 500, h: 176 };
// where the module lies, in board units, and its scale: large on the desk world, where it must still
// clear the cable, the switch and the link strip at 1024 wide; smaller in the stacked layout
export const PLACES = [
  { layout: 'world', x: 1095, y: -300, s: 1.28 },
  { layout: 'stack', x: 1100, y: -200, s: 1 },
] as const;
export const WIN = { x: 22, y: 40, w: 456, h: 108 };
// 5x8 dot cells: dot pitch D, a one-dot gap between characters and between the two rows
export const D = 3.6;
export const DOT = 3;
export const COLS = 20;
export const TX = WIN.x + (WIN.w - (COLS * 6 - 1) * D) / 2;
export const TY = WIN.y + (WIN.h - 17 * D) / 2;
export const CELLS = Array.from({ length: COLS * 2 }, (_, i) => [TX + (i % COLS) * 6 * D, TY + Math.floor(i / COLS) * 9 * D]);

// seven rows of five bits; the eighth row is the cursor line
const FONT: Record<string, number[]> = {
  A: [14, 17, 17, 17, 31, 17, 17], B: [30, 17, 17, 30, 17, 17, 30], C: [14, 17, 16, 16, 16, 17, 14],
  D: [28, 18, 17, 17, 17, 18, 28], E: [31, 16, 16, 30, 16, 16, 31], F: [31, 16, 16, 30, 16, 16, 16],
  G: [14, 17, 16, 23, 17, 17, 15], H: [17, 17, 17, 31, 17, 17, 17], I: [14, 4, 4, 4, 4, 4, 14],
  J: [7, 2, 2, 2, 2, 18, 12], K: [17, 18, 20, 24, 20, 18, 17], L: [16, 16, 16, 16, 16, 16, 31],
  M: [17, 27, 21, 21, 17, 17, 17], N: [17, 17, 25, 21, 19, 17, 17], O: [14, 17, 17, 17, 17, 17, 14],
  P: [30, 17, 17, 30, 16, 16, 16], Q: [14, 17, 17, 17, 21, 18, 13], R: [30, 17, 17, 30, 20, 18, 17],
  S: [15, 16, 16, 14, 1, 1, 30], T: [31, 4, 4, 4, 4, 4, 4], U: [17, 17, 17, 17, 17, 17, 14],
  V: [17, 17, 17, 17, 17, 10, 4], W: [17, 17, 17, 21, 21, 21, 10], X: [17, 17, 10, 4, 10, 17, 17],
  Y: [17, 17, 17, 10, 4, 4, 4], Z: [31, 1, 2, 4, 8, 16, 31], x: [0, 0, 17, 10, 4, 10, 17],
  0: [14, 17, 19, 21, 25, 17, 14], 1: [4, 12, 4, 4, 4, 4, 14], 2: [14, 17, 1, 2, 4, 8, 31],
  3: [31, 2, 4, 2, 1, 17, 14], 4: [2, 6, 10, 18, 31, 2, 2], 5: [31, 16, 30, 1, 1, 17, 14],
  6: [6, 8, 16, 30, 17, 17, 14], 7: [31, 1, 2, 4, 8, 8, 8], 8: [14, 17, 17, 14, 17, 17, 14],
  9: [14, 17, 17, 15, 1, 2, 12], ':': [0, 12, 12, 0, 12, 12, 0], '.': [0, 0, 0, 0, 0, 12, 12],
  '-': [0, 0, 0, 31, 0, 0, 0], '/': [0, 1, 2, 4, 8, 16, 0],
};

// lit dots for two 16-character lines, as one path
export const frame = (a: string, b: string) =>
  [a, b]
    .flatMap((line, r) =>
      [...line.slice(0, COLS)].flatMap((ch, c) =>
        (FONT[ch] ?? []).flatMap((bits, y) =>
          [0, 1, 2, 3, 4]
            .filter((x) => bits & (16 >> x))
            .map((x) => `M${+(TX + (c * 6 + x) * D).toFixed(1)} ${+(TY + (r * 9 + y) * D).toFixed(1)}h${DOT}v${DOT}h-${DOT}z`),
        ),
      ),
    )
    .join('');

// a line centred in the 20 columns
const mid = (t: string) => t.padStart(t.length + ((COLS - t.length) >> 1)).padEnd(COLS);
export const NAME = mid('ROHITH KALISETTI');
export const TAG = mid('EMBEDDED FIRMWARE');
export const LOG = ['RK-FW1 REV A', 'RST: POWER-ON', 'CLK: PLL LOCKED', 'I2C1: 0x27 ACK', 'RTOS: SCHED UP', 'APP: READY'];
