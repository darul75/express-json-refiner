module.exports = function (app) {	

    var o = {

    	model: app.test.model.noMongooseSchema,

    	fields: {
	        public: ['field1', 'field2', 'field3'],
	        member: ['field1', 'field2'],
	        admin: ['field1']
        }

    };

    return o;

};