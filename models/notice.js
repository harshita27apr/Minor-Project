var mongoose = require('mongoose');

var Notice = mongoose.model('Notice' ,{
    title : {
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
    Notice
};