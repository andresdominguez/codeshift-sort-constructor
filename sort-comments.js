const isParam = line => line.match(/\s\\*\s*@param/);

/**
 * Get the param name from: @param [{type}] <paramName>
 * @param {{lines: Array<string>}} param
 */
const paramName = param => {
  return param.lines[0].match(/(?:@param\s+{.+}|@param)\s+(\w+)/).pop();
};

const collectParams = function(lines) {
  let currentParam = null;
  const params = [];

  lines.find((line, i) => {
    if (isParam(line)) {
      if (currentParam) {
        params.push(currentParam);
      }
      currentParam = {start: i, lines: []};
    } else if (line.match(/\s\\*\s*@/)) {
      // All @params should be grouped together. If you find another tag stop.
      return true;
    }

    if (currentParam) {
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

  return lines.map(l => l.replace(/^\s+/g, '')).join(('\n'));
};

const sortComments = comments => {
  const lines = comments.split('\n');
  const params = collectParams(lines);
  if (params.length === 0) {
    return comments;
  }
  return replaceCommentLines(params, lines);
};

module.exports = sortComments;
