const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

const ensureDir = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const readJson = (fileName, fallback) => {
  try {
    ensureDir();
    const filePath = path.join(dataDir, fileName);
    if (!fs.existsSync(filePath)) {
      return fallback;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Failed to read ${fileName}`, error);
    return fallback;
  }
};

const writeJson = (fileName, data) => {
  ensureDir();
  const filePath = path.join(dataDir, fileName);
  const tempPath = `${filePath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tempPath, filePath);
};

module.exports = {
  dataDir,
  readJson,
  writeJson,
};
