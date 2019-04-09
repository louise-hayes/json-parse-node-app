This is a json parse NodeJS command line app

You must run npm install to install all dependencies:

```
npm install
```


### What this app does:

It parses A JSON object, for example: [https://jsonblob.com/e6c807db-4497-11e9-b3db-cb890192ffc6] and searches for nodes/ elelements that match selectors that are input via prompt.

This app assumes the json object is local file in the current working directory.

### Tests 
This app uses Mocha and Chai testing tools.
Test files are in /test
npm install first, the required dependencies will be installed to enable this command

```
npm test
```

### to run app

You must specify a local json file in the current directory for this app as follows

```
node app.js model.json
```

### Prompts:
You will be presented with a prompt "Please Enter selector here:"
This assumes you will enter a single value in the form StackView or a combination in the form VideoModeSelect#videoMode. Compund searches are enabled.


### expected output for StackView
```
----------------------------------------------------------------
                                RESULTS                         
----------------------------------------------------------------
[ { class: 'StackView',
    classNames: [ 'container' ],
    subviews: [ [Object], [Object] ] },
  { class: 'StackView',
    classNames: [ 'columns', 'container' ],
    subviews: [ [Object], [Object], [Object] ] },
  { class: 'StackView',
    classNames: [ 'column', 'container' ],
    subviews: [ [Object], [Object] ] },
  { class: 'StackView',
    classNames: [ 'column', 'container' ],
    subviews: [ [Object] ] },
  { class: 'StackView',
    classNames: [ 'column', 'container' ],
    subviews: [ [Object], [Object] ] },
  { class: 'StackView',
    classNames: [ 'accessoryView', 'container' ],
    subviews: [ [Object] ] } ]
----------------------------------------------------------------
there are 6 items:
```


### Other sample inputs
```
.container (a className) => 6 items
#videoMode (an identifier) => 1 item
CvarSlider (a class) => 13 items
VideoModeSelect#videoMode
```
This is an example of a compound as it resides in the JSON object:
{ class: 'VideoModeSelect', identifier: 'videoMode' }

This compund sample is in the format class#identifier - they exist on the same node.	

### Samples of compound input strings by user:
CvarSelect#supersample
VideoModeSelect#videoMode