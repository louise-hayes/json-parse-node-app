var chai = require('chai');
var expect = chai.expect;
const app = require("../app");
const jsonObj = require("../model.json");

describe('Checks the number of views', function () {

    it('returns true if 6 classNames contain .container attribute', function () {
        let selectors = [{
            key: "classNames",
            val: "container"
        }];
        let result = app.main(jsonObj, selectors)
        expect(result.length).to.equal(6);
    });
    it('returns true if 26 classes contain Input attribute', function () {
        let selectors = [{
            key: "class",
            val: "Input"
        }];
        var result = app.main(jsonObj, selectors)
        expect(result.length).to.equal(26);
    });

    it('returns true if 6 classes contain StackView attribute', function () {
        let selectors = [{
            key: "class",
            val: "StackView"
        }];
        var result = app.main(jsonObj, selectors)
        expect(result.length).to.equal(6);
    });
    it('returns true if 1 identifier contains #videoMode attribute', function () {
        let selectors = [{
            key: "identifier",
            val: "videoMode"
        }];
        let result = app.main(jsonObj, selectors)
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
        let result = app.main(jsonObj, selectors)
        expect(result.length).to.equal(3);
    });
})

describe('Checks the fileName', function () {
    it('finds a filename called model.json', function (done) {
        // mockup file name
        let fileName = "model.json";
        //call async function readFile passing mocked filename
        // handle async return promise object with .then or reject with .catch 

        app.readFile(fileName).then((content) => {
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

        app.readFile(fileName).then((content) => {}).catch(err => {
            expect(err.message).to.equal("Unexpected token e in JSON at position 1")
            done()
        })
    });

});

describe('Checks function getPrompts returns selectors', function () {
    it('checks if function getPromts returns selector StackView', function () {
        let userInput = app.getPrompts();
        expect(userInput).to.equal("StackView");
        done();
    })

    it('checks if function checkInput returns selector key', function () {
        let str = ".container";
        let key = app.checkInput(str);
        expect(key).to.equal("container");
       
    })
   
    it.only('checks if function valArrayFunc returns array of vals', function () {
        let str = "VideoModeSelect#videoMode";
        let valArray = app.valArrayFunc(str);
        expect(valArray[1]).to.equal("#videoMode");
         str = "CvarSelect#windowMode";
         valArray = app.valArrayFunc(str);
        expect(valArray[1]).to.equal("#windowMode");
    })
})