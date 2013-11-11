/**
 * @fileOverview Requirejs module containing the catal.appui.components.SimpleTestComponent class
 * @author Ian Arundale <ian.arundale@bbc.co.uk>
 */

require.def("sampleapp/appui/components/simple",
    [
        "antie/widgets/component",
        "antie/widgets/button",
        "antie/widgets/label",
        "antie/widgets/verticallist",
        "antie/widgets/container",
        "sampleapp/appui/widgets/cataltest"
    ],
    function (Component, Button, Label, VerticalList, Container, CatalTest) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var self = this;

                this._super("cataltestcomponent");

                this.addEventListener("beforerender", function (evt) {
                    self._onBeforeRender(evt);
                });

                this.addEventListener("aftershow", function appReady(evt) {
                    self.getCurrentApplication().ready();
                    self.removeEventListener('aftershow', appReady);
                });

                this._setUpUserInterface();
            },
            /**
             * Constructs the user interface elements so they are ready to be used in onBeforeRender
             */
            _setUpUserInterface : function() {
                var self = this;

                this.titleLabel = new Label("testTitle", "");
                this.appendChildWidget(this.titleLabel);

                this.userInstructionsLabel = new Label("userInstructionsLabel", "");
                this.appendChildWidget(this.userInstructionsLabel);

                this.additionalInformationLabel = new Label("additionalInformationLabel");
                this.appendChildWidget(this.additionalInformationLabel);

                this.testStatusLabel = new Label("testStatus", "");
                this.appendChildWidget(this.testStatusLabel);

                this.testContainer = new Container("testcases");
                this.appendChildWidget(this.testContainer);

                this.runTestButton = new Button();
                this.runTestButton.addEventListener("select", function(evt) {
                    self._runTests();
                });

                var runTestButtonLabel = new Label("Start Test");
                this.runTestButton.appendChildWidget(runTestButtonLabel);

                var backButton = new Button();
                backButton.addEventListener("select", function(evt) {
                    // TODO: Abort any tests that are currently in progress

                    // Return the user back to the menu
                    self.getCurrentApplication().showComponent("maincontainer", "sampleapp/appui/components/simplevideocomponent");
                });
                backButton.appendChildWidget(new Label(" < Back"));

                // Create a vertical list and append the buttons to navigate within the list
                var verticalListMenu = new VerticalList("mainMenuList");
                verticalListMenu.appendChildWidget(this.runTestButton);
                verticalListMenu.appendChildWidget(backButton);
                this.appendChildWidget(verticalListMenu);

            },

            /**
             * Constructs a base catal test user interface
             * @param params.userInstructions Instructions to be displayed onscreen to the user
             * @param params.additionalInformation Any extra information to be displayed to the user
             * @param params.testCases Array of test case objects which are to be run when the user selects start test
             // * @param params.onSuccess function to be called if the tuner was retuned successfully
             // * @param params.onError function to be called if the provided channel was unable to be tuned
             */
            _onBeforeRender: function (evt) {
                var self = this;

                this.title = evt.args.title || "";
                this.userInstructions = evt.args.userInstructions || "";
                this.additionalInformation = evt.args.additionalInformation || "";
                this.testCases = evt.args.testCases;
                this.testRunCounter = 0;
                this.testStatus = "(status) Test status: Not Run";

                this.titleLabel.setText(this.title);
                this.userInstructionsLabel.setText(this.userInstructions);

                if (!!this.additionalInformation) {
                    this.additionalInformationLabel.setText(this.additionalInformation);
                }

                this.testStatusLabel.setText(this.testStatus);

                this.addEventListener("cataltestrun", function(evt) {
                    var catalTest = evt.catalTest;
                    self.registerTestRun(catalTest);
                });

                this.numberOfTests = (function(obj) {
                    var size = 0, key;
                    for (key in obj) {
                        if (obj.hasOwnProperty(key)) size++;
                    }
                    return size;
                })(this.testCases);

                for (var i in self.testCases) {
                    var catalTest = self.testCases[i];
                    var catalTestWidget = new CatalTest(catalTest.id, catalTest.testName);
                    this.testContainer.appendChildWidget(catalTestWidget);
                }

                this.addEventListener("afterhide", function() {
                    self.testContainer.removeChildWidgets();
                });

                // Force focus to the start test button
                this.runTestButton.focus();
            },
            /**
             * Registers a test run as completed and updates the UI appropriately
             * @param {catalTest} CatalTest
             */
            registerTestRun: function(catalTest) {
                // Update the test UI
                var catalWidget = this.testContainer.getChildWidget(catalTest.id);
                if (catalTest.getTestPassed()) {
                    catalWidget.setPassed()
                } else {
                    catalWidget.setFailed(catalTest.debugMessage);
                }

                //
                console.log(catalTest.id + " run complete");
                this.testRunCounter++;

                if (this.testRunCounter == this.numberOfTests) {
                    this.updateTestStatusLabel("Test Status: All tests run");
                } else {
                    this.updateTestStatusLabel("Test Status: Running (" + this.testRunCounter + "/" + this.numberOfTests + ")");
                }
            },
            updateTestStatusLabel : function(text) {
                this.testStatusLabel.setText(text);
            },
            /**
             * Runs all the test cases
             */
            _runTests : function() {
                this.testRunCounter = 0;

                // Ensure the user interface is reset to a
                var testWidgets = this.testContainer.getChildWidgets();
                for (var i in testWidgets) {
                    testWidgets[i].reset();
                }

                try {
                    // Kick off all of the catal tests
                    for (var i in this.testCases) {
                        this.testCases[i].runTest();
                    }
                } catch(e) {
                    console.log(e);
                }
            }
        });
    }
);