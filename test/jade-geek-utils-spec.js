(function(describe, it, beforeEach, expect, jgUtils){
  "use strict";
  var sourceObj;

  beforeEach(function(){
    sourceObj = {
      prop1: "value 1",
      prop2: "value 2",
      objectProp: {
        subprop1: "sub-value 1",
        subprop2: "sub-value 2"
      }
    };
  });
  describe("Object Flattener", function(){

    it("finds properties at top level", function(){
      var config = {
        property1: "prop1",
        property2: "prop2"
      };
      var result = jgUtils.flattenObject(sourceObj, config);
      expect(result).not.toBeNull();
      expect(result.property1).toBe("value 1");
    });

    it("finds properties in sub-objects", function(){
      var config = {
        property1: "objectProp.subprop2"
      };
      var result = jgUtils.flattenObject(sourceObj, config);
      expect(result).not.toBeNull();
      expect(result.property1).toBe("sub-value 2");
    });

  });

  describe("Object extender", function(){
    it("copies primitive properties", function(){
      var destination = {};
      var result = jgUtils.extendObject(destination, sourceObj);
      expect(result).not.toBeNull();
      expect(result).not.toBeUndefined();
      expect(result.prop1).toBe(sourceObj.prop1);
    });
    it("does a shallow copy of object properties", function(){
      var destination = {};
      var result = jgUtils.extendObject(destination, sourceObj);
      expect(result.objectProp).toBe(sourceObj.objectProp);
      sourceObj.objectProp.subprop1 = "test value";
      expect(result.objectProp.subprop1).toBe("test value");
    });
  });
})(describe, it, beforeEach, expect, window.jadeGeek.utils);
