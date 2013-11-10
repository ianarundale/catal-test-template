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

require.def(["sampleapp/models/cataltest"], function(CatalTest) {
    var assert = buster.assert;
    //      debugger;

    buster.testCase("some test", {
        "test CatalTest constructor sets test passed to false": function() {
            var catalTest = new CatalTest();

            assert.isFalse(catalTest.getTestPassed());
        },
        "ensure runTest executes the function provided to the test function": function() {
            var functionCallback = this.spy();

            var catalTest = new CatalTest("test-10-1", "testCaseOne", functionCallback);

            catalTest.runTest();
            assert.isTrue(functionCallback.calledOnce);
        },
        "ensure ontestcomplete sets test passed state": function() {
            var catalTest = new CatalTest();
            assert.isFalse(catalTest.getTestPassed());

            catalTest.onTestComplete(true, "test complete");
            assert.isTrue(catalTest.getTestPassed());
        }
        /*"ensure on test complete fires CatalTestRunEvent": function() {
            var catalTest = new CatalTest();

            catalTest.onTestComplete(true, "test complete");
            //assert.isTrue(catalTest.getTestPassed);
        } */

    });
});