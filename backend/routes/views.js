const express = require('express');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '../data/views.json');
const DEFAULT_VIEWS = 1482;

// Count lives in memory; the file is only the persistence layer.
let views = loadViews();
let writing = false;
let pendingWrite = false;

function loadViews() {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return Number.isInteger(data.views) && data.views >= 0 ? data.views : DEFAULT_VIEWS;
  } catch (err) {
    if (err.code !== 'ENOENT') console.error('Error reading views file:', err.message);
    return DEFAULT_VIEWS;
  }
}

// Write to a temp file then rename, so a crash mid-write can't corrupt the
// count. Concurrent increments are coalesced into one follow-up write.
async function persistViews() {
  if (writing) {
    pendingWrite = true;
    return;
  }
  writing = true;
  try {
    await fs.promises.mkdir(path.dirname(DATA_FILE), { recursive: true });
    const tmp = `${DATA_FILE}.tmp`;
    await fs.promises.writeFile(tmp, JSON.stringify({ views }, null, 2));
    await fs.promises.rename(tmp, DATA_FILE);
  } catch (err) {
    console.error('Error writing views file:', err.message);
  } finally {
    writing = false;
    if (pendingWrite) {
      pendingWrite = false;
      persistViews();
    }
  }
}

// One counted visit per IP per 30 minutes, so refreshes and scripts can't inflate it.
const incrementLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  limit: 1,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (req, res) => res.json({ views, incremented: false }),
});

// GET /api/views - return current count
router.get('/', (req, res) => {
  res.json({ views });
});

// POST /api/views/increment - increment count
router.post('/increment', incrementLimiter, (req, res) => {
  views += 1;
  persistViews();
  res.json({ views, incremented: true });
});

module.exports = router;
