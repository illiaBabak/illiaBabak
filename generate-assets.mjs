import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const techDir = path.join(root, "assets", "tech");
const iconDir = path.join(root, "assets", "icons");

const technologies = [
  { file: "javascript", name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { file: "typescript", name: "TypeScript", slug: "typescript", color: "3178C6" },
  { file: "react", name: "React", slug: "react", color: "61DAFB" },
  { file: "nextjs", name: "Next.js", slug: "nextdotjs", color: "8B949E" },
  { file: "tailwind", name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { file: "redux", name: "Redux Toolkit", slug: "redux", color: "764ABC" },
  { file: "tanstack-query", name: "TanStack Query", slug: "reactquery", color: "FF4154" },
  { file: "babylonjs", name: "Babylon.js", slug: "babylondotjs", color: "BB464B" },
  { file: "php", name: "PHP", slug: "php", color: "8892BF" },
  { file: "laravel", name: "Laravel", slug: "laravel", color: "FF2D20" },
  { file: "nodejs", name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { file: "express", name: "Express", slug: "express", color: "8B949E" },
  { file: "prisma", name: "Prisma", slug: "prisma", color: "6E7FDB" },
  { file: "docker", name: "Docker", slug: "docker", color: "2496ED" },
  { file: "kubernetes", name: "Kubernetes", slug: "kubernetes", color: "326CE5" },
  { file: "terraform", name: "Terraform", slug: "terraform", color: "844FBA" },
  { file: "aws", name: "AWS", custom: "aws", color: "FF9900" },
  { file: "nginx", name: "Nginx", slug: "nginx", color: "009639" },
  { file: "circleci", name: "CircleCI", slug: "circleci", color: "8B949E" },
  { file: "linux", name: "Linux", slug: "linux", color: "FCC624" },
  { file: "react-native", name: "React Native", slug: "react", color: "61DAFB" },
  { file: "expo", name: "Expo", slug: "expo", color: "8B949E" },
  { file: "postgresql", name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { file: "mysql", name: "MySQL", slug: "mysql", color: "4479A1" },
  { file: "mongodb", name: "MongoDB", slug: "mongodb", color: "47A248" },
  { file: "redis", name: "Redis", slug: "redis", color: "FF4438" },
  { file: "supabase", name: "Supabase", slug: "supabase", color: "3FCF8E" },
  { file: "firebase", name: "Firebase", slug: "firebase", color: "FFCA28" },
  { file: "cypress", name: "Cypress", slug: "cypress", color: "69D3A7" },
  { file: "jest", name: "Jest", slug: "jest", color: "C21325" },
  { file: "testing-library", name: "Testing Library", slug: "testinglibrary", color: "E33332" },
  { file: "pest", name: "Pest", custom: "pest", color: "8B949E" },
];

const customMarks = {
  aws: `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <text x="2.3" y="14.6" fill="currentColor" stroke="none" font-family="Arial, Helvetica, sans-serif" font-size="12.2" font-weight="700" letter-spacing="-.8">aws</text>
    <path d="M4 18.2c4.8 2.6 10.4 2.8 15.7.3" stroke-width="1.6"/>
    <path d="M17.6 17.3l2.8.5-1.4 2.4" stroke-width="1.35"/>
  </g>`,
  pest: `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 3.5h7.1a5.4 5.4 0 0 1 0 10.8H9.4v6.2H6z" stroke-width="2.1"/>
    <path d="M9.4 7.2h3.5a1.7 1.7 0 1 1 0 3.4H9.4z" stroke-width="1.7"/>
    <path d="M17.7 16.2l2.4 2.4m0-2.4-2.4 2.4" stroke-width="1.5"/>
  </g>`,
  linkedin: `<g fill="currentColor">
    <rect x="2" y="8.5" width="4" height="13.5" rx=".7"/>
    <circle cx="4" cy="4" r="2.25"/>
    <path d="M9 8.5h3.9v1.85c1.2-1.45 2.85-2.3 5.05-2.3 3.7 0 5.55 2.25 5.55 6.6V22h-4.15v-6.8c0-2.25-.8-3.35-2.55-3.35-2.2 0-3.3 1.45-3.3 4.3V22H9z"/>
  </g>`,
  gmail: `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6.5l9 7 9-7" stroke-width="2.1"/>
    <path d="M4.5 5h15A2.5 2.5 0 0 1 22 7.5v10A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-10A2.5 2.5 0 0 1 4.5 5z" stroke-width="2"/>
  </g>`,
};

async function fetchMark(slug) {
  const response = await fetch(`https://cdn.simpleicons.org/${slug}/FFFFFF`);
  if (!response.ok) throw new Error(`Could not fetch ${slug}: ${response.status}`);
  const svg = await response.text();
  return svg
    .replace(/^.*?<svg[^>]*>/s, "")
    .replace(/<title>.*?<\/title>/s, "")
    .replace(/<\/svg>\s*$/s, "")
    .replaceAll(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="currentColor"');
}

function tileSvg({ name, color, mark }) {
  return `<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title">
  <title id="title">${name}</title>
  <defs>
    <linearGradient id="bg" x1="8" y1="3" x2="65" y2="69" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1A2230"/>
      <stop offset="1" stop-color="#0B1017"/>
    </linearGradient>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientTransform="translate(36 3) rotate(90) scale(49)" gradientUnits="userSpaceOnUse">
      <stop stop-color="#${color}" stop-opacity=".24"/>
      <stop offset="1" stop-color="#${color}" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="0" y="0" width="72" height="72" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity=".42"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <rect x="5" y="4" width="62" height="62" rx="15" fill="url(#bg)"/>
    <rect x="5" y="4" width="62" height="62" rx="15" fill="url(#glow)"/>
    <rect x="5.5" y="4.5" width="61" height="61" rx="14.5" stroke="#A8B3C4" stroke-opacity=".17"/>
    <path d="M21 4.5h30" stroke="#${color}" stroke-opacity=".55" stroke-linecap="round"/>
  </g>
  <g transform="translate(20 20) scale(1.333333)" color="#${color}" fill="currentColor">
    ${mark}
  </g>
</svg>
`;
}

function bareIconSvg({ name, color, mark }) {
  return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title">
  <title id="title">${name}</title>
  <g transform="translate(8 8) scale(1.333333)" color="#${color}" fill="currentColor">
    ${mark}
  </g>
</svg>\n`;
}

function miniTile(technology, x, y, size = 58) {
  const logoSize = 28;
  const scale = logoSize / 24;
  const offset = (size - logoSize) / 2;
  return `<g>
    <title>${technology.name}</title>
    <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="14" fill="#151D28" stroke="#9FB0C5" stroke-opacity=".16"/>
    <rect x="${x + 1}" y="${y + 1}" width="${size - 2}" height="${size - 2}" rx="13" fill="#${technology.color}" fill-opacity=".035"/>
    <path d="M${x + 18} ${y + 1}h${size - 36}" stroke="#${technology.color}" stroke-opacity=".7" stroke-linecap="round"/>
    <g transform="translate(${x + offset} ${y + offset}) scale(${scale})" color="#${technology.color}" fill="currentColor">
      ${technology.mark}
    </g>
  </g>`;
}

function stackBoardSvg(technologyMap) {
  const escapeXml = (value) => value.replaceAll("&", "&amp;");
  const cards = [
    {
      x: 12, y: 12, width: 572, height: 220,
      title: "Frontend", subtitle: "Interfaces, state & interaction", accent: "22D3EE",
      items: ["typescript", "javascript", "react", "nextjs", "tailwind", "redux", "tanstack-query", "babylonjs"],
      columns: 4, size: 58, gapX: 22, gapY: 18,
    },
    {
      x: 600, y: 12, width: 388, height: 220,
      title: "Backend", subtitle: "APIs, services & data access", accent: "A78BFA",
      items: ["php", "laravel", "nodejs", "express", "prisma"],
      columns: 3, size: 58, gapX: 22, gapY: 18,
    },
    {
      x: 12, y: 248, width: 976, height: 190,
      title: "DevOps & Infrastructure", subtitle: "Build, deploy, scale & operate", accent: "60A5FA",
      items: ["docker", "kubernetes", "terraform", "aws", "nginx", "circleci", "linux"],
      columns: 7, size: 62, gapX: 31, gapY: 0,
    },
    {
      x: 12, y: 454, width: 236, height: 224,
      title: "Mobile", subtitle: "Native experiences", accent: "38BDF8",
      items: ["react-native", "expo"],
      columns: 2, size: 62, gapX: 22, gapY: 0,
    },
    {
      x: 264, y: 454, width: 470, height: 224,
      title: "Databases", subtitle: "Relational, document & cache", accent: "34D399",
      items: ["postgresql", "mysql", "mongodb", "redis", "supabase", "firebase"],
      columns: 3, size: 58, gapX: 24, gapY: 18,
    },
    {
      x: 750, y: 454, width: 238, height: 224,
      title: "Testing", subtitle: "Confidence by default", accent: "FB7185",
      items: ["cypress", "jest", "testing-library", "pest"],
      columns: 2, size: 58, gapX: 22, gapY: 18,
    },
  ];

  const cardMarkup = cards.map((card) => {
    const rows = Math.ceil(card.items.length / card.columns);
    const rowWidths = Array.from({ length: rows }, (_, row) => {
      const count = Math.min(card.columns, card.items.length - row * card.columns);
      return count * card.size + Math.max(0, count - 1) * card.gapX;
    });
    const gridTop = card.y + 82;
    const icons = card.items.map((file, index) => {
      const row = Math.floor(index / card.columns);
      const column = index % card.columns;
      const rowStart = card.x + (card.width - rowWidths[row]) / 2;
      const x = rowStart + column * (card.size + card.gapX);
      const y = gridTop + row * (card.size + card.gapY);
      return miniTile(technologyMap.get(file), x, y, card.size);
    }).join("\n");

    return `<g>
      <rect x="${card.x}" y="${card.y}" width="${card.width}" height="${card.height}" rx="24" fill="url(#cardBg)" stroke="#A7B4C6" stroke-opacity=".16"/>
      <rect x="${card.x + 1}" y="${card.y + 1}" width="${card.width - 2}" height="${card.height - 2}" rx="23" fill="#${card.accent}" fill-opacity=".025"/>
      <path d="M${card.x + 24} ${card.y + 1}h${Math.min(92, card.width - 48)}" stroke="#${card.accent}" stroke-width="2" stroke-linecap="round"/>
      <text x="${card.x + 24}" y="${card.y + 35}" fill="#E6EDF3" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="18" font-weight="700">${escapeXml(card.title)}</text>
      <text x="${card.x + 24}" y="${card.y + 57}" fill="#7D8999" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="12">${escapeXml(card.subtitle)}</text>
      ${icons}
    </g>`;
  }).join("\n");

  return `<svg width="1000" height="690" viewBox="0 0 1000 690" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
    <title id="title">Tech Stack and Tools</title>
    <desc id="desc">Bento grid of frontend, backend, infrastructure, mobile, database and testing technologies</desc>
    <defs>
      <linearGradient id="cardBg" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#141C27"/>
        <stop offset="1" stop-color="#0B1118"/>
      </linearGradient>
    </defs>
    ${cardMarkup}
  </svg>\n`;
}

function heroSvg() {
  return `<svg width="1000" height="300" viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">Illia Babak</title>
  <desc id="desc">Full-Stack and Mobile Software Engineer</desc>
  <defs>
    <linearGradient id="background" x1="60" y1="10" x2="950" y2="300" gradientUnits="userSpaceOnUse">
      <stop stop-color="#141B26"/>
      <stop offset=".52" stop-color="#0D1117"/>
      <stop offset="1" stop-color="#111827"/>
    </linearGradient>
    <radialGradient id="cyan" cx="0" cy="0" r="1" gradientTransform="translate(164 40) rotate(58) scale(310 430)" gradientUnits="userSpaceOnUse">
      <stop stop-color="#22D3EE" stop-opacity=".19"/>
      <stop offset="1" stop-color="#22D3EE" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="violet" cx="0" cy="0" r="1" gradientTransform="translate(860 260) rotate(-130) scale(330 420)" gradientUnits="userSpaceOnUse">
      <stop stop-color="#8B5CF6" stop-opacity=".2"/>
      <stop offset="1" stop-color="#8B5CF6" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0V32" stroke="#8B949E" stroke-opacity=".055"/>
    </pattern>
    <linearGradient id="accent" x1="320" y1="0" x2="680" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#22D3EE"/>
      <stop offset=".5" stop-color="#60A5FA"/>
      <stop offset="1" stop-color="#A78BFA"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>
  <rect x="1" y="1" width="998" height="298" rx="27" fill="url(#background)"/>
  <rect x="1" y="1" width="998" height="298" rx="27" fill="url(#cyan)"/>
  <rect x="1" y="1" width="998" height="298" rx="27" fill="url(#violet)"/>
  <rect x="1" y="1" width="998" height="298" rx="27" fill="url(#grid)"/>
  <rect x="1.5" y="1.5" width="997" height="297" rx="26.5" stroke="#B6C2D2" stroke-opacity=".18"/>
  <rect x="392" y="36" width="216" height="32" rx="16" fill="#161E2A" stroke="#7DD3FC" stroke-opacity=".25"/>
  <circle cx="413" cy="52" r="4" fill="#34D399"/>
  <text x="430" y="57" fill="#AAB6C5" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="12" font-weight="600" letter-spacing="1.7">SOFTWARE ENGINEER</text>
  <text x="500" y="132" fill="#F0F6FC" text-anchor="middle" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="55" font-weight="760" letter-spacing="-2.4">Illia Babak</text>
  <rect x="326" y="149" width="348" height="2" rx="1" fill="url(#accent)" opacity=".9"/>
  <text x="500" y="188" fill="#CDD6E2" text-anchor="middle" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="20" font-weight="520" letter-spacing=".4">Full-Stack &amp; Mobile Software Engineer</text>
  <text x="500" y="224" fill="#8D99A8" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="14" letter-spacing=".55">React · Next.js · Laravel · Node.js · Cloud Infrastructure</text>
  <g transform="translate(384 248)">
    <circle cx="5" cy="7" r="3" fill="#60A5FA"/>
    <text x="18" y="12" fill="#7D8999" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="13">Based in Poland · Building across web, mobile &amp; cloud</text>
  </g>
</svg>
`;
}

function neonTile(technology, x, y) {
  return `<g>
    <title>${technology.name}</title>
    <rect x="${x + 10}" y="${y + 10}" width="52" height="52" rx="15" fill="#${technology.color}" fill-opacity=".22" filter="url(#softGlow)"/>
    <rect class="tile-bg" x="${x + 6}" y="${y + 6}" width="60" height="60" rx="15" stroke="#${technology.color}" stroke-opacity=".42"/>
    <rect x="${x + 6.5}" y="${y + 6.5}" width="59" height="59" rx="14.5" fill="#${technology.color}" fill-opacity=".055" stroke="#F0F6FC" stroke-opacity=".07"/>
    <path d="M${x + 22} ${y + 6.5}h28" stroke="#${technology.color}" stroke-opacity=".8" stroke-linecap="round"/>
    <g transform="translate(${x + 20} ${y + 20}) scale(1.333333)" color="#${technology.color}" fill="currentColor">
      ${technology.mark}
    </g>
  </g>`;
}

function techStackSvg(technologyMap) {
  const groups = [
    { label: "Frontend", x: 25, y: 0, width: 900, items: ["typescript", "javascript", "react", "nextjs", "tailwind", "redux", "tanstack-query", "babylonjs"], gap: 10 },
    { label: "Backend", x: 25, y: 150, width: 560, items: ["php", "laravel", "nodejs", "express", "prisma"], gap: 10 },
    { label: "Mobile", x: 620, y: 150, width: 305, items: ["react-native", "expo"], gap: 14 },
    { label: "DevOps & Infrastructure", x: 25, y: 300, width: 900, items: ["docker", "kubernetes", "terraform", "aws", "nginx", "circleci", "linux"], gap: 12 },
    { label: "Databases", x: 25, y: 450, width: 560, items: ["postgresql", "mysql", "mongodb", "redis", "supabase", "firebase"], gap: 8 },
    { label: "Testing", x: 620, y: 450, width: 305, items: ["cypress", "jest", "testing-library", "pest"], gap: 6 },
  ];

  const markup = groups.map((group) => {
    const rowWidth = group.items.length * 72 + (group.items.length - 1) * group.gap;
    let x = group.x + (group.width - rowWidth) / 2;
    const tiles = group.items.map((file) => {
      const result = neonTile(technologyMap.get(file), Math.round(x), group.y + 48);
      x += 72 + group.gap;
      return result;
    }).join("\n");
    const safeLabel = group.label.replaceAll("&", "&amp;");
    return `<g>
      <text class="section-title" x="${group.x}" y="${group.y + 22}" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="16" font-weight="650">${safeLabel}</text>
      <line class="section-line" x1="${group.x}" y1="${group.y + 37}" x2="${group.x + group.width}" y2="${group.y + 37}"/>
      ${tiles}
    </g>`;
  }).join("\n");

  return `<svg width="950" height="585" viewBox="0 0 950 585" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
    <title id="title">Tech Stack and Tools</title>
    <desc id="desc">Frontend, backend, mobile, infrastructure, database and testing technologies</desc>
    <style>
      .section-title { fill: #CDD9E5; }
      .section-line { stroke: #444C56; stroke-opacity: .72; }
      .tile-bg { fill: #161C24; }
      @media (prefers-color-scheme: light) {
        .section-title { fill: #24292F; }
        .section-line { stroke: #D0D7DE; }
        .tile-bg { fill: #F6F8FA; }
      }
    </style>
    <defs>
      <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3.5"/>
      </filter>
    </defs>
    ${markup}
  </svg>\n`;
}

function accentLineSvg() {
  return `<svg width="280" height="2" viewBox="0 0 280 2" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="accent" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse"><stop stop-color="#22D3EE"/><stop offset=".52" stop-color="#60A5FA"/><stop offset="1" stop-color="#A78BFA"/></linearGradient></defs>
    <rect width="280" height="2" rx="1" fill="url(#accent)"/>
  </svg>\n`;
}

function contactSvg(label, color, iconMark) {
  const width = label === "LinkedIn" ? 150 : 126;
  return `<svg width="${width}" height="40" viewBox="0 0 ${width} 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${width}" y2="40" gradientUnits="userSpaceOnUse">
      <stop stop-color="#18212D"/><stop offset="1" stop-color="#0D121A"/>
    </linearGradient>
  </defs>
  <rect x=".75" y=".75" width="${width - 1.5}" height="38.5" rx="12" fill="url(#bg)" stroke="#${color}" stroke-opacity=".4" stroke-width="1.5"/>
  <g transform="translate(13 10) scale(.833333)" fill="#${color}">${iconMark}</g>
  <text x="44" y="25.5" fill="#E6EDF3" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="14" font-weight="650">${label}</text>
</svg>
`;
}

await mkdir(techDir, { recursive: true });
await mkdir(iconDir, { recursive: true });

const renderedTechnologies = new Map();
for (const technology of technologies) {
  const mark = technology.custom
    ? customMarks[technology.custom]
    : await fetchMark(technology.slug);
  renderedTechnologies.set(technology.file, { ...technology, mark });
  await writeFile(
    path.join(iconDir, `${technology.file}.svg`),
    bareIconSvg({ ...technology, mark }),
    "utf8",
  );
}

await writeFile(
  path.join(root, "assets", "tech-stack.svg"),
  techStackSvg(renderedTechnologies),
  "utf8",
);
await writeFile(
  path.join(root, "assets", "accent-line.svg"),
  accentLineSvg(),
  "utf8",
);

console.log(`Generated ${technologies.length + 2} SVG assets.`);
