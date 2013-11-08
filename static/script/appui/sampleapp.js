/**
 * @preserve Copyright (c) 2013 British Broadcasting Corporation
 * (http://www.bbc.co.uk) and TAL Contributors (1)
 *
 * (1) TAL Contributors are listed in the AUTHORS file and at
 *     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
 *     not this notice.
 *
 * @license Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * All rights reserved
 * Please contact us for an alternative licence
 */

require.def('sampleapp/appui/sampleapp',
    [
        'antie/application',
        'antie/widgets/container',
        'sampleapp/models/cataltest'
    ],
    function(Application, Container, CatalTest) {

        return Application.extend({
            init: function(appDiv, styleDir, imgDir, callback) {
                var self;
                self = this;

                self._super(appDiv, styleDir, imgDir, callback);

                // Sets the root widget of the application to be
                // an empty container
                self._setRootContainer = function() {
                    var container = new Container();
                    container.outputElement = appDiv;
                    self.setRootWidget(container);
                };
            },

            run: function() {
                this._setRootContainer();

                var testCases = {};

                var testId = "testcase-1-4-1";
                var testScreenSize = new CatalTest(testId, "Sample test", function(onTestComplete) {
                    setTimeout(function() {
                        onTestComplete(true)
                    }, 2000);
                });

                testCases[testId] = testScreenSize;

                var testId = "testcase-1-4-2";
                var testScreenSize2 = new CatalTest(testId, "Sample test 2", function(onTestComplete) {
                    onTestComplete(true);
                });

                testCases[testId] = testScreenSize2;

                var args = {
                    title : "CATAL Test Case",
                    userInstructions : "Here are some instructions for the test",
                    additionalInformation : "Additional information, ensure you are plugged in",
                    testCases : testCases
                };

                this.addComponentContainer("maincontainer", "sampleapp/appui/components/simple", args);
            }
        });
    }
);