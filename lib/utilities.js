const fs = require("fs");
const inquirer = require("inquirer");
var _ = require('lodash');

let resultToRender = [];

/**
 * @async function to read the JSON file specified by user from filesystem
 * @param {string} fileName The fileName to be read
 * @return {Promise<object>} The content of the file in JSON format.
 */

function readFile(fileName) {
    return new Promise(function (resolve, reject) {
        // let content = {}
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

function searchJson(jsonObj, selectors) { //5 unit tests for this recurrsive function for each acceptance criteria
    resultToRender = [];
    search(jsonObj, selectors);
    return resultToRender;
}

/**
 * recursive function to search the JSON object for selectors, and populates the result object
 * @param {array} jsonobj The json object to be searched
 * @param {array} selectors The search criteria, key:value array object of selectors  
 */
function search(jsonObj, selectors) {

    let match = 0; //flag - (1: compound search , 0: single attribute search)
    // for each selector provided by user input
    selectors.forEach(selector => {
        let jsonNode = jsonObj[selector.key];

        // if jsonObj contains the attribute / key (e.g. "class/classNames/identifier") && nodeMatches function returns true
        // increment compoundMatch
        if (jsonObj.hasOwnProperty(selector.key) && nodeMatches(jsonNode, selector.key, selector.val)) {
            match++;
        }
    });
    // if all selectors required by user were found -> add the node to the result object 
    if (match == selectors.length) {
        resultToRender.push(jsonObj);
    }
    //loop through all elements in jsonObj, recursive, if type object it means there are more nodes to search
    // if not object = nothing more ,  no need to go back through the search function with that json node as last item on that node
    for (let key in jsonObj) {
        if ((typeof jsonObj[key] == "object")) {
            search(jsonObj[key], selectors); //sending the node/ object through the function
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
    if (jsonNode == val || //this means jsonNode must be a class (Input) or an identifier (VideoMode) (i.e. not an array)
        // or if this is an array, the jsonNode contains this attribure required  (indexof) && is a classNames attribute (which are arrays)
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
    let selectors = []; // array as I want to iterate through it for compund selectors
    valArray.forEach(val => {
        let key = generateSelectorKey(val); // returns the "class" if val = StackView
        val = val.replace(/[#.]/g, '') // replces # with space for searching the JSON
        selectors.push({ // creating an array of selectors with their corresponding class/className key, as an array, to support iterations for compound searches.
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
        key = "class"; //e.g. StackView
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


module.exports = {
    readFile,
    getPrompts,
    parseStringToArray,
    generateSelectorKey,
    searchJson,
    search,
    nodeMatches,
    renderOut,
    generateKeyValPairs,
    factorialOfNum,
    testPallindrome,
    fizzBuzz,
    anaGram,
    anaGramComplex,
    replaceChars
}



/**
 * function to test code challenge exercises called in app_spec.js
 */

function factorialOfNum(num) {
    // remove a char from a string
    // let mystring = "rsr/rg";
    // mystring = mystring.split('/r').join('/');
    let cnt = num;
    for (let i = cnt; i > 0; i--) {

        num = num * (i - 1);


    }

    return num;

}
//practice replacing string chars
function replaceChars() {

    myStr = "louise-hayes"
    myStr = myStr.replace(/l/g, 'L');
    // myStr = myStr.split("-").join(" ");
    myStr = myStr.replace(/-/g, ' ');
    // myStr = myStr.split("e").join("a");
    myStr = myStr.replace(/e/g,"x").replace(/a/g,"y");


    console.log(myStr);

}

function testPallindrome(str) {
    str = str.toLowerCase()
    // reverse input string and return the result of the
    // comparison
    return str === str.split('').reverse().join('')
}

function fizzBuzz() {
    for (let i = 0; i <= 50; i++) {
        if ((i % 3 === 0) && (i % 5 === 0));
            // console.log(`${i} fizz buzz`);

        else if (i % 3 === 0) {
            // console.log(`${i} fiz`);
        }
        else if (i % 5 === 0) {
            // console.log(`${i} buzz`);
        }

    }
}

function anaGram(a, b) {
    let missingFlag = false;
    a = a.toLowerCase();
    b = b.toLowerCase();

    for (let i = 0; i < a.length; i++) {
        if ((b.indexOf(a[i]) == -1)) {
            missingFlag = true;
            // console.log(b.indexOf(a[i]))
        }
    }
    return missingFlag;
}


function anaGramComplex(a, b) {

    let objA = convertToObj(a);
    let objB = convertToObj(b);
    // compare number of keys in the two objects
    // (anagrams must have the same number of letters)
    if (Object.keys(objA).length !== Object.keys(objB).length) { return false }

    for (let char in objA) {
        if (objA[char] !== objB[char]) {
            return false
        }
        else return true
    }

    function convertToObj(str) {
        // str = str.toLowerCase();
        const newObj = {};
        const newArr = [1,2];
        
        
        // practice forEach
        newArr.forEach(el => {
            console.log(el);
        })

        //  es6 map / HOC functions
        const arr2 = newArr.map(el =>el * 2);
        const arr3 = arr2.filter(el => el > 2 );
        // const sum = arr2.reduce(accum, el  => accum +el);
        const sum2 = _.sum([4, 2, 8, 6]);
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          }
          
          
        //Math.random() = bet 0-1 non whole num
        //   Math.floor() = who num
        // * 10 = between 0 - 10
        // +1 = between 1-10

          const sum3 = Math.floor(Math.random() * 10 + 1)//= random num betw 1-10

          console.log(getRandomInt(3));

        for (let char of str.replace(/[^\w]/g).toLowerCase()) {

            // if the object has already a key value pair
            // equal to the value being looped over,
            // increase the value by 1, otherwise add
            // the letter being looped over as key and 1 as its value
            newObj[char] = newObj[char] + 1 || 1;
            // newObj.char = newObj.char + 1 || 1;


        }
        return newObj;
    }
}






// promise and callback practice:

testCb('testValx', function callback (err, msg) {
    if (err) {
        console.log('Err: ' + err)
    } else {
        console.log(msg);
    } 
});


function testCb(value, callback) {
    if (value === 'testVal') {
        const msg = 'test message';
        return callback(null, msg);
    } else {
        return callback('this is an error', null);
    }
};
promisfyTestCb =  value => {
    return new Promise((resolve, reject) => {
        testCb(value, function callback (err, msg) {
            if (err) {
                reject(err)
            } else {
                resolve(msg);
            } 
        });
    });
}


function testPromise(value) {
    return new Promise((resolve, reject) => {
        if (value === 'testVal') {
            const msg = 'test message';
            resolve(msg);
        } else {
            reject('this is an error');
        }
    });
}
// testPromise('testValx')
// .then(msg => {
//     console.log(msg);
// })
// .catch(err => {
//     console.log('Err: ' + err)
// })

async function callPromise() {
    try {
        const val = await promisfyTestCb('testVal');
        console.log(val);
    }
    catch(err){ 
        console.log('Err: ' + err)
    }
    
    
}
callPromise();