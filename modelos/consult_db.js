import { Sequelize, Model, DataTypes } from 'sequelize';

const db = new Sequelize('b2vlq4cpqvtngmkj5lrk','usoaa7dcxizhplta','8VnRmo95nTnpBIGwNN09',{

    host:'b2vlq4cpqvtngmkj5lrk-mysql.services.clever-cloud.com',
    dialect:'mysql',
    logging:false

});
export function dbConection(){

    try{

        db.authenticate();
        console.log("Database online");

    }catch(error){
        throw new Error( error);
    }
    
}
export default db;
 