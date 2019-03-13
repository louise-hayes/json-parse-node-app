// require utility functions
const utilities = require("./utilities")

function init() {
    // initialize variables
    let userInput = process.argv;
    let fileName = "";

    // 1 :-  Capture the userInput from the "node app.js model.js" command (ignore first 2 i.e. node app.js)
    for (var i = 2; i < userInput.length; i++) {
        // Obtain the user input parameters after node app.js <filename>
        fileName = userInput[i];

    };

    // 2 :- call async function readFile: read the file passed in by user (model.json)
    utilities.readFile(fileName)
        .then(content => {
            let result = [];
            // console.log("2: read OK");
            // 3 :- prompt user for selectors


            function start() {
                utilities.getPrompts()
                    .then(input => {
                        // console.log("3:- have prompts going to valArrayFunc " + input)
                        let selectors = [];
                        let valArray = utilities.valArrayFunc(input);

                        valArray.forEach(val => {
                            let key = utilities.checkInput(val);
                            val = val.replace(/[#.]/g, '')
                            selectors.push({
                                key: key,
                                val: val
                            });
                        });
                        // console.log(selectors);

                        // 4 :- call main function, pass jsonObJ and selectors
                        // result - > show to user
                        var result = utilities.main(content, selectors);
                        if (!(result.length < 1 || result == undefined)) {

                            console.log("----------------------------------------------------------------")
                            console.log("                                RESULTS                         ")
                            console.log("----------------------------------------------------------------")

                            console.log(result)
                            console.log("----------------------------------------------------------------")

                            console.log("there are " + result.length + " items:");
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