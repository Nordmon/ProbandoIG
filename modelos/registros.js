import {DataTypes} from "sequelize";
import db from "./consult_db.js";


const registros = db.define('registros_users',{
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true
    },

    id_user : {
        
        type:DataTypes.INTEGER
    },
    tipo_operacion: {
        type: DataTypes.ENUM('ing', 'gas'), // Define los valores permitidos como argumentos en el ENUM
        allowNull: false
    },
    categoria:{

        type:DataTypes.STRING

    },
    descripcion  :{

        type:DataTypes.STRING

    },
    cantidad  :{

        type:DataTypes.FLOAT

    },
    dia_fecha  :{

        type:DataTypes.DATE

    },
    periodicidad:{

        type:DataTypes.BOOLEAN
    },    
    numeroMeses  : {
        
        type:DataTypes.INTEGER
    },    
    user_img  : {
        
        type:DataTypes.STRING
    }


});


export default registros;
