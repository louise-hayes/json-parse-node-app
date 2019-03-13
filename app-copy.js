const fs = require("fs");
const inquirer = require("inquirer");
let result = [];
let userInput = process.argv;
let searchItem = [];
let jsonObj = {};
let fileName = "";

// 1 :-  Capture all the userInput from the "node app.js model.js" command (ignore first 2 i.e. node app.js)
for (var i = 2; i < userInput.length; i++) {
    // Obtain the user input parameters after node app.js <filename>
    fileName = userInput[i];
};

// 2 :- call async function readFile: read the file passed in by user (model.json)
readFile(fileName)
    .then(content => {
        console.log("2: read OK");
        // 3 :- prompt user for selectors
        
        getPrompts()
            .then(input => {
                console.log("3:- have prompts going to valArrayFunc " + input)
                let selectors = [];
                let valArray = valArrayFunc(input);

                valArray.forEach(val => {
                    let key = checkInput(val);
                    val = val.replace(/[#.]/g, '')
                    selectors.push({
                        key: key,
                        val: val
                    });
                });
                console.log(selectors);

                // 4 :- call main function, pass jsonObJ and selectors
                // result - > show to user
                var result = main(content, selectors);
                console.log("----------------------------------------------------------------")
                console.log("                                RESULTS                         ")
                console.log("----------------------------------------------------------------")

                console.log(result)
                console.log("----------------------------------------------------------------")
                
                console.log("there are " + result.length + " items:");
            })
            .catch(err => {
                console.log("error in input " + err)
            });


    }).catch(err => {
        console.log(err.message + " -please ensure you are specifying a JSON file");
    });

//Async function to read the JSON file specified by user from filesystem
// parse file to JSON format
function readFile(fileName) {
    return new Promise(function (resolve, reject) {
        let content = {}
        fs.readFile(fileName, "utf8", function read(err, data) {
            if (err) {
                return reject(err);
            }
            try {
                let dataObj = JSON.parse(data);
                resolve(dataObj)
            } catch (e) {
                reject(e);
            }
        })
    })
}


//add function here to check which selector (single, compound or chained)
//check if user input has . # or class


//Add  validation on functions - especially isobject function
//accept json from folder
//accept json from url
//accept parameters from command line
//case switch : id/class/classname
// get selector chains?

// function to initialize the result, pass json and input selectors to main search function, and return result
function main(jsonObj, selectors) {
    result = [];
    findSelectors(jsonObj, selectors);
    return result;
}

//function to extract the user required selector attributes
function findSelectors(jsonObj, selectors) {

    // sample of what is extracted by a single loop through selectors, 
    // {
    // "class": "StackView",
    // "classNames": [
    //   "columns",
    //   "container"
    // ],
    // "subviews": [ ... ]
    // }


    let match = 0; //flag for compound or single atrribute match

    // for each selector provided by user input
    selectors.forEach(selector => {
        let jsonNode = jsonObj[selector.key];

        // if jsonObj contains the user input selector attribute (e.g. "class/classNames/identifier") && selectorMatches function returns true
        // inc compoundMatch
        if (jsonObj.hasOwnProperty(selector.key) && selectorMatches(jsonNode, selector.key, selector.val)) {
            match++;
        }
    });
    // if all selectors required by user were found add the node to the result object 
    if (match == selectors.length) {
        result.push(jsonObj);
    }
    //loop through all elements in jsonObj, recursive
    for (let key in jsonObj) {
        if ((typeof jsonObj[key] == "object")) {
            findSelectors(jsonObj[key], selectors);
        }
    }
}

// function to check if the jsonObj key value pair matches the user input
function selectorMatches(jsonNode, key, val) {
    // if the attributes match on this node
    if (jsonNode == val ||
        // or if an array, the json contains this attribure && the user input selector is classNames
        (Array.isArray(jsonNode) && (jsonNode.indexOf(val) !== -1) && key == "classNames")) {
        return true
    }
    return false;
}

// function to get selectors from user prompt
function getPrompts() {
    return new Promise(function (resolve, reject) {
        inquirer
            .prompt([
                // Here we create a basic text prompt to get user selection criteria.
                {
                    type: "input",
                    message: "Please enter selector here",
                    name: "selector",
                    required: true
                }
            ])
            // This returns an asynch promise when done, and we catch that promise with a .then
            .then(function (inquirerResponse) { // when promise completes
                console.log(inquirerResponse)
                resolve(inquirerResponse.selector);
            }).catch(function (err) {//catch the error if invalid user selector entered
                console.log(err);
                reject(err);
            })
    })
}

// function to take user attribute and determine selector key for attribute
function checkInput(input) {
    if (input.includes(".")) {
        key = "classNames";
    } else if (input.includes("#")) {
        key = "identifier";
    } else {
        key = "class";
    }
    return key;
}

// function to put vals into an array
function valArrayFunc(input) {
    if (input[0] === ".") {
        return [input]
    } else
    if (input[0] === "#") {

        return [input]
    } else if (input.includes("#")) {
        let valArray = input.split("#");
        valArray[1] = "#" + valArray[1];
        return valArray;
    } else {
        return [input]
    }
}


//export the function to other modules (e.g. app_spec.js test file requires it)
module.exports.readFile = readFile;
module.exports.getPrompts = getPrompts;
module.exports.valArrayFunc = valArrayFunc;
module.exports.checkInput = checkInput;
module.exports.main = main;