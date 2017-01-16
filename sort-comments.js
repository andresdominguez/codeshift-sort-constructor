const sortComments = comments => {
  const lines = comments.split('\n');
  let currentParam = null;
  const params = [];

  lines.find((line, i) => {
    if (line.match(/\s\\*\s*@param/)) {
      if (currentParam) {
        params.push(currentParam);
      }
      currentParam = {start: i, lines: []};
    } else if (line.match(/\s\\*\s*@/)) {
      return true;
    }

    if (currentParam) {
      currentParam.lines.push(line);
    }
  });
  if (currentParam) {
    params.push(currentParam);
  }

  console.log(params);

  return comments;
};

module.exports = sortComments;
