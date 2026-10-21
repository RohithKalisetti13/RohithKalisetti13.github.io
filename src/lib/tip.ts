// One floating tip over the whole desk, shared by the bench units and the skill parts: on the preferred
// side of its target. It flips only when the screen has no room and the other side covers neither the
// target nor any of the given neighbours.
export type Side = 'above' | 'below';

let tip: HTMLElement | null = null;
export const hideTip = () => tip?.classList.remove('on');

export const showTip = (r: DOMRect, html: string, prefer: Side, others: DOMRect[] = []) => {
  if (!tip?.isConnected) {
    tip = document.createElement('div');
    tip.className = 'bb-tip';
    tip.setAttribute('aria-hidden', 'true');
    document.body.append(tip);
  }
  tip.innerHTML = html;
  const nav = document.querySelector('.nav')?.getBoundingClientRect().bottom ?? 0;
  const w = tip.offsetWidth;
  const h = tip.offsetHeight;
  const cx = r.left + r.width / 2;
  const left = Math.min(Math.max(8, cx - w / 2), innerWidth - w - 8);
  const at = (side: Side) => (side === 'above' ? r.top - 12 - h : r.bottom + 12);
  const clear = (y: number) => [r, ...others].every((q) => left >= q.right || left + w <= q.left || y >= q.bottom || y + h <= q.top);
  const ok = (side: Side) => at(side) >= nav + 4 && at(side) + h <= innerHeight - 4 && clear(at(side));
  const sides: Side[] = prefer === 'above' ? ['above', 'below'] : ['below', 'above'];
  const side = sides.find(ok) ?? sides[0];
  tip.dataset.side = side;
  tip.style.left = `${left}px`;
  tip.style.top = `${at(side)}px`;
  tip.style.setProperty('--arrow', `${cx - left}px`);
  tip.classList.add('on');
};

window.addEventListener('scroll', hideTip, { passive: true });
window.addEventListener('rk:world-moved', hideTip);
document.addEventListener('astro:before-swap', hideTip);
