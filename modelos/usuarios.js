import {DataTypes} from "sequelize";
import db from "./consult_db.js";


const Usuario = db.define('users',{

    email: {
        
        type:DataTypes.STRING
    },
    user_name:{

        type:DataTypes.STRING

    },
    password_user:{

        type:DataTypes.STRING

    }

});


export default Usuario;
