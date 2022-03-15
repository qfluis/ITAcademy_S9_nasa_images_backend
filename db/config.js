const mongoose = require('mongoose');

const dbConnection = async() =>{

    try{
        console.log('Inicialización de BD en progreso...')
        await mongoose.connect( process.env.BD_CNN);
        console.log("BD inicializada");

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar BD');
    }
}

module.exports = {
    dbConnection
}