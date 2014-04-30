express-json-refiner
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

```
var o = {

	model: {field1: '', field2: '', field3: '', field4: ''},

	fields: {

		public: ['field1', 'field3'],
        member: ['field1', 'field3'],
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
  req.api = {model: 'api1', scope:'admin'};

  // 'api1' is a reference for 'access/api1.js' rule file
  // 'admin' is the scope

  res.json(o);
  
  // result after refine process:
  
  // {'field1': '1'}
});

```
