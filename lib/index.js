module.exports = function(fileInfo, api, options) {
  const j = api.jscodeshift;

  return j(file.source)
      .find(j.MethodDefinition, {key: {name: 'constructor'}})
      .forEach(path => {
        //alert(path.node.value.params)
        path.node.value.params.push(j.identifier('ss'));
//      j(path).replaceWith(

        //      j.identifier(path.node.name.split('').reverse().join(''))
        //  );
      }).toSource();
};
