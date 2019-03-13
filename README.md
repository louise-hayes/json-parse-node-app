This is a json parse NodeJS command line app

### To clone: 
[https://github.com/louise-hayes/json-parse-node-app.git](githib)

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

To run tests

```
npm test
```

### to run app

```
node app.js model.json
```

### Prompts:



### expected output
6 items:

class	:	StackView
		
	classNames		[1]
		
	subviews		[2]
		
	0		{3}
		
class	:	StackView
		
	classNames		[2]
		
	subviews		[3]
		
	0		{3}
		
class	:	StackView
		
	classNames		[2]
		
	subviews		[2]
		
	1		{3}
		
class	:	StackView
		
	classNames		[2]
		
	subviews		[1]
		
	2		{3}
		
class	:	StackView
		
	classNames		[2]
		
	subviews		[2]
		
	1		{3}
		
class	:	StackView
		
	classNames		[2]
		
	subviews		[1]


### Other sample inputs
node app.js .container
node app.js #videoMode
