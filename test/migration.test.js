const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(target) : [target];
  });
}

test('migration has no PHP runtime files', () => {
  const phpFiles = filesIn(root).filter((file) => file.endsWith('.php'));
  assert.deepEqual(phpFiles, []);
});

test('migration uses the expected Express structure', () => {
  for (const relativePath of ['server.js', 'src/app.js', 'src/config/db.js', 'src/routes', 'src/controllers', 'src/middleware', 'public/index.html']) {
    assert.equal(fs.existsSync(path.join(root, relativePath)), true, relativePath);
  }
});
