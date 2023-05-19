import { flip_card_ext } from "./fli_card.js";


if(localStorage.getItem("emailBD") && localStorage.getItem("user")){
    window.location.href = "app.html";
}else{

    //import {conectar} from "./mysql.js";
    const Email_warning=document.getElementById("Email_warning");

    const Pass_warning=document.getElementById("Pass_warning");

    document.addEventListener('DOMContentLoaded', flip_card_ext());

    document.getElementById("Mandar_form_login").addEventListener("click", miFuncionlogin);

    document.getElementById("Mandar_form_register").addEventListener("click", miFuncionRegister);

    document.querySelectorAll("input").forEach(function(input) {

        input.addEventListener("keydown", EnterPulsado);

    });


    function miFuncionlogin() {

        const email_login=document.getElementById("nombres").value;

        const usuario_pass_login=document.getElementById("pass").value;

        
        const mail= validarCampoEmail(email_login);

        const contrasen= validarContrasena(usuario_pass_login);

        const datos = { 
            email:email_login,
            password:  usuario_pass_login
        };

        if(mail===true){

            Email_warning.innerHTML="";
            
            if (contrasen===true){

                Pass_warning.innerHTML="";


                HacerPeticionEnvio(datos,"/login")
                        .then(datos2 => {

                        
                    console.log("EL DATA LLEGA BIEN DAOTS ");
                    
                    console.log(datos2.fail);

                    
                    tramitarEntrada(datos2.idDB,datos2.mail,datos2.fail,datos2.usuario);


                    //AQUI PONDRE LO QUE DESEE QUE HAGA SEGUN EL VALOR FAIL RETORNADO.
                    //ENTRAR A LA PANTALLA DE LA APLICACION

                    }).catch(error => {
                    console.log(error);
                    }); 

            }else{

                Pass_warning.innerHTML=contrasen;

            }

        }else{

            Email_warning.innerHTML=mail;

        }
                
    }

    function miFuncionRegister() {

        //APUNTAMOS A LOS ELEMENTOS DEL DOM PARA EL FORMULARIO DE REGISTRO

        const email_register=document.getElementById("correo2").value;

        const usur=document.getElementById("nombres2").value;

        const usuario_register = usur.replace(/[^a-zA-Z0-9_-ñ]/g, '');

        const usuario_pass_register=document.getElementById("pass2").value;

        const registro_usuario_warning=document.getElementById("registro_usuario_warning");

        const registro_email_warning=document.getElementById("registro_email_warning");

        const registro_pass_warning=document.getElementById("registro_pass_warning");

        const valUser=validarUsuario(usuario_register);

        const valEmail=validarCampoEmail(email_register);

        const valPass=validarContrasena(usuario_pass_register);

        console.log("el usuario admite o no "+ usuario_register);


        if( valEmail===true && valUser===true && valPass===true) {

            loadingTimeActivate();

            registro_email_warning.innerHTML="valido";
            registro_usuario_warning.innerHTML="valido";
            registro_pass_warning.innerHTML="valido";

            registro_email_warning.className="warnings-valido";
            registro_usuario_warning.className="warnings-valido";
            registro_pass_warning.className="warnings-valido";

            const datos = { 
                email:email_register,
                usuario: usuario_register,
                password:  usuario_pass_register
            };

            

            HacerPeticionEnvio(datos,"/ruta_insert").then(dataDevuelta => {
                
                //AQUI TENGO QUE PONER EL CODIGO QUE MANEJA EL DOM CAMBIANDO EL LOGIN A FELICITACION DE VALIDACION

                const formRegisterElement = document.querySelector('.form-register#seccionLogin');

                const inputElements = formRegisterElement.getElementsByTagName('input');
                const divElementTarget = document.getElementById('msgSucess');
        
                // Iterar a través de los elementos hijos y establecer su estilo a "display: none"
                for (var i = 0; i < inputElements.length; i++) {

                    inputElements[i].style.display = 'none';

                }

                divElementTarget.style.display="flex";

                // Agregar el elemento de etiqueta 'label' como hijo del elemento padre seleccionado
                

                const flipCardToggle = document.querySelector("#flip-card-toggle-inac");
                
                var flipCard = flipCardToggle.parentNode.parentNode.parentNode.parentNode;
                
                
                loadingTimeDesactivate();
                flipCard.classList.toggle('flipped');
                
                divElementTarget.addEventListener("click", ()=>{

                    
                    for (var i = 0; i < inputElements.length; i++) {

                        inputElements[i].style.display = 'inline';


                    }
                    const email_login=document.getElementById("nombres");

                    email_login.value=dataDevuelta.email;

                    divElementTarget.style.display="none";

                });


            }).catch(error => {
                console.error(error);
            });

            

        }else{

            if (valEmail===true){

                registro_email_warning.innerHTML="valido";
                registro_email_warning.className="warnings-valido";

            }else{registro_email_warning.innerHTML=valEmail}
            
            if (valUser===true){

                registro_usuario_warning.innerHTML="valido";
                registro_usuario_warning.className="warnings-valido";

            }else{registro_usuario_warning.innerHTML=valUser}
                
            if (valPass===true){

                registro_pass_warning.innerHTML="valido";
                registro_pass_warning.className="warnings-valido";
            
            }else{registro_pass_warning.innerHTML=valPass}


        }
        
        // if(validarCampoEmail(email_register))
        

        //window.location.href = `/insert/${email_register}/${usuario_register}/${usuario_pass_register}`;

    }

    async function HacerPeticionEnvio(data, url){

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

            // Hacer la petición con fetch

            return fetch(url, requestOptions)
            .then(response => response.json()) // Convertir la respuesta en texto
            .then(datos => {
                // Manejar la respuesta como un objeto JavaScript
                if (!datos){
                    console.error("No se ha introducido ningun registro");
                }else{

                    if(datos.validacion=="registro"){

                        const resultDatosRegistro=datos;
                        datos={};
                        
                        return resultDatosRegistro;
                    
                    }else if(datos.validacion=="ingreso"){

                        const resultDatosLogin=datos;
                        datos={};

                        return resultDatosLogin;
                        
                    }

                }
            })
            .catch(error => {
                console.error(error)
            });


    }

    function EnterPulsado(evento) {

        //LANZAR EL EVENTO DE LOGIN AL PULSAR ENTER
        if (evento.key === "Enter") {
            let ValorCapturado=evento.target.id;

            if(ValorCapturado=="nombres" || ValorCapturado=="pass") miFuncionlogin();
            if(ValorCapturado=="nombres2" || ValorCapturado=="pass2" || ValorCapturado=="pass2") miFuncionRegister();
                
        }
    }
    //validacion de formulario
    function validarCampoEmail(mail){

        let regexEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        if(mail.length<5){

            const msg="Email demasiado corto.";

            return msg;

        } else {
        
            if(!regexEmail.test(mail)){

                const msg="No es un Email valido."
                return msg;

            }else{

                return true;
            }
        
        }

    }

    //VALIDACION DE CAMPO PASSWORD
    function validarContrasena(contrasena) {
        if (contrasena.length < 6 || !(/[a-z]/.test(contrasena) && /[0-9]/.test(contrasena))) {
            const msg2="La contraseña requiere números, letras y mayor de 6 caracteres.";
            return msg2;
        } else {
            return true;
        }
        }

    function validarUsuario(campoUser) {

        let expresion = /^[a-zA-Z0-9-_#@ñ]+$/;
        if (campoUser.length < 3){
            const ms3="Usuario debe ser mayor de 3 caracteres.";
            return ms3;
        }else{
            if (!expresion.test(campoUser.value)) {
                const ms3="Usuario podrá contener letras, números y - _ # @";
                return ms3;

            } else {
                return true;
            }
        }
    }



    function loadingTimeDesactivate(){

        const elementosLoading = document.querySelectorAll('.loading');

        for (let i = 0; i < elementosLoading.length; i++) {
            elementosLoading[i].style.display = 'none';

        }
    }
    function loadingTimeActivate(){

        const elementosLoading = document.querySelectorAll('.loading');

        for (let i = 0; i < elementosLoading.length; i++) {
            elementosLoading[i].style.display = 'flex';
        }
    }

    function tramitarEntrada(Id,emailBD,PosibleFallo,user){

        

        if(PosibleFallo=="falloUsuario"){
            Email_warning.innerHTML="Ese email no lo encontramos."
        }else if(PosibleFallo=="falloPassword"){

                Pass_warning.innerHTML="El password no parece correcto intentelo de nuevo";

        }else if (PosibleFallo=="valido"){

            localStorage.setItem("Id", Id)
            localStorage.setItem("emailBD", emailBD);
            localStorage.setItem("user", user);

            // Realizar la redirección a la página "/app.html"
            window.location.href = "/app.html";
            //aqui quiero hacer la redireccion hacia "/app.html" y enviar los datos de PakDatos, ademas de en html hacer una vallidacion del user 

        }else{

            console.log("algo ha salido mal")
        }
            

    }
}
// //CREAR FUNCION VALIDAR EL FORMULARIO, SACAR MENSAJE DE ALTA SATISFACTORIA, Y  PODER LOGEARTE Y SACAR MENSAJE DE LOGIN SATISFACTORIO, CODIFICAR EL PASSWORD, EVITAR SQL INSERCIONES 
