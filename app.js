// require utility functions
const utilities = require("./lib/utilities")

/**
 * Initializes the App.
 *
 */

function init() {
    // initialize variables
    let userInput = process.argv;
    let fileName = "";
    // 1 :-  Capture the userInput from the "node app.js model.js" command 
    // (ignore first 2 i.e. node app.js)
    for (var i = 2; i < userInput.length; i++) {
        // Obtain the user input parameters after node app.js <filename>
        fileName = userInput[i];
    };
    // 2 :- call async function readFile: read the file passed in by user (model.json)
    utilities.readFile(fileName)
        .then(jsonFile => {
            // console.log("2: read OK");
            function start() {
                // 3 :- prompt user for selectors
                utilities.getPrompts()
                    .then(input => {
                        // console.log("3:- have prompts going to parseStringToArray " + input)
                        let valArray = utilities.parseStringToArray(input);
                        let selectorsArr = utilities.generateKeyValPairs(valArray);
                        // 4 :- call main function, pass jsonObJ and selectors
                        var result = utilities.searchJson(jsonFile, selectorsArr);
                        if (!(result.length < 1 || result == undefined)) {
                            utilities.renderOut(result);
                        } else {
                            //empty
                            console.log("Sorry - No matches for your Search Criteria")
                        }
                        start();
                    })
                    .catch(err => {
                        console.log("error in input " + err)
                    });
            } //end start function

            //after reading the file and checking it is valid call start function
            start();
        }).catch(err => {
            let regex1 = RegExp('.json');
            if (!(regex1.test(fileName))) {
                console.log("must be type file-name.json")
            } else {
                console.log(" Looks like you are not giving a valid json file: Error Msg:- " + err.message);
            }
        });
}
init();
//to do:
//search for selector chains - phase 2!