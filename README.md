This is a json parse NodeJS command line app

you must run npm install to install all dependencies:

```
npm install
```


### What this app does:
A JSON object [https://jsonblob.com/e6c807db-4497-11e9-b3db-cb890192ffc6](Json object) is parsed and searched for user selectors that are input via prompt.

This app assumes the json object is local file.

### Tests 
This app uses Mocha and Chai testing tool.
test files are in /test
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
.container
#videoMode
VideoModeSelect#videoMode
```
