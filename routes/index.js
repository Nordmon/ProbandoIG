import express from 'express';
import bcrypt from 'bcryptjs';
import { hacerConsultaId, hacerInsert,hacerConsultaEmail, hacerInsertRegistros,hacerBorradoDeRegistro,actualizacionImg,actualizoLiquidoTotal} from '../controladores/Users_sql.js';
import { mandarEmail } from '../controladores/mail_send.js'
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';


const router = express.Router();

router.use(bodyParser.json());

router.post('/ruta_insert', async (req, res) => {
    const email = req.body.email;
    const usuario = `${req.body.usuario}:default.png`;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(8);

    const password_cript=bcrypt.hashSync(password,salt);
    console.log(usuario+" dentro del router");

    const EmailReg=await hacerConsultaEmail(email);


    if(!EmailReg){

        hacerInsert(email, usuario, password_cript)
            .then(() => {
                console.log("El registro se realizó con éxito:");
                //return mandarEmail(email, usuario);//ACTIVAR EL ENVIO DE CORREO MAS ADELANTE CUANDO SE REQUIERA
            })
            .then(() => {
                console.log("El correo electrónico se envió con éxito:");
                const datos = { email, usuario , validacion:"registro"};
                return res.json(datos);
                // Aquí puedes enviar la respuesta HTTP al cliente
            })
            .catch(error => {
                console.error("Ocurrió un error:", error);
                res.status(500).send('Ha ocurrido un error en el servidor');
                // Aquí puedes enviar una respuesta de error HTTP al cliente
            });


    }else{

        const datos = { email, usuario , validacion:"YaRegistrado"};
        res.json(datos);

    }
    
  });

router.post('/login',async function(req,res){

    const mail_name=req.body.email;

    const password_user =req.body.password;


    try{
        const use=await hacerConsultaEmail(mail_name);

        if (use){
            console.log(use);
            const idDB=use.id;
            const usuarioDB=use.user_name;
            const mailDB=use.email;
            const passDB=use.password_user;
            if(bcrypt.compareSync(password_user,passDB)){                

                const datos = {idDB:idDB, mail:mailDB, validacion:"ingreso",  fail:"valido",usuario:usuarioDB};

                res.json(datos);
                //res.redirect;

            }else{

                const datos = { mail:mail_name,validacion:"ingreso",  fail:"falloPassword",usuario:"null"};

                res.json(datos);

            }

        }else{

            const datos = { mail:mail_name,validacion:"ingreso", fail:"falloUsuario",usuario:"null"};

            res.json(datos);
        }


    }catch(error){
        console.log(error);
    }
        



})
router.post('/doble_validacion',async function(req,res){

    const mail_name = req.body.email;
    
    try{
        const use=await hacerConsultaEmail(mail_name);

        const idDB=use.id;
        const mailDB=use.email;        

        const datos = {idDB:idDB, mail:mailDB};

        res.json(datos);

    }catch(error){

        console.log(error);
    }
})

router.post('/registros', async (req,res)=>{

    const idConsulta = req.body.id;
    
    hacerConsultaId(idConsulta)
    .then(resultados => {
      res.json(resultados); // Enviar los resultados como respuesta JSON al cliente
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error en la consulta'); // Enviar una respuesta de error al cliente en caso de error
    });


})

router.post('/inserto_reg',async (req,res)=>{
    console.log(req.body.id);
    hacerInsertRegistros(req.body.id, req.body.categoria, req.body.tipo, req.body.descripcion, req.body.cantidad, req.body.dia_fecha,req.body.user_img,req.body.periodicidad,req.body.numPeriodicidad)
    .then(resultados =>{
        if(resultados){
            res.json(resultados)
        }else{
            res.json(resultados)
        }
        
    })
})

router.post('/Borrar', async (req,res)=>{

    let idRegistro=req.body.id;
    hacerBorradoDeRegistro(idRegistro)
    .then(resultados =>{
        if(resultados){
            res.json(resultados)
        }else{
            res.json(resultados)
        }
        
    })

})
router.post('/actualizoImg', async (req,res)=>{

    actualizacionImg(req.body.id,req.body.imgen,req.body.user)
    .then(result=>{
        if(result){
            res.json("true")
        }else{
            res.json("false")
        }

    }) 


})
router.post('/valorTotal', async (req, res)=>{

    actualizoLiquidoTotal(req.body.id, req.body.cantTotal, req.body.tipo)
    .then(resultados =>{
        if(resultados){
            res.json(resultados)
        }else{
            res.json(resultados)
        }
        
    })

})

/* 

function mandarEmail(correo,usuario){

        // Configuración del servidor SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
        user: 'juange1988@gmail.com',
        pass: 'swuhgrrydktcpauo'
        }
    });
    
    // Configuración del mensaje de correo electrónico
    const mailOptions = {
        from: 'Ingresando y Gastando',
        to: correo,
        subject: 'Validación de registro',
        html: `<p>Hola, ${usuario}</p><p>Para validar tu registro, haz clic en el siguiente enlace: <a href="https://tusitio.com/validar-registro?token=xxxxxxxxxxx">https://tusitio.com/validar-registro?token=xxxxxxxxxxx</a></p>`
    };
    
    // Envío del correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Correo electrónico enviado: ' + info.response);
            }
        });

} */



export default router;