module.exports = function(file, api, options) {
  const j = api.jscodeshift;

  return j(file.source)
      .find(j.MethodDefinition, {key: {name: 'constructor'}})
      .forEach(path => {
        path.node.value.params.sort((a, b) => a.name > b.name);
      }).toSource();
};
