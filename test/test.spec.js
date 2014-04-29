var expect = require('expect.js'),
    express = require('express'),
    load = require('express-load'),
    jsonfiddler = require('../src/jsonfiddler'),
    request = require('supertest');


require('./model/example');

describe('field.access.spec', function() {

  var app;

  before(function(done) {
    app = express({debug:true});
    app.configure(function() {      
      app.use(express.logger('dev'));
      app.use(jsonfiddler.filter);
    });

    opts = {
      debug: false
    };

    jsonfiddler.init(opts, app, function() {
      app.enable('jcc');      
    });

    load('model').then('access').into(app);

    app.get('/ok', function(req, res){
      var o = {};

      console.log('coucou')

      res.json(o);
    });

    var port = process.env.PORT || 5000;
    app.listen(port, function() {    
      done();
    });
    

  });

  describe('jcc compile jade', function(){

    describe('with a malformed URL', function(){
      it('should respond with 404', function(done){
       request(app)
        .get('/example/public/')      
        .expect(200, done);

       
      });


      this.timeout(3000); 

    });   

  });

});

