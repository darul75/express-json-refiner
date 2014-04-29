var expect = require('expect.js'),
    express = require('express'),
    jsonfiddler = require('../src/jsonfiddler'),
    request = require('supertest');


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
        .get('/ok')      
        .expect(200, done);

       
      });


      this.timeout(3000); 

    });   

  });

});

