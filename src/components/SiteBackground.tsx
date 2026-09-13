const BG_LEFT = "#48A9F5";
const BG_RIGHT = "#7152D2";

/**
 * Letter-S divider from reference glyph directions:
 *   top-left entry → top bowl swings right → diagonal UR→LL →
 *   bottom-left apex → bottom bowl swings right → bottom-right exit
 *
 * Wide 3:1 viewBox + full-bleed SVG so fills reach viewport edges.
 */
const H = 887;
const W = 2661; // 3:1 — height-fill on normal/wide screens
const CX = W / 2;
const amp = H / 3;

const P0 = { x: CX - amp * 0.2, y: 0 };
const P1 = { x: CX + amp * 0.55, y: H * 0.22 };
const P2 = { x: CX - amp * 0.08, y: H * 0.5 };
const P3 = { x: CX - amp * 0.55, y: H * 0.78 };
const P4 = { x: CX + amp * 0.2, y: H };

const BLUE_PATH = [
  `M 0 0`,
  `L ${P0.x} ${P0.y}`,
  `C ${P0.x + amp * 0.55} 0, ${P1.x} ${P1.y - H * 0.08}, ${P1.x} ${P1.y}`,
  `C ${P1.x} ${P1.y + H * 0.12}, ${P2.x + amp * 0.25} ${P2.y - H * 0.08}, ${P2.x} ${P2.y}`,
  `C ${P2.x - amp * 0.25} ${P2.y + H * 0.08}, ${P3.x} ${P3.y - H * 0.12}, ${P3.x} ${P3.y}`,
  `C ${P3.x} ${P3.y + H * 0.08}, ${P4.x - amp * 0.55} ${H}, ${P4.x} ${P4.y}`,
  `L 0 ${H}`,
  `Z`,
].join(" ");

const SiteBackground = () => (
  <div aria-hidden="true" className="laya-site-bg" style={{ backgroundColor: BG_LEFT }}>
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMin slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={W} height={H} fill={BG_RIGHT} />
      <path d={BLUE_PATH} fill={BG_LEFT} />
    </svg>
  </div>
);

export default SiteBackground;
