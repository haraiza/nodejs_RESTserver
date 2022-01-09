const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos online');

    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de iniciar la base datos');
    }
}

module.exports = {
    dbConnection
}