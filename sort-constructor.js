const sortComments = require('./sort-comments');

module.exports = function(file, api, options) {
  const j = api.jscodeshift;

  return j(file.source)
      .find(j.MethodDefinition, {key: {name: 'constructor'}})
      .forEach(path => {
        const node = path.node;

        // Sort param in alphabetical order.
        node.value.params.sort((a, b) => a.name > b.name);

        // Sort the comments, if any.
        const constructorComments = node.comments;
        if (constructorComments && constructorComments.length) {
          // Null means there is nothing to sort.
          const sorted = sortComments(constructorComments[0].value);
          if (sorted) {
            node.comments[0] = j.commentBlock(sorted);
          }
        }
      }).toSource();
};
