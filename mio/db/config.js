const mongoose = require('mongoose');



const dbConnection = async() => {

    try {
        
        await mongoose.connect( process.env.DB_CNN, {
         useNewUrlParser:true,
         useUnifiedTopology:true,
         useCreateIndex:true
        });

        console.log('DB Online');


    } catch (error) {
        console.error(`Error: ${error} `)
        throw new Error('Error a la hora de inicializar DB');
    }



}


module.exports = {
    dbConnection
}