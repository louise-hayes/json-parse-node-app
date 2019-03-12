json parse command line app

### To clone: 

```
npm install
```


JSON is local on model.json and also at :
[https://jsonblob.com/e6c807db-4497-11e9-b3db-cb890192ffc6](Json object)

### to run test with Mocha

```
npm test
```

### to run app
```
npm start
```
### sample input
```
node app.js StackView
```

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
