// Record address i of a chip: base + i * 0x10, printed without the 0x.
// "0x0800_C2A4" -> 0800_C2A4, 0800_C2B4, ...; "0x50:1A40" -> 50:1A40, 50:1A50, ...
export const hexAt = (base: string, i: number) => {
  const raw = base.replace(/^0x/i, '');
  const hex = (n: number, w: number) => n.toString(16).toUpperCase().padStart(w, '0');
  if (raw.includes(':')) {
    const [dev, off] = raw.split(':');
    return `${dev}:${hex(parseInt(off, 16) + 16 * i, off.length)}`;
  }
  const v = hex(parseInt(raw.replace(/_/g, ''), 16) + 16 * i, 8);
  return `${v.slice(0, 4)}_${v.slice(4)}`;
};
