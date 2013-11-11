/**
 * @fileOverview Requirejs module containing the catal.appui.widgets.CatalTest class
 * @author Ian Arundale <ian.arundale@bbc.co.uk>
 */

require.def("sampleapp/appui/widgets/cataltest",
    [
        "antie/widgets/container",
        "antie/widgets/label"
    ],
    function (Container, Label) {
        return Container.extend({
            /**
             * Constructs a catal test widget
             * @param {String} id - The identifier for this test widget
             * @param {String} testName - The name of the test
             */
            init: function(id, testName) {
                this._super(id);

                this.id = id;

                this.testNameLabel = new Label(testName);
                this.statusLabel = new Label("Not Run");
                this.debugLabel = new Label("");

                this.appendChildWidget(this.testNameLabel);
                this.appendChildWidget(this.statusLabel);
                this.appendChildWidget(this.debugLabel);

                this.addClass("testcase");
            },
            /**
             * Updates the test case UI to a passed state
             */
            setPassed : function() {
                this.statusLabel.setText("PASSED");
                this.addClass("passed");
            },
            /**
             * Updates the test case UI to a failed state
             */
            setFailed : function(debugMessage) {
                this.statusLabel.setText("FAILED");
                this.debugLabel.setText(debugMessage);
                this.addClass("failed");
            },
            /**
             * Updates the test case UI into a pre-run state
             */
            reset : function() {
                this.statusLabel.setText("Not Run");
                this.removeClass("passed");
                this.removeClass("failed");
            }
        });
    }
);