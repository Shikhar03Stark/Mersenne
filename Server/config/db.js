const mongoose = require('mongoose');

const instance = mongoose.createConnection(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// If the connection throws an error
instance.on('error',function (err) {  
    console.log('DB error: ' + err);
  }); 
  
// When the connection is disconnected
instance.on('disconnected', function () {  
    console.log('DB disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
    instance.close(function () { 
        process.exit(0); 
    }); 
});

//when connection is setup
instance.once('open', () => {
    console.log(`DB Connected ${Date.now()}`);
});

module.exports = instance;