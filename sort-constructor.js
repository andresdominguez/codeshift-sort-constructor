const sortComments = require('./sort-comments');

const getComments = node => {
  const constructorComments = node.comments;
  if (constructorComments && constructorComments.length) {
    return constructorComments[0].value;
  }
};

module.exports = function(file, api, options) {
  const j = api.jscodeshift;

  return j(file.source)
      .find(j.MethodDefinition, {key: {name: 'constructor'}})
      .forEach(path => {
        const node = path.node;

        // No @ngInject? Skip.
        const comments = getComments(node);
        if (!comments || !comments.match(/@ngInject/)) {
          return;
        }

        // Sort param in alphabetical order.
        node.value.params.sort((a, b) => a.name > b.name);

        // Sort comments. Null means there is nothing to sort.
        const sorted = sortComments(comments);
        if (sorted) {
          node.comments[0] = j.commentBlock(sorted);
        }

      }).toSource();
};
