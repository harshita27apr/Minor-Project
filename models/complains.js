var mongoose = require('mongoose');

var Complain = mongoose.model('Complain' ,{
    subject : {
        type : String,
        minlength : 10,
        trim : true
    },
    crecheEmail : {
        type : String,
    },
    description : {
        type : String
    }
});

module.exports = {
    Complain
};