function generateCode() {
  const MIN = 1000;
  const MAX = 9999;

  return Math.floor(Math.random() * (MIN - MAX + 1)) + MAX;
}

module.exports = { generateCode };
