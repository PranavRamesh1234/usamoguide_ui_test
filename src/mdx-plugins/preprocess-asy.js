/*eslint-disable */

const ASY_BLOCK_RE = /\[asy\]\s*([\s\S]*?)\s*\[\/asy\]/g;

function trimBlock(value) {
  return value.replace(/^\s*\n|\n\s*$/g, '');
}

function escapeForJsx(value) {
  return JSON.stringify(value ?? '');
}

function preprocessAsyBlocks(markdown) {
  if (typeof markdown !== 'string' || markdown.indexOf('[asy]') === -1) {
    return markdown;
  }

  return markdown.replace(ASY_BLOCK_RE, (_match, code) => {
    const normalizedCode = trimBlock(code);
    return `<AsyDiagram code={${escapeForJsx(normalizedCode)}} />`;
  });
}

module.exports = preprocessAsyBlocks;