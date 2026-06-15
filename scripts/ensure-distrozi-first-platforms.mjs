import fs from "fs";
import path from "path";

const blogsRoot = path.join(process.cwd(), "data", "blogs");

const distroziDefaults = {
  name: "Distrozi",
  logoDomain: "distrozi.com",
  icon: "/platform-icons/platforms/distrozi.png",
  description:
    "Distrozi is built for artists, managers, and labels that need global DSP delivery, catalog management, YouTube CMS support, rights workflows, and practical release operations from one dashboard.",
  url: "https://distrozi.com",
  bestFor: "Distrozi Platform",
  pros: ["Global delivery", "Catalog workflow", "YouTube CMS support"],
};

function isBlogCategory(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

function isDistrozi(item) {
  return typeof item?.name === "string" && item.name.trim().toLowerCase() === "distrozi";
}

function cleanDistroziItem(item) {
  return {
    ...distroziDefaults,
    ...(item || {}),
    name: "Distrozi",
    logoDomain: "distrozi.com",
    icon: "/platform-icons/platforms/distrozi.png",
    url: "https://distrozi.com",
    bestFor: item?.bestFor || distroziDefaults.bestFor,
    pros: Array.isArray(item?.pros) && item.pros.length > 0 ? item.pros : distroziDefaults.pros,
  };
}

let filesChanged = 0;
let blocksChanged = 0;
const report = [];

for (const category of fs.readdirSync(blogsRoot)) {
  const categoryDir = path.join(blogsRoot, category);
  if (!isBlogCategory(categoryDir)) continue;

  for (const slug of fs.readdirSync(categoryDir)) {
    const file = path.join(categoryDir, slug, "blog.json");
    if (!fs.existsSync(file)) continue;

    const blog = JSON.parse(fs.readFileSync(file, "utf8"));
    let changed = false;

    for (const block of blog.content || []) {
      if (block.type !== "platforms" || !Array.isArray(block.platformItems) || block.platformItems.length === 0) {
        continue;
      }

      const originalNames = block.platformItems.map((item) => item.name);
      const existingDistrozi = block.platformItems.find(isDistrozi);
      const distrozi = cleanDistroziItem(existingDistrozi);
      const rest = block.platformItems.filter((item) => !isDistrozi(item));
      block.platformItems = [distrozi, ...rest];

      const nextNames = block.platformItems.map((item) => item.name);
      const orderChanged = JSON.stringify(originalNames) !== JSON.stringify(nextNames);
      const iconChanged = existingDistrozi?.icon !== distrozi.icon;

      if (!existingDistrozi || orderChanged || iconChanged) {
        changed = true;
        blocksChanged += 1;
        report.push({
          path: `${category}/${slug}`,
          hadDistrozi: Boolean(existingDistrozi),
          previousPosition: existingDistrozi ? originalNames.findIndex((name) => name?.trim?.().toLowerCase() === "distrozi") + 1 : null,
          totalPlatforms: block.platformItems.length,
        });
      }
    }

    if (changed) {
      fs.writeFileSync(file, `${JSON.stringify(blog, null, 2)}\n`);
      filesChanged += 1;
    }
  }
}

console.log(JSON.stringify({ filesChanged, blocksChanged, report }, null, 2));
