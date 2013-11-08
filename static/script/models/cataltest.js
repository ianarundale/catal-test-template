require.def("sampleapp/models/cataltest",
    [
        "antie/class",
        "antie/application",
        "sampleapp/events/cataltestrun"
    ],
    function (Class, Application, CatalTestRunEvent) {

        // All components extend Component
        return Class.extend({
            init: function (id, testName, testFunction) {
                this.id = id;
                this.testName = testName;
                this.testFunction = testFunction;
                this.testPassed = false;
                this.debugMessage = "";
            },
            runTest : function() {
                var self = this;
                this.testFunction(function(result, debugMessage) {
                    self.onTestComplete(result, debugMessage);
                });
            },
            getTestPassed : function() {
                return this.testPassed;
            },
            onTestComplete : function(testPassed, debugMessage) {
                this.testPassed = !!testPassed;
                this.debugMessage = debugMessage;

                var event = new CatalTestRunEvent(this);
                Application.getCurrentApplication().broadcastEvent(event);
            }
        });
    }
);