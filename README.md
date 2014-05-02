express-json-refiner [![NPM version](https://badge.fury.io/js/express-json-refiner.png)](http://badge.fury.io/js/express-json-refiner) [![Build Status](https://travis-ci.org/darul75/express-json-refiner.png?branch=master)](https://travis-ci.org/darul75/express-json-refiner) [![Total views](https://sourcegraph.com/api/repos/github.com/darul75/express-json-refiner/counters/views.png)](https://sourcegraph.com/github.com/darul75/express-json-refiner)
====================

Express JSON refiner middleware by scope api (admin, member...)

Dynamicaly reduce your json response by context's scope of api.

## About

The motivation with this module is to provide a way to filter your json response attributes based on context of your apis.

You may have `public/private/admin`... API and want to deal with response json objects and its visible attributes.

## Example

API focused on 'user' is giving json results (or array) like:

```
{
  field1: '',
  field2: '',
  field3: '',
  field4: ''
}
```

And for some reasons depending on context whether it is a `public` API or `member` API you may just want to expose :

```
{
  field1: '',
  field3: ''
}
```

So, idea is to provide your rules by this way, I give more details below:

CASE 1: no routes defined.
```
var userAccessRule = {

	model: {field1: '', field2: '', field3: '', field4: ''},

	fields: {

		public: ['field1', 'field3'],
		member: ['field2', 'field3'],
		admin: ['field1', 'field2', 'field3', 'field4']

  	}
  
};
```
CASE 2: routes defined.
```
var userAccessRule = {

	model: {field1: '', field2: '', field3: '', field4: ''},
	
	routes: ['/api1/admin/user/*', '/api1/member/user/*'],

	fields: {

		public: ['field1', 'field3'],
		member: ['field2', 'field3'],
		admin: ['field1', 'field2', 'field3', 'field4']

  	}
  
};
```

## How to use

In context of Express:

```javascript

var refiner = require('express-json-refiner');
var load = require('express-load');

var app = express();

app.configure(function() {      
  ...
  app.use(refiner.digest);
  ...
});    


// NOTE here I use the best loader for me to load all api scope rules 'express-load'
// This requirement is mandatory to make all working ;)

// See test/ directory example

load('test/model').then('test/access').into(app);

// where 'test/model' contains Mongoose model (schema) or arbitrary model
// where 'test/access' contains your json refiner rules, which attributes to keep for each context.

// result is injection of `model` namespace into `app` variable.
// result is injection of `access` namespace into `app` variable.

var opts = {
  debug: false,
  rules: app.access
};

// Init refiner with options.

refiner.init(opts, app);

// Example on defining route

app.get('/api1/admin', function(req, res){

  var o = {'field1': '1', 'field2': '2', 'field3': '3'};

  // NOTE before rendering json output, just give api context for refiner to apply.
  // CASE 1: no routes defined => explicitly give model rule, here 'api1"
  req.api = {model: 'api1', scope:'public'};
  
  // CASE 2: routes is defined

  // 'api1' is a reference for 'access/api1.js' rule file
  // 'admin' is the scope

  res.json(o);
  
  // result after refine process:
  
  // {'field1': '1', 'field3': 3}
});

```

`scope` can be set globaly for instance by this way, example made with `passport-http-bearer`

```javascript
var checkAdminAccess = function (req, res, next) {  

    if (!req.user || req.user.role !== "admin") {

        var err = new Error('not allowed!');

        err.status = 403;

        next(err);

        return;

    }

    req.api = {scope:'admin'};

    next();

};

app.all('/api/v1/admin/*', passport.authenticate('bearer', { session: false }), checkAdminAccess);
```

Do not hesitate look at test folder hierarchy files.

Installation
------------

Using npm:

```
npm install express-json-refiner
```

### Build

You can run the tests by running

```
npm install
```
or
```
npm test
```

assuming you already have `grunt` installed, otherwise you also need to do:

```
npm install -g grunt-cli
```

## License

The MIT License (MIT)

Copyright (c) 2014 Julien Valéry

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
