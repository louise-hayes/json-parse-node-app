const chai = require('chai');
const expect = chai.expect;
let app = require("../app");
const jsonObj = require("../model.json");
const proxyquire = require("proxyquire");
const utilities = require("../lib/utilities")

describe('Checks the Main function number of views found for a selector', function () {

    it('returns true if 6 classNames contain .container attribute', function () {
        let selectors = [{
            key: "classNames",
            val: "container"
        }];
        let result = utilities.searchJson(jsonObj, selectors)
        expect(result.length).to.equal(6);
    });
    it('returns true if 26 classes contain Input attribute', function () {
        let selectors = [{
            key: "class",
            val: "Input"
        }];
        var result = utilities.searchJson(jsonObj, selectors)
        expect(result.length).to.equal(26);
    });

    it('returns true if 6 classes contain StackView attribute', function () {
        let selectors = [{
            key: "class",
            val: "StackView"
        }];
        var result = utilities.searchJson(jsonObj, selectors)
        expect(result.length).to.equal(6);
    });
    it('returns true if 1 identifier contains #videoMode attribute', function () {
        let selectors = [{
            key: "identifier",
            val: "videoMode"
        }];
        let result = utilities.searchJson(jsonObj, selectors)
        expect(result.length).to.equal(1);
    });

    it('returns true for 3 stackView.column attributes', function () {
        let selectors = [
            // {key: "identifier",val:"videoMode"}
            {
                key: "class",
                val: "StackView"
            },
            {
                key: "classNames",
                val: "column"
            }
            // // {key: "classNames", val:"Input"}
        ];
        let result = utilities.searchJson(jsonObj, selectors)
        expect(result.length).to.equal(3);
    });
})

describe('Checks for the fileName', function () {
    it('finds a filename called model.json', function (done) {
        // mockup file name
        let fileName = "model.json";
        //call async function readFile passing mocked filename
        // handle async return promise object with .then or reject with .catch 

        utilities.readFile(fileName).then((content) => {
            expect(content["identifier"]).to.equal("System");
            done();
        }).catch(err => {
            console.log(err);
        })
    });

    it('finds a bad file', function (done) {
        // mockup file name
        let fileName = "test.txt";
        //call async function readFile passing mocked filename
        // handle async return promise object with .then or reject with .catch 

        utilities.readFile(fileName).then((content) => {}).catch(err => {
            expect(err.message).to.equal("Unexpected token e in JSON at position 1")
            done()
        })
    });
});

describe('Checks the pure functions', function () {

    it('checks if function getPrompts returns selector StackView', function (done) {
        let mockInquirer = {
            prompt(options) {
                return new Promise((resolve, reject) => {
                    expect(options[0].message).to.equal("Please enter selector here")
                    resolve({
                        selector: "StackView"
                    })
                })
            }
        }

        let utilities = proxyquire("../lib/utilities", {
            "inquirer": mockInquirer
        });

        let userInput = utilities.getPrompts()
            .then(userInput => {
                expect(userInput).to.equal("StackView");
                done();
            })
    })


    it('checks if function getPrompts returns selector VideoModeSelect#videoMode', function (done) {
        let mockInquirer = {
            prompt(options) {
                return new Promise((resolve, reject) => {
                    expect(options[0].message).to.equal("Please enter selector here")
                    resolve({
                        selector: "VideoModeSelect#videoMode"
                    })
                })
            }
        }

        let utilities = proxyquire("../lib/utilities", {
            "inquirer": mockInquirer
        });

        let userInput = utilities.getPrompts()
            .then(userInput => {
                expect(userInput).to.equal("VideoModeSelect#videoMode");
                done();
            })
    })

    it('checks if function checkInput returns selector key classNames given .container - removes #', function () {
        let str = ".container";
        let key = utilities.generateSelectorKey(str);
        expect(key).to.equal("classNames");

    })

    it('checks if function parseStringToArray returns array of vals given any selector combination', function () {
        let str = "VideoModeSelect#videoMode";
        let valArray = utilities.parseStringToArray(str);
        expect(valArray[1]).to.equal("#videoMode");
        str = "CvarSelect#windowMode";
        valArray = utilities.parseStringToArray(str);
        expect(valArray[1]).to.equal("#windowMode");
        str = "CvarSelect#windowMode";
        valArray = utilities.parseStringToArray(str);
        expect(valArray[1]).to.equal("#windowMode");
        str = "StackView";
        valArray = utilities.parseStringToArray(str);
        expect(valArray[0]).to.equal("StackView");
    })
})