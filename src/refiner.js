var processor = require('./processor');

var o = {};

// defaults
var options = {        
    debug: true,
    enable: true
};  


o.init = function(opts) {

    opts = opts || {};
    
    f.extend(options, opts);

};

o.digest = function(req,res,next) {

    if (options.enable) {

        var json=res.json;    

        res.json = function(obj) {  

            // allow status / body
            if (2 == arguments.length) {
                // res.json(body, status) backwards compat
                if ('number' == typeof arguments[1]) {
                    this.statusCode = arguments[1];
                } else {
                    this.statusCode = obj;
                    obj = arguments[1];
                }
            }

            // process        

            if (options.rules && req.api && req.api.scope) {
                obj = processor(obj, req, options);
            }

            json.apply(res,arguments);
        };

    }

    next();  

};

// overriding for the functions
var f = {

    extend: function(target, source) {
        if (!source || typeof source === 'function') {
            return target;
        }
        
        for (var attr in source) { target[attr] = source[attr]; }
            return target;
    }
};

exports = module.exports = o;

