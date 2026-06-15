import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "data", "blogs");

const countryWords = [
  "argentina",
  "brazil",
  "mexico",
  "france",
  "germany",
  "india",
  "kenya",
  "nigeria",
  "philippines",
  "africa",
  "canada",
  "usa",
  "uk",
  "indonesia",
  "italy",
];

function normalizePlatformName(name) {
  return String(name || "")
    .toLowerCase()
    .replace(new RegExp(`\\b(${countryWords.join("|")})\\b`, "g"), "")
    .replace(/\b(digital|music|distribution|distributor|for artists)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

let filesChanged = 0;
let removedCount = 0;
const removed = [];

for (const category of fs.readdirSync(root)) {
  const categoryDir = path.join(root, category);
  if (!fs.statSync(categoryDir).isDirectory()) continue;

  for (const slug of fs.readdirSync(categoryDir)) {
    const file = path.join(categoryDir, slug, "blog.json");
    if (!fs.existsSync(file)) continue;

    const blog = JSON.parse(fs.readFileSync(file, "utf8"));
    let changed = false;

    for (const [blockIndex, block] of (blog.content || []).entries()) {
      if (block.type !== "platforms" || !Array.isArray(block.platformItems)) continue;

      const seen = new Map();
      const nextItems = [];

      for (const item of block.platformItems) {
        const key = normalizePlatformName(item.name);
        if (key && seen.has(key)) {
          removedCount += 1;
          changed = true;
          removed.push({
            path: `${category}/${slug}`,
            blockIndex,
            kept: seen.get(key),
            removed: item.name,
          });
          continue;
        }

        seen.set(key, item.name);
        nextItems.push(item);
      }

      block.platformItems = nextItems;
    }

    if (changed) {
      fs.writeFileSync(file, `${JSON.stringify(blog, null, 2)}\n`);
      filesChanged += 1;
    }
  }
}

console.log(JSON.stringify({ filesChanged, removedCount, removed }, null, 2));
