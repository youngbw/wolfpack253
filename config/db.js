var args = require('yargs').argv;

module.exports = function(mongoose)
{
    var SERVER_DB = 'mongodb://wolfpack253.ddns.net:27017/wolfpack';
    var LOCAL_DB = 'mongodb://localhost:27017/wolfpack';

    var connection = (args.local || args.l) ? LOCAL_DB : SERVER_DB;

    mongoose.connection.on('error', function () {
        console.log("Mongoose - error connecting to db @ " + connection);
    });
    mongoose.connection.once('open', function callback() {
        console.log("Mongoose connected to the database @ " + connection);
    });

    mongoose.connect(SERVER_DB);
}
