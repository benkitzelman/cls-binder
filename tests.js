var assert = require("assert");
var clsBinder = require('./index');


callback = function() { return "Callback called"}

namespace = function(id) {
  var message = null;
  return {
    toString: function() { return message; },
    bind: function( fn ) {
      message = "NS" + id + " is bound";
      return fn;
    }
  }
};

describe('CLS-Binder', function() {
  describe('If no namespaces exist', function() {
    before( function(){
      delete process.namespaces
    });

    it('should not throw an error', function () {
      fn = clsBinder.bind( callback );
      assert.equal( fn(), "Callback called" );
    });

  });

  describe('If one namespace exists', function() {
    before( function(){
      process.namespaces = [ namespace(1) ]
    });

    it('should bind the namespace to the fn', function () {
      fn = clsBinder.bind( callback );

      for(var i = 0; i < process.namespaces.length; i++) {
        ns = process.namespaces[ i ];
        assert.equal( ns.toString(), "NS" + (i + 1) + " is bound" );
      }
      assert.equal( fn(), "Callback called" );
    });

  });

  describe('If more than one namespace exists', function() {
    before( function(){
      process.namespaces = [ namespace(1), namespace(2) ]
    });

    describe('for all namespaces', function(){
      it('should bind all the namespaces to the fn', function () {
        fn = clsBinder.bind( callback );

        for(var i = 0; i < process.namespaces.length; i++) {
          ns = process.namespaces[ i ];
          assert.equal( ns.toString(), "NS" + (i + 1) + " is bound" );
        }
        assert.equal( fn(), "Callback called" );
      });
    });
  });
});