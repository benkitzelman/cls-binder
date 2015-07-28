module.exports.bind = function bind(fn) {
  var callback = fn;

  Object.keys(process.namespaces || {}).forEach(function (name) {
    callback = process.namespaces[ name ].bind( callback );
  });

  return callback;
}