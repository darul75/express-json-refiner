var expect = require('expect.js'),
    express = require('express'),
    load = require('express-load'),
    jsonfiddler = require('../src/refiner'),
    request = require('supertest');

describe('field.access.spec', function() {

  var app;

  before(function(done) {
    app = express({debug:true});
    app.configure(function() {      
      app.use(express.logger('dev'));
      app.use(jsonfiddler.filter);
    });    

    load('test/model').then('test/access').into(app);

    var opts = {
      debug: false,
      rules: app.access
    };

    jsonfiddler.init(opts, app, function() {
      app.enable('jcc');
    });


    app.get('/api1/admin', function(req, res){
      var o = {'field1': '1', 'field2': '2', 'field3': '3'};

      req.api = {model: 'api1', scope:'admin'};

      res.json(o);
    });

    app.get('/api2/public', function(req, res){
      var o = {'field1': '1', 'field2': '2', 'field3': '3'};

      req.api = {model: 'api1', scope:'public'};

      res.json(o);
    });

    app.get('/api3/member', function(req, res){
      var o = {'field1': '1', 'field2': '2', 'field3': '3'};

      req.api = {model: 'api3', scope:'member'};

      res.json(o);
    });

    app.get('/api4/noRefiner', function(req, res){
      var o = {'field1': '1'};      

      res.json(o);
    });

    var port = process.env.PORT || 5000;
    app.listen(port, function() {    
      done();
    });
    

  });

  describe('json api refiner', function(){

    describe('api1', function(){
      it('should filter just first field', function(done){
       request(app)
        .get('/api1/admin')      
        .expect({'field1': '1'}, done);
      });


      this.timeout(30000);

    });

    describe('api2', function(){
      it('should filter just second field', function(done){
       request(app)
        .get('/api2/public')      
        .expect({'field1': '1', 'field3': '3'}, done);
      });


      this.timeout(30000);

    });

    describe('api3', function(){
      it('should filter just third field', function(done){
       request(app)
        .get('/api3/member')      
        .expect({'field1': '1', 'field2': '2'}, done);
      });


      this.timeout(30000);

    });

    describe('apiNoRefiner', function(){
      it('should not filter', function(done){
       request(app)
        .get('/api4/noRefiner')      
        .expect({'field1': '1'}, done);
      });


      this.timeout(30000);

    });

  });

});

