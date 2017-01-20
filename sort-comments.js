/**
 * Tests if a line is a param
 * @param {string} line
 * @return {boolean}
 */
const isParam = line => line.match(/\s\\*\s*@param/);

/**
 * Get the param name from: @param [{type}] <paramName>
 * @param {{lines: Array<string>}} param
 */
const paramName = param => {
  // Merge all the lines.
  const match = param.lines
      .map(line => line.replace(/^[\s]*[*]/, ''))
      .join('')
      .match(/(?:@param\s+\{.+}|@param)\s+([^\s]+)/);
  return match ? match.pop() : ''
};

/**
 * Find all the params and turn then into an array of objects.
 * @param {Array<string>} lines Raw text in the comments.
 * @return {Array<{line: number, lines: Array<string>}>}
 */
const collectParams = function(lines) {
  let currentParam = null;
  const params = [];

  lines.find((line, i) => {
    if (isParam(line)) {
      if (currentParam) {
        params.push(currentParam);
      }
      currentParam = {start: i, lines: []};
    } else if (line.match(/\s\\*\s*@/) && currentParam) {
      // All @params should be grouped together. If you find another tag stop.
      return true;
    }

    const trimmed = line.trim();
    const isEmpty = trimmed === '*' || trimmed === '';
    if (currentParam && !isEmpty) {
      currentParam.lines.push(line);
    }
  });
  if (currentParam) {
    params.push(currentParam);
  }

  return params;
};

const replaceCommentLines = function(params, lines) {
  let replacingLine = params[0].start;

  params
      .sort((a, b) => paramName(a) > paramName(b))
      .forEach(param =>
          param.lines.forEach(line => lines[replacingLine++] = line));

  return lines
      .map(l => l.replace(/^\s\s/, '')) // Remove leading spaces.
      .join(('\n'));
};

const sortComments = comments => {
  const lines = comments.split('\n');
  const params = collectParams(lines);
  if (params.length === 0) {
    return null;
  }
  return replaceCommentLines(params, lines);
};

module.exports = sortComments;
