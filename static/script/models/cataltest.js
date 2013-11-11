/**
 * @fileOverview Requirejs module containing the catal.CatalTest class.
 * @author Ian Arundale <ian.arundale@bbc.co.uk>
 */

require.def("sampleapp/models/cataltest",
    [
        "antie/class",
        "antie/application",
        "sampleapp/events/cataltestrun"
    ],
    function (Class, Application, CatalTestRunEvent) {

        return Class.extend({
            /**
             * Constructs a CatalTest model
             * @param {String} id - The id of this test (lifted from the manual test pack)
             * @param {String} testName - A descriptive name to describe what this test does
             * @param {Function} testFunction - The function to be run which tests a particular
             * aspect of the device or TAL
             */
            init: function (id, testName, testFunction) {
                this.id = id;
                this.testName = testName;
                this.testFunction = testFunction;
                this.testPassed = false;
                this.debugMessage = "";
            },
            /**
             * Runs the associated test function and provides a callback to be called to report the
             * result of the test
             */
            runTest : function() {
                var self = this;
                this.testFunction(function(result, debugMessage) {
                    self.onTestComplete(result, debugMessage);
                });
            },
            /**
             * @returns {boolean} The current run state of the test
             */
            getTestPassed : function() {
                return this.testPassed;
            },
            /**
             * Todo: Review the dependency on antie.application
             * @param {boolean} testPassed - boolean representing whether the test passed
             * @param {string} debugMessage - additional information about the result of the test
             * @fires catal.CatalTestRunEvent
             */
            onTestComplete : function(testPassed, debugMessage) {
                this.testPassed = !!testPassed;
                this.debugMessage = debugMessage;

                var event = new CatalTestRunEvent(this);
                Application.getCurrentApplication().broadcastEvent(event);
            }
        });
    }
);