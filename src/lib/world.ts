// Stations of the desk world, left to right, and which one a hash lives on.
// The head script in Base.astro repeats stationOf inline, so keep the two in step.
export const STATIONS = ['left', 'center', 'right'] as const;
export type Station = (typeof STATIONS)[number];

export const stationOf = (hash: string): Station | null =>
  /^#(about|contact)$/.test(hash)
    ? 'left'
    : /^#(work|projects)$/.test(hash) || hash.startsWith('#/work/')
      ? 'right'
      : /^#(home|skills)$/.test(hash)
        ? 'center'
        : null;

// Hero USB cable in the desk world, in board units: up out of CN1, left along CABLE_Y, then a
// smooth drop to the laptop port at (x, y).
export const CABLE_Y = -250;
export const usbLeft = (x: number, y: number) => {
  const bend = Math.max(-80, x + 420);
  return (
    `M1015 -160C1015 ${CABLE_Y + 40} 1000 ${CABLE_Y} 940 ${CABLE_Y}L${bend} ${CABLE_Y}` +
    `C${bend - 230} ${CABLE_Y} ${bend - 190} ${y} ${bend - 420} ${y}L${x} ${y}`
  );
};

// Station and scroll position remembered per history entry, so back and forward land exactly where
// that entry was left. Astro numbers its entries in history.state.index; the path guards against
// two separate page loads that both start at index 0.
export type Pos = { y: number; st: Station };
const posKey = () => `rk-pos:${history.state?.index ?? 0}:${location.pathname}${location.search}`;
export const writePos = (y: number, st: string | undefined) => {
  try {
    sessionStorage.setItem(posKey(), JSON.stringify({ y: Math.round(y), st: STATIONS.includes(st as Station) ? st : 'center' }));
  } catch {
    /* storage blocked: back lands where the router puts it */
  }
};
export const readPos = (): Pos | null => {
  try {
    const v = JSON.parse(sessionStorage.getItem(posKey()) ?? 'null');
    return v && typeof v.y === 'number' && STATIONS.includes(v.st) ? v : null;
  } catch {
    return null;
  }
};
