import Usuario from '../modelos/usuarios.js';
import registros from '../modelos/registros.js';


export function hacerConsultaId(idColsult){

    return new Promise((resolve, reject) => {
      registros.findAll({
        where: {
            id_user: idColsult
        }
    }).then(function(resultados) {
        // Utilizar map para serializar cada objeto a JSON
        //const resultadosJSON = resultados.map(registro => registro.toJSON());
        resolve(resultados);
            

        }).catch(function(error) {
          
          console.log(error);
          reject(error);
        });
      });

}

export function hacerInsertRegistros(id, categoria, tipo, descripcion, cantidad,dia,usr_img,periodicidad,Num_periodicidad){

  return new Promise((resolve, reject) => {
    const registroNuevo = {
        id_user: id,
        tipo_operacion: tipo,
        categoria: categoria,
        descripcion:descripcion,
        cantidad:cantidad,
        dia_fecha:dia,
        user_img:usr_img,
        periodicidad:periodicidad,
        numeroMeses:Num_periodicidad
    };
    
    console.log(periodicidad+"  "+typeof(periodicidad));
    if (periodicidad=="true"){
      let fecha=new Date(dia);     
      
      for (let i=0;i<Num_periodicidad;i++){
        fecha.setMonth(fecha.getMonth() + 1);
          let anio = fecha.getFullYear();
          let mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
          let dia = ('0' + fecha.getDate()).slice(-2);
          let fechaFormateada = anio + '-' + mes + '-' + dia;
        
        
        registros.create(registroNuevo)
        .then(function(nuevoRegistro) {
            
            console.log('Registro insertado con éxito:', nuevoRegistro);
            resolve (nuevoRegistro);
        })
        .catch(function(error) {
            console.log('Error al insertar registro:', error);
            reject (error);
        });

        registroNuevo.dia_fecha=fechaFormateada;
      }
    }else if(periodicidad=="false"){
      console.log("entre en el else con : "+registroNuevo)
    registros.create(registroNuevo)
      .then(function(nuevoRegistro) {
          
          console.log('Registro insertado con éxito:', nuevoRegistro);
          resolve (nuevoRegistro);
      })
      .catch(function(error) {
          console.log('Error al insertar registro:', error);
          reject (error);
      });
    }
  });

}


export function hacerConsultaEmail(mail){

  return new Promise((resolve, reject) => {
      Usuario.findOne({
        where: {
          email: mail,
          
        }
      }).then(function(users) {
        // Aquí se ejecuta cuando se encuentra un registro
        //console.log(users);

          resolve(users);
          

      }).catch(function(error) {
        // Aquí se ejecuta cuando ocurre un error
        console.log(error);
        reject(error);
      });
    });

}
export function hacerInsert(email,usuario,password_cript){

    return new Promise((resolve, reject) => {
      
        const usuarioNuevo = {
            email: email,
            user_name: usuario,
            password_user: password_cript
        };
        
        Usuario.create(usuarioNuevo)
        .then(function(nuevoRegistro) {
            
            console.log('Registro insertado con éxito:', nuevoRegistro);
            resolve (nuevoRegistro);
        })
        .catch(function(error) {
            console.log('Error al insertar registro:', error);
            reject (error);
        });
    });
}
export function hacerBorradoDeRegistro(id) {
  return new Promise((resolve, reject) => {
    registros.destroy({
      where: {
        id: id
      }
    })
    .then(() => {
      resolve('El usuario ha sido eliminado exitosamente');
    })
    .catch((error) => {
      reject.error('Error al eliminar el usuario:', error);
    });
  });
}

export function actualizacionImg(id,imgUpdate, userUpdate){

  return new Promise((resolve, reject) => {
    Usuario.findOne({
      where: {
        id: id,
      },
      attributes: ['user_name'],
    })
      .then((usuario) => {
        
        
        const array = usuario.user_name.split(', ');
        const arrayFinal=[];
        array.forEach((elemento) => {
          const [usuario, imagen] = elemento.split(':');
          const objeto={
            usuario:usuario,
            img:imagen
          }
          arrayFinal.push(objeto);        
        });

        for (let i = 0; i < arrayFinal.length; i++) {

          if (arrayFinal[i].usuario == userUpdate) {          
            arrayFinal[i].img = imgUpdate;
            break; // salir del bucle una vez que se ha actualizado el objeto
          }
        }

        const UserReconst = arrayFinal.map(obj => `${obj.usuario}:${obj.img}`).join(', ');

        Usuario.update(
          {
            user_name: UserReconst,
          },
          {
            where: {
              id: id,
            },
          }
        )
          .then(() => {
            resolve `El campo user_name se ha actualizado correctamente para el usuario con ID ${id}`;
          })
          .catch((error) => {
            console.log(`Error al actualizar el campo user_name para el usuario con ID ${id}: ${error}`);
          }); 

        
    })
    .catch((error) => {
      console.log(`Error al obtener los datos del usuario con ID ${id}: ${error}`);
    });
  })
}
