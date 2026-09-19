import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const techDir = path.join(root, "assets", "tech");

const technologies = [
  { file: "javascript", name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { file: "typescript", name: "TypeScript", slug: "typescript", color: "3178C6" },
  { file: "react", name: "React", slug: "react", color: "61DAFB" },
  { file: "nextjs", name: "Next.js", slug: "nextdotjs", color: "F0F6FC" },
  { file: "tailwind", name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { file: "redux", name: "Redux Toolkit", slug: "redux", color: "764ABC" },
  { file: "tanstack-query", name: "TanStack Query", slug: "reactquery", color: "FF4154" },
  { file: "babylonjs", name: "Babylon.js", slug: "babylondotjs", color: "BB464B" },
  { file: "php", name: "PHP", slug: "php", color: "8892BF" },
  { file: "laravel", name: "Laravel", slug: "laravel", color: "FF2D20" },
  { file: "nodejs", name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { file: "express", name: "Express", slug: "express", color: "F0F6FC" },
  { file: "prisma", name: "Prisma", slug: "prisma", color: "D8E2EF" },
  { file: "docker", name: "Docker", slug: "docker", color: "2496ED" },
  { file: "kubernetes", name: "Kubernetes", slug: "kubernetes", color: "326CE5" },
  { file: "terraform", name: "Terraform", slug: "terraform", color: "844FBA" },
  { file: "aws", name: "AWS", custom: "aws", color: "FF9900" },
  { file: "nginx", name: "Nginx", slug: "nginx", color: "009639" },
  { file: "circleci", name: "CircleCI", slug: "circleci", color: "F0F6FC" },
  { file: "linux", name: "Linux", slug: "linux", color: "FCC624" },
  { file: "react-native", name: "React Native", slug: "react", color: "61DAFB" },
  { file: "expo", name: "Expo", slug: "expo", color: "F0F6FC" },
  { file: "postgresql", name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { file: "mysql", name: "MySQL", slug: "mysql", color: "4479A1" },
  { file: "mongodb", name: "MongoDB", slug: "mongodb", color: "47A248" },
  { file: "redis", name: "Redis", slug: "redis", color: "FF4438" },
  { file: "supabase", name: "Supabase", slug: "supabase", color: "3FCF8E" },
  { file: "firebase", name: "Firebase", slug: "firebase", color: "FFCA28" },
  { file: "cypress", name: "Cypress", slug: "cypress", color: "69D3A7" },
  { file: "jest", name: "Jest", slug: "jest", color: "C21325" },
  { file: "testing-library", name: "Testing Library", slug: "testinglibrary", color: "E33332" },
  { file: "pest", name: "Pest", custom: "pest", color: "F0F6FC" },
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
    <filter id="shadow" x="-10" y="-8" width="92" height="96" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="7" stdDeviation="6" flood-color="#000" flood-opacity=".34"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <rect x="1" y="1" width="70" height="70" rx="17" fill="url(#bg)"/>
    <rect x="1" y="1" width="70" height="70" rx="17" fill="url(#glow)"/>
    <rect x="1.5" y="1.5" width="69" height="69" rx="16.5" stroke="#A8B3C4" stroke-opacity=".17"/>
    <path d="M19 1.5h34" stroke="#${color}" stroke-opacity=".55" stroke-linecap="round"/>
  </g>
  <g transform="translate(20 20) scale(1.333333)" color="#${color}" fill="currentColor">
    ${mark}
  </g>
</svg>
`;
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

for (const technology of technologies) {
  const mark = technology.custom
    ? customMarks[technology.custom]
    : await fetchMark(technology.slug);
  await writeFile(
    path.join(techDir, `${technology.file}.svg`),
    tileSvg({ ...technology, mark }),
    "utf8",
  );
}

await writeFile(path.join(root, "assets", "hero.svg"), heroSvg(), "utf8");
await writeFile(
  path.join(root, "assets", "contact-linkedin.svg"),
  contactSvg("LinkedIn", "4DA3FF", customMarks.linkedin),
  "utf8",
);
await writeFile(
  path.join(root, "assets", "contact-email.svg"),
  contactSvg("Email", "FF6B5F", customMarks.gmail),
  "utf8",
);

console.log(`Generated ${technologies.length + 3} SVG assets.`);
