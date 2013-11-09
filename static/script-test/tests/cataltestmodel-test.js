// Browser tests



var assert = buster.assert;

/*
buster.testCase("Catal Test Model", {
    setUp: function () {
        this.date = new Date(2009, 11, 5);
        debugger;
    }
});
*/

require.def(["sampleapp/models/cataltest"], function(mod) {
        var assert = buster.assert;
  //      debugger;

        buster.testCase("some test", {
                "test that fails": function() {
                        assert.match({name : "wrong name"}, {
                                name: "wrong name"
                        });
                }
        });
});