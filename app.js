const fs = require("fs");
let result = [];
let userInput = process.argv;
let searchItem = [];
let jsonObj = {};
let fileName = "";

// Capture all the userInput (ignore first 2 i.e. node app.js)
for (var i = 2; i < userInput.length; i++) {

    // Obtain the user input parameters after node app.js (filename)
    fileName = userInput[i];
};

readFile(fileName).then(content => {
    let selectors = [{
        key: "class",
        val: "StackView"
    }];
    // to do prompt for selectors
    //call main function, pass jsonObJ and selectors required
    var result = main(content, selectors);
    console.log("there are " + result.length + " items:");
    console.log(result)

}).catch(err => {
    console.log(err.message);

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
                let dataObj=JSON.parse(data);
                resolve(dataObj)
            }
            catch(e){
                reject(e);
            }
            
        })
    })


}

//export the function to other modules (e.g. app_spec.js test file requires it)
module.exports.readFile = readFile;


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

//export the function main() to other modules
module.exports.main = main;