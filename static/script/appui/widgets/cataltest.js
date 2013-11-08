require.def("sampleapp/appui/widgets/cataltest",
    [
        "antie/widgets/container",
        "antie/widgets/label"
    ],
    function (Container, Label) {
        return Container.extend({
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
            setPassed : function() {
                this.statusLabel.setText("PASSED ***");
                this.addClass("passed");
            },
            setFailed : function(debugMessage) {
                this.statusLabel.setText("FAILED ***");
                this.debugLabel.setText(debugMessage);
                this.addClass("failed");
            },
            reset : function(){
                this.statusLabel.setText("Not Run");
                this.removeClass("passed");
                this.removeClass("failed");
            }
        });
    }
);