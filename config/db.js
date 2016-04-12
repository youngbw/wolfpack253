var args = require('yargs').argv;
var mongoose = require('mongoose')

module.exports = function(mongoose)
{
    var SERVER_DB = 'mongodb://wolfpack253.ddns.net:27017/wolfpack';
    var LOCAL_DB = 'mongodb://localhost/wolfpack';

    var connection = (args.local || args.l) ? LOCAL_DB : SERVER_DB;

    mongoose.connect(connection);

    mongoose.connection.on('error', function () {
        console.log("Mongoose - error connecting to db @ " + connection);
    });
    mongoose.connection.once('open', function callback() {
        console.log("Mongoose connected to the database @ " + connection);
    });


}
