const fs = require("fs");
const inquirer = require("inquirer");

let resultToRender = [];

/**
 * @async function to read the JSON file specified by user from filesystem
 * @param {string} fileName The fileName to be read
 * @return {Promise<object>} The content of the file in JSON format.
 */
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

/**
 * It calls the main json search function after initializing result array and returns result to app
 * @param {array} jsonobj The json object to be searched
 * @param {array} selectors The search criteria, key:value array object of selectors  
 * @return {array} resultToRender : The result of the search.
 */

function searchJson(jsonObj, selectors) {
    resultToRender = [];
    search(jsonObj, selectors);
    return resultToRender;
}

/**
 * function to search the JSON object for selectors, and pushes the result to global result object
 * @param {array} jsonobj The json object to be searched
 * @param {array} selectors The search criteria, key:value array object of selectors  
 */
function search(jsonObj, selectors) {

    let match = 0; //flag - (1: compound search , 0: single attribute search)
    // for each selector provided by user input
    selectors.forEach(selector => {
        let jsonNode = jsonObj[selector.key];

        // if jsonObj contains the attribute (e.g. "class/classNames/identifier") && selectorMatches function returns true
        // increment compoundMatch
        if (jsonObj.hasOwnProperty(selector.key) && nodeMatches(jsonNode, selector.key, selector.val)) {
            match++;
        }
    });
    // if all selectors required by user were found -> add the node to the result object 
    if (match == selectors.length) {
        resultToRender.push(jsonObj);
    }
    //loop through all elements in jsonObj, recursive
    for (let key in jsonObj) {
        if ((typeof jsonObj[key] == "object")) {
            search(jsonObj[key], selectors);
        }
    }
}

/**
 * function to check if the node key value pair matches the user specified selector
 * @param {array} jsonNode The json node to be searched
 * @param {array} key The search criteria key (of the key):value array object of selector)  
 * @param {array} val The search criteria val (of the key):value array object of selector)  
 */
function nodeMatches(jsonNode, key, val) {
    // if the attributes/value match on this node add them to the resultToRender (return true)
    if (jsonNode == val ||
        // or if this is an array, (means further nodes to search) the jsonNode contains this attribure required && is a classNames attribute
        (Array.isArray(jsonNode) && (jsonNode.indexOf(val) !== -1) && key == "classNames")) {
        return true
    }
    return false;
}

/**
 * function to prompt the user for a selector input 
 * @return {Promise<object>} val The search criteria string e.g. StackView
 */
function getPrompts() {
    return new Promise(function (resolve, reject) {
        console.log("");
        console.log("-----------------------------------------------------------");
        console.log("");
        console.log("");

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
                // console.log(inquirerResponse)
                resolve(inquirerResponse.selector);
            }).catch(function (err) { //catch the error if invalid user selector entered
                console.log(err);
                reject(err);
            })
    })
}

/**
 * function to parse input string into an array - and split compound values into single strings in an array
 * @param {input} string prompt input string
 * @return {input} array of input strings
 */
function parseStringToArray(input) {
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

/**
 * function to generate array of key:value pairs using the attribute
 * @param {valArray} array of attributes (user input search criteria)
 * @return {selectors} array of key value pairs (selectors)
 */

function generateKeyValPairs(valArray) {
    let selectors = [];
    valArray.forEach(val => {
        let key = generateSelectorKey(val);
        val = val.replace(/[#.]/g, '')
        selectors.push({
            key: key,
            val: val
        });
    });
    return selectors;
}

/**
 * function to determine corresponding selector key for attribute provided
 * @param {input} string attribute
 * @return {key} string selector (if The attribute was StackView, returns "class")
 */
function generateSelectorKey(input) {
    if (input.includes(".")) {
        key = "classNames";
    } else if (input.includes("#")) {
        key = "identifier";
    } else {
        key = "class";
    }
    return key;
}

/**
 * function to render the results to screen 
 * @param {result} object search results
 */

function renderOut(result) {
    console.log("----------------------------------------------------------------")
    console.log("                                RESULTS                         ")
    console.log("----------------------------------------------------------------")

    console.log(result)
    console.log("----------------------------------------------------------------")

    console.log("there are " + result.length + " items:");
}


/**
 * Export functioms to the app
 * 
 */

module.exports.readFile = readFile;
module.exports.getPrompts = getPrompts;
module.exports.parseStringToArray = parseStringToArray;
module.exports.generateSelectorKey = generateSelectorKey;
module.exports.searchJson = searchJson;
module.exports.search = search;
module.exports.nodeMatches = nodeMatches;
module.exports.renderOut = renderOut;
module.exports.generateKeyValPairs = generateKeyValPairs;
