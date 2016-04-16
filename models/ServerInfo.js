var mongoose = require('mongoose');

var ServerInfoSchema = new mongoose.Schema({

    name: {type: String, lowercase: true, required: true},
    datePosted: {type: Date, default: Date.now},
    password: {type: String, required: true},
    port: {type: String, required: true}

});


ServerInfoSchema.methods.updateServerInfo = function(name, password, port, cb) {

    if (name && password && port) {
        this.name = name;
        this.date = Date.now;
        this.port = port;
        this.password = password;

        this.save(cb);
    }

};

mongoose.model('ServerInfo', ServerInfoSchema);
