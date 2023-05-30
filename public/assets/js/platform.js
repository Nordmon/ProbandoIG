

if(localStorage.getItem("emailBD") && localStorage.getItem("user")){
    //recojo datos del localstorage
    const emailBD = localStorage.getItem("emailBD");
    const user = localStorage.getItem("user");
    const id = localStorage.getItem("Id");
    var CtotalLiquido=parseFloat(localStorage.getItem("CTotal"));
    let LiquidoTotalPerfil="";
    const reg_ing=[];
    const reg_gastos=[]; 
    let arrayFinal=[];


    let divisionUser = user.split(', ');
    let sdadaivisionuser = divisionUser[0].split(':')
    
    //ARRAY CON LOS USUARIOS E IMAGENES
    
    const SeleccionUsuario=()=>{

        const bloqueLanzarUsuario=(usuario,img)=>{

            return `
        
        <div class="img_box" id="user${usuario}">
            <img id="${img}" src="assets/img/clients/${img}" alt="imag3">
            <h2 id="${usuario}">${usuario}</h2>
        </div>`
        };

        const seleccion_usuario=document.getElementById('seleccion_usuario');
        const seleccionbloqueHtml=document.querySelector('.Usuarios');
        const seleccionDesabilitador=document.querySelector('.desabilitador2');
      

        for (let i = 0; i < divisionUser.length; i++) {
            const elemento = divisionUser[i];
            const [usuario, img] = elemento.split(':');
            
            seleccionbloqueHtml.insertAdjacentHTML('beforeend', bloqueLanzarUsuario(usuario,img));
            
            const clickAreaUser=document.getElementById(`user${usuario}`);
            clickAreaUser.addEventListener("click",()=>{
                const h2 = clickAreaUser.querySelector("h2");
                const imgenSeleccion = clickAreaUser.querySelector("img");
                localStorage.setItem("userSeleccionado", h2.id);
                
                localStorage.setItem("imgSeleccionado", imgenSeleccion.id);
                seleccion_usuario.style.display='none';
                seleccionDesabilitador.style.display='none';
            })
          }

        
        seleccion_usuario.style.display='flex';
        seleccionDesabilitador.style.display='initial';

    }
//fin de seleccion de user
    const SeleccionImagen=(usernew)=>{
        const SelctionImgUser=document.getElementById("ImgUserSelection");
        const div_desabilitador =document.querySelector('.desabilitador');
        const imgBoxes=document.querySelectorAll('.imgBoxes');
        
            imgBoxes.forEach((box) => {
                box.addEventListener('click', (e) => {
                    const imgSeleccionUser=e.target.alt+".png";
                    if(usernew){

                        insertNewImg(id,usernew,imgSeleccionUser,'add');


                    }else{

                        localStorage.setItem("imgSeleccionado", imgSeleccionUser);
                        insertNewImg(id,localStorage.getItem("userSeleccionado"),imgSeleccionUser,'update');
                    }
                    
                    SelctionImgUser.style.display="none";
                    div_desabilitador.style.display='none';
                });
            });


    }
    
    const createNewUser=()=>{

        const boton = document.getElementById('newPerfil');
        let firstClick=true;
        const contenido = boton.nextElementSibling;
            boton.addEventListener('click', (event) => {
                
                if(firstClick){
                    
                    contenido.style.display = 'block';
                    /* contenido.style.top = event.clientY + 'px';
                    contenido.style.left = event.clientX + 'px'; */
    
                    firstClick=false;
                }else{
                    
                    
                    contenido.style.display = 'none';
                    
                    firstClick=true;
                }

    
            });

            const BotonSubmit3=document.getElementById("botoninsrt");
            
            BotonSubmit3.addEventListener("click",()=>{
                
                const SelctionImgUser=document.getElementById("ImgUserSelection");
                let introducirNewUser=document.getElementById("introducirNewUser");
                const SelctionDesabilitador=document.querySelector(".desabilitador");

                let validacion=introducirNewUser.value.replace(/[^a-zA-Z0-9_-ñ]/g, '');
                if (validacion.length>10){
                    
                    mensaje.style.display='flex';
                    mensaje.style.color= '#E43F31';
                    mensaje.textContent='demasiado largo, 10 caracteres maximo'
                    setTimeout(()=>{
                        mensaje.style.display='none';
                        mensaje.style.color= 'black';
                    },3000 );
                    return false;
                }
                SelctionImgUser.style.display="grid";
                SelctionDesabilitador.style.display = 'initial';
                introducirNewUser.value="";
                introducirNewUser.textContent="";
                contenido.style.display = 'none';
                
                firstClick=true;
                
                SeleccionImagen(validacion);

            }); 
    }
     
    

    function arranque(){
        const SelctionImgUser=document.getElementById("ImgUserSelection");
        const div_desabilitador =document.querySelector('.desabilitador');
        if(sdadaivisionuser[1]=="default.png"){
            
            SelctionImgUser.style.display="grid";
            localStorage.setItem("userSeleccionado", sdadaivisionuser[0]);
            div_desabilitador.style.display='initial';
            SeleccionImagen();
           

        }else{
            if(!localStorage.getItem("userSeleccionado")){
                SeleccionUsuario(); 
            }  
        }

        
        /*   --------------------- BARRA DE ABAJO MUESTRA COLUMNAS Y PERFIL ----------------------- */
        
        const div_select = document.querySelector('.column');
        const div_select2 = document.querySelector('.column2');
        const div_select3 = document.querySelector('.column3');
        const div_superpuesto =document.querySelector('.div-superpuesto');
        const botonIngresos = document.getElementById('boton_ingres');
        const botonGastos = document.getElementById('boton_gasto');
        const botonCalendario = document.getElementById('boton_calend');
        const botonUsuario = document.getElementById('user_menu');
        const currentUser = document.getElementById('currentUser');  
        const emailUserPerfil = document.getElementById('EmailUserPerfil');
        const selectionspaceImg = document.getElementById('spaceImg');
        const seleccionCambioUser=document.getElementById('UsrChange');
        const botCierreSesion=document.getElementById('botCierreSesion');
        const boton_actualizaTotal=document.getElementById('actualizarTotal');
        LiquidoTotalPerfil=document.getElementById('liquidoTotal');

        
        LiquidoTotalPerfil.value=CtotalLiquido.toFixed(2);
        
        let updateUser=false;

        
        boton_actualizaTotal.addEventListener('click',()=>{
            let cantActualizadaPeerfil=LiquidoTotalPerfil.value;
            
            actualizaLiquido(cantActualizadaPeerfil,'update');


        });
        botCierreSesion.addEventListener('click',()=>{
            cerrarSesion();

        });



        //CONSTRUCCION DE SELECT PARA CAMBIAR EL USUARIO
        for (let i = 0; i < divisionUser.length; i++) {
            const opcion = document.createElement("option");
            const elemento = divisionUser[i];
            const [usuario, img] = elemento.split(':');
            opcion.value= elemento;
            opcion.textContent=usuario;
            seleccionCambioUser.add(opcion);
        }

        const ActualizaUsuario=()=>{

            if(updateUser===false){
                spaceImg.innerHTML = "";
                currentUser.textContent=localStorage.getItem("userSeleccionado");
                emailUserPerfil.textContent=emailBD;
                selectionspaceImg.insertAdjacentHTML('beforeend', imagenMenu(localStorage.getItem("imgSeleccionado"))); 
                updateUser=true;
            }

        }

        seleccionCambioUser.addEventListener("change", () => {
            const seleccionado = seleccionCambioUser.value;
            const [usuario, img] = seleccionado.split(':');
            localStorage.setItem("userSeleccionado", usuario); 
            localStorage.setItem("imgSeleccionado", img);
            updateUser=false;
            ActualizaUsuario();
            // Aquí puedes llamar a la función que quieres ejecutar cuando se seleccione una opción
          });



        const imagenMenu=(imge)=>{
            return `<img src="./assets/img/clients/${imge}" alt="user">`
        };

            
        selectionspaceImg.addEventListener('click',()=>{

            const changeImg=document.getElementById('ImgUserSelection');
            changeImg.style.display='grid';
            div_desabilitador.style.display='initial';
            SeleccionImagen();

        })

        //AÑADIR UN USUARIO NUEVO A LA BASE DE DATOS

        createNewUser();//CREA EL BOCADILLO PARA INSERTAR REGISTRO

        function quitarPerfil(){
            document.addEventListener('mousedown', function(event) {
            // Verificar si el objetivo del evento no está dentro del div superpuesto
                if (!div_superpuesto.contains(event.target) && div_superpuesto.style.display==="initial") {       
                div_superpuesto.style.display="none";  
                          
                }
            }); 
        }

        const setMenuButton=()=>{

            div_select.style.display="initial";
            div_select2.style.display="none";
            div_select3.style.display="none";
            

            botonIngresos.addEventListener('click', function FirstButtIn() {

                div_select.style.display="initial";
                div_select2.style.display="none";
                div_select3.style.display="none";
                div_superpuesto.style.display="none";

            });
            
            botonGastos.addEventListener('click', function FirstButtGas() {

                div_select.style.display="none";
                div_select2.style.display="initial";
                div_select3.style.display="none";
                div_superpuesto.style.display="none";
            });
            
            botonCalendario.addEventListener('click', function FirstButtCla() {
                div_select.style.display="none";
                div_select2.style.display="none";
                div_select3.style.display="initial";
                div_superpuesto.style.display="none";
            });
            
            botonUsuario.addEventListener('click', function(e) {

                e.stopPropagation();
                div_superpuesto.style.display="initial";

                ActualizaUsuario();

                quitarPerfil();

            });

        }

        const setMenuButton600_1099=()=>{

            div_select.style.display="initial";
            div_select2.style.display="initial";
            div_select3.style.display="none";
            

            botonIngresos.addEventListener('click', function SecondButtIn() {

                div_select.style.display="initial";
                div_select2.style.display="initial";
                div_select3.style.display="none";
                div_superpuesto.style.display="none";

            });
            
            botonGastos.addEventListener('click', function SecondButtGas() {

                div_select.style.display="initial";
                div_select2.style.display="initial";
                div_select3.style.display="none";
                div_superpuesto.style.display="none";
            });
            
            botonCalendario.addEventListener('click', function SecondButtCal() {
                div_select.style.display="none";
                div_select2.style.display="initial";
                div_select3.style.display="initial";
                div_superpuesto.style.display="none";
            });
            
            botonUsuario.addEventListener('click', function(e) {

                e.stopPropagation();
                div_superpuesto.style.display="initial";
                ActualizaUsuario();
                quitarPerfil();
            });

        }

        const setMenuButton1100=()=>{

            const displayAll=()=>{
            div_select.style.display="initial";
            div_select2.style.display="initial";
            div_select3.style.display="initial";
            }
            displayAll();

            botonIngresos.addEventListener('click', function() {

                displayAll();
                div_superpuesto.style.display="none";

            });
            
            botonGastos.addEventListener('click', function() {

                displayAll();
                div_superpuesto.style.display="none";

            });
            
            botonCalendario.addEventListener('click', function() {

                displayAll();
                div_superpuesto.style.display="none";

            });
            
            botonUsuario.addEventListener('click', function(e) {

                e.stopPropagation();
                div_superpuesto.style.display="initial";
                ActualizaUsuario();
                quitarPerfil();

            });

        }

        

        const resizeMenu=()=>{
            const _screenWidth = window.innerWidth;
            if(_screenWidth<=599){
                    
                setMenuButton();
            }else if(_screenWidth>599 &&  _screenWidth<=1100  ){

                setMenuButton600_1099();

            }else if(_screenWidth>1099){

                setMenuButton1100();

            }
        }
        resizeMenu();
        window.addEventListener('resize', function() {
        
            resizeMenu();

        });

        ejecutarConsulta();
       
    }
    // FIN DE FUNCION DE ARRANQUE

    function ejecutarConsulta(){
        const totGas=document.getElementById("TotGas"); 
        const totIng=document.getElementById("TotIng");
        let cantTotGas=0;
        let cantTotIng=0;
        /*   --------------------- SELECCION DE CATEGORIAS ----------------------- */

        const lanzoCategorias=(contadorSelec1,contadorSelec2)=>{

        const category_name=["Otros","Compras Digitales","Vivienda", "Alimentación", "Transporte", "Educación" , "Bares" ,"Salud","Electricidad", "Agua", "Gas", "Seguros", "Impuestos", "Deudas", "Hipotecas", "Préstamos", "Entretenimiento"]

            category_name.forEach(element => {

                const optionElement1 = document.createElement('option');
                optionElement1.value = element;
                optionElement1.textContent = element;

                if(contadorSelec1==true){

                    const CategorySelect1=document.getElementById('CategorySelect1');

                    CategorySelect1.appendChild(optionElement1);

                }
            
                if(contadorSelec2==true){

                const CategorySelect2=document.getElementById('CategorySelect2');

                CategorySelect2.appendChild(optionElement1);

                }
    
            });



        }
        

      //----------BLOQUE DE CONSTRUCCION DE REGISTRO INGRESOS Y GASTOS--------

        const lanzaPeriodicidad=((valor)=>{

            const Periodicidad=document.getElementById("Periodici"+valor);
            const numPeriodic=document.getElementById("Num_periodic"+valor);
            Periodicidad.addEventListener("change",(event)=>{
                if (event.target.value==='true'){
                    numPeriodic.innerHTML=`<input class="controls" type="number" name="periodicidad" id="NumeroSelec${valor}" placeholder="meses">`;              
                }else{
                    numPeriodic.textContent = 'Periodicidad';
                }
            })

        })

        const ConstruirRegistro=(cat, desc, cant, dia,id_reg,Img_user,user)=>{
                
            return `

            <div class="container-registro" id="${id_reg}">
                <div class=" contenedor">
                    <div class="data_user">
                        <div class="Reg_category">${cat}, Día: ${dia}</div>
                        <div class="Reg_Description">
                            <div class="User_logo">
                            
                            <figure>
                                <img src="./assets/img/clients/${Img_user}" alt="user">
                                <figcaption>${user}</figcaption>
                            </figure>                            
                            
                            </div>
                            <div class="Reg_Texto">${desc}<p><strong>${cant}€</strong><p></div>
                        </div>
                    </div>
                    <div class="option_user">
                        <div class="subdiv" id="Period${id_reg}"><img src="./assets/img/periodicTrue.png" alt="periodico"></div>
                        <div class="subdiv" id="Edit${id_reg}"><img src="./assets/img/editable.png" alt="editable"></div>
                        <div class="subdiv" id="del${id_reg}"><img src="./assets/img/delete.png" alt="eliminar"></div>
                    </div>
                </div>
            </div>
            

        `};
    
        const newValueForm=(numCat)=>{
            return `
        
        <div class="" id="cont_reg${numCat}">
             
            <div class="contenedor_nuevoReg">
            
            <div class="msg_error" id="msg_error${numCat}"></div>
                <div class="data_user">
                <div class="Reg_category">
                    <select class="CategorySelect" id="CategorySelect${numCat}"></select>
                    <p>Seleccion Categoria</p>        
                </div>
                <div class="Reg_category">
                <select id="Periodici${numCat}">
                    <option value="false">No Periódico</option>
                    <option value="true">Periódico</option>
                    </select> 
                    <div style="margin:auto" id="Num_periodic${numCat}">Periodicidad</div>               
                </div>
                <div class="Reg_Description">                 
                    <div class="Reg_Texto">   
                                      
                        <input class="controls" type="text" name="Description" id="TextRegistro${numCat}" placeholder="Descripcion">
                        <input class="controls" type="number" name="Cantidad" id="AmountRegistro${numCat}" placeholder="Importe">
                    </div>
                    <div class="User_logo">
                        <input class="botons" type="submit" value="OK" id="RegistroNew${numCat}">
                        <input class="botons" type="submit" value="Cancel" id="cierraPes${numCat}" style="color:red">
                    </div>

                </div>
                </div>            
            </div>
            </div>
        `};
    /*   --------------------- CREAR REGISTRO Y PONER A LA ESCUCHA EL BOTON NUEVO ----------------------- */

        const column = document.querySelector('.column');  
        const column2 = document.querySelector('.column2'); 
        
        const BotonNuevoING=`
            <div class="bot-new" id="BotonNuevoING">
                <img src="./assets/img/bot_mas2small.png" alt="boton nuevo">
            </div>
        `;
        const BotonNuevoGAS=`
        <div class="bot-new" id="BotonNuevoGAS">
            <img src="./assets/img/bot_mas2small.png" alt="boton nuevo">
        </div>
        `;
        const temp=new Date();
        const año = temp.getFullYear();
        const mes = (temp.getMonth() + 1).toString().padStart(2, '0');
        const dia = temp.getDate().toString().padStart(2, '0');
        
        // Formatea la fecha en el formato deseado
        const fechaFormateada = `${año}-${mes}-${dia}`;
        
        const lanzoRegGas=(cat, desc, cant, fechaEntrada, id_reg, period, num_period,userImg,user)=>{
            
            const id_seleccionado=id_reg;   
            const img=userImg; 

            let partes = fechaEntrada.split("-");
            let diaExtraido = partes[2];
            if(año==partes[0] && mes==partes[1]){
                let cantidad=parseFloat(cant);
                
                cantTotGas+= cantidad;
                
                column2.insertAdjacentHTML('beforeend', ConstruirRegistro(cat, desc, cant, diaExtraido,id_reg,img,user));
                
                //SELECCION DE LOS BOTONES DERECHOS 
                const divPeriodico = document.getElementById('Period'+id_seleccionado);
                const divEditable = document.getElementById('Edit'+id_seleccionado);
                const divEliminar = document.getElementById('del'+id_seleccionado);

                //EVENTOS PARA LOS ELEMENTOS DE NUEVO REGISTRO
                if(period=='true' || period==1){

                    const numPeriodo=num_period;
                    

                }else{

                    divPeriodico.style.display="none";

                }
                    
                divEditable.addEventListener('click', () => {

                    ActualizarReg(id_reg);
                });
                
                divEliminar.addEventListener('click', () => {
                    let tip=0;
                    lanzarBorradoReg(id_reg,cant,tip,desc);
                    const seleccionRegistro=document.getElementById(id_reg);
                    

                    while (seleccionRegistro.firstChild) {
                        seleccionRegistro.firstChild.remove();
                    }
                    seleccionRegistro.remove();

                });
                return cantidad;
            }
        }

        const lanzoRegIng=(cat, desc, cant, fechaEntrada, id_reg,period, num_period,userImg,user)=>{
            
            const img=userImg; 
            let partes = fechaEntrada.split("-");
            let diaExtraido = partes[2];
            if(año==partes[0] && mes==partes[1]){

                let cantidad=parseFloat(cant);
                cantTotIng+= cantidad;

            const ElmentoNuevo=column.insertAdjacentHTML('beforeend', ConstruirRegistro(cat, desc, cant, diaExtraido,id_reg,img,user));
            
            
                //SELECCION DE LOS BOTONES DERECHOS 
                const divPeriodico = document.getElementById('Period'+id_reg);
                const divEditable = document.getElementById('Edit'+id_reg);
                const divEliminar = document.getElementById('del'+id_reg);

                //COMPROBACION DE LA PERIODICIDAD DEL CAJON DE REGISTRO
                if(period=='true' || period==1){
                    const numPeriodo=num_period;
                    
                }else{
                    divPeriodico.style.display="none";
                }
                    //EVENTOS PARA LOS ELEMENTOS DE NUEVO REGISTRO
                divEditable.addEventListener('click', () => {
                    ActualizarReg(id_reg);
                    
                });
                
                divEliminar.addEventListener('click', () => {
                let tip=1;
                lanzarBorradoReg(id_reg,cant,tip,desc);
                    const seleccionRegistro=document.getElementById(id_reg);                    

                    while (seleccionRegistro.firstChild) {
                        seleccionRegistro.firstChild.remove();
                    }
                    seleccionRegistro.remove();
                          
                });
                
            }
        }

        //------------------------------CONTRUCCION DE BOTON NUEVO DE LAS COLUMNAS------------------
        let contadorIdLive=0;
        const construyeBotones=()=>{

            
            //PROGRAMAR EL BOTON DE LA COLUMNA INGRESOS PARA SI EXISTE NO SE DUPLIQUE
//----------------------EJECUCION DEL REGISTRO EN INGRESOS

            if(!document.getElementById("BotonNuevoING")){

                column.insertAdjacentHTML('beforeend', BotonNuevoING);  
                const BotNewING=document.getElementById('BotonNuevoING');  
                BotNewING.addEventListener('click',()=>{
                const IdLive="volatile"+contadorIdLive;
                contadorIdLive+=10;

                    BotNewING.remove();
                    column.insertAdjacentHTML('beforeend', newValueForm(2));
                    lanzoCategorias(false,true);//en vez de esto crear un elemento en su lugar
                    const SelectSubmitIng=document.getElementById("RegistroNew2");
                    const cierraPestania2=document.getElementById("cierraPes2");
                    const containers2=document.getElementById('cont_reg2');


                    cierraPestania2.addEventListener('click',()=>{
                        
                        while (containers2.firstChild) {
                            containers2.firstChild.remove();
                        }
                        containers2.remove();
                            
                        construyeBotones();
                    });

                    lanzaPeriodicidad(2);
                    
                    SelectSubmitIng.addEventListener('click',()=>{
                        
                        const selecPeriodic = document.getElementById('Periodici2').value;
                        const txtoRegIng=document.getElementById("TextRegistro2").value;
                        const amountIng=document.getElementById("AmountRegistro2").value;

                        const textFilter = txtoRegIng.replace(/[^a-zA-Z0-9_-ñ\s]/g, '');
                        var numeroMesesSelect=0;
                        if(selecPeriodic=="true"){
                            
                            numeroMesesSelect=document.getElementById(`NumeroSelec2`).value;
                        }
                        //VARIABLE ASIGNADA CON EL NUMERO DE MESES DE PERIODICIDAD
                        

                        if(amountIng=="" || textFilter=="" || textFilter.length>50 || numeroMesesSelect>24){

                            const mensajeError=document.getElementById("msg_error2");

                            if(textFilter.length>50){
                                mensajeError.textContent="Descripcion requiere menos de 50 letras."
                                mensajeError.style.display="flex";
                                setTimeout(()=>{
                                    mensajeError.style.display="none";
                                },2000);
                                
                            }else{
                                if(numeroMesesSelect>24){
                                    mensajeError.textContent="Valor periodicidad entre 1 y 24 meses."
                                    mensajeError.style.display="flex";
                                    setTimeout(()=>{
                                        mensajeError.style.display="none";
                                    },2000);
                                }
                                mensajeError.textContent="Introduzca valores."
                                mensajeError.style.display="flex";
                                setTimeout(()=>{
                                    mensajeError.style.display="none";
                                },2000);

                            }
                            

                        }else{
                            // -------------------------BLOQUE DE INSERCION DE REGISTROS------------
                            const categoriaSelecIng=document.getElementById("CategorySelect2").value;
                            const tipo_valor="ing"; 
                            
                            const packDatos={
                                id:IdLive,
                                cantidad: parseFloat(amountIng),
                                categoria:categoriaSelecIng,
                                descripcion:textFilter,
                                dia_fecha:fechaFormateada,                       
                                tipo:tipo_valor,
                                periodicidad:selecPeriodic,
                                numPeriodicidad:numeroMesesSelect
                            }

                            reg_ing.push(packDatos);
                            nuevo_Registro(packDatos);

                            
                            while (containers2.firstChild) {
                                containers2.firstChild.remove();
                            }
                            containers2.remove();

                            lanzoRegIng(categoriaSelecIng, txtoRegIng, amountIng, fechaFormateada,IdLive,selecPeriodic,numeroMesesSelect,localStorage.getItem("imgSeleccionado"),localStorage.getItem("userSeleccionado"));

                            
                            construyeBotones();
                            
                            contadorIdLive+=10;

                          let cantTotIng=parseFloat(totIng.textContent)+packDatos.cantidad;

                            
                            totIng.textContent=cantTotIng.toFixed(2); ;

                        }

                    
                        //DATOS LISTOS PARA SER ENVIADOS A nuevo_Registro()

                        //VALIDAR SI EL USUARIO ESTA VALIDADO EN EL CORREO PARA PODER GUARDAR EN BASE DE DATOS
                        
                    })
                })  
            }

            //----------------------EJECUCION DEL REGISTRO EN GASTOS
            if(!document.getElementById("BotonNuevoGAS")){
                column2.insertAdjacentHTML('beforeend', BotonNuevoGAS);
                const BotNewGAS=document.getElementById('BotonNuevoGAS');
                
                const IdLive="volatile"+contadorIdLive;
                contadorIdLive+=10;
                BotNewGAS.addEventListener('click',()=>{
                    BotNewGAS.remove();
                    column2.insertAdjacentHTML('beforeend', newValueForm(1));
                    lanzoCategorias(true,false);
                    const SelectSubmitGas=document.getElementById("RegistroNew1");
                    const containers1=document.getElementById('cont_reg1');
                    const cierraPestania1=document.getElementById("cierraPes1");
                    
                    cierraPestania1.addEventListener('click',()=>{
                    
                        while (containers1.firstChild) {
                            containers1.firstChild.remove();
                        }
                    containers1.remove();
                        
                    construyeBotones();
                    });

                    lanzaPeriodicidad(1);

                    SelectSubmitGas.addEventListener('click',()=>{

                        const categoriaSelecGas=document.getElementById("CategorySelect1").value;
                        let Periodicidad=document.getElementById("Periodici1").value;
                        const txtoRegGas=document.getElementById("TextRegistro1").value;
                        const amountGas=document.getElementById("AmountRegistro1").value;
                        const textFilter = txtoRegGas.replace(/[^a-zA-Z0-9_-ñ]/g, '');
                        let numeroMesesSelect=0;
                        if(Periodicidad=='true'){
                            
                            numeroMesesSelect=document.getElementById(`NumeroSelec1`).value;
                        }
                    

                        if(amountGas=="" || textFilter=="" || textFilter.length>50){
    
                            const mensajeError=document.getElementById("msg_error1");
    
                            if(textFilter.length>50){
                                mensajeError.textContent="Descripcion requiere menos de 50 letras."
                                mensajeError.style.display="flex";
                                setTimeout(()=>{
                                    mensajeError.style.display="none";
                                },2000);
                                
                            }else{
                                mensajeError.textContent="Introduzaca valores."
                                mensajeError.style.display="flex";
                                setTimeout(()=>{
                                    mensajeError.style.display="none";
                                },2000);
    
                            }
                            
                        }else{
                            const tipo_valor="gas";
                            const packDatos={
                                id:IdLive,
                                cantidad: parseFloat(amountGas),
                                categoria:categoriaSelecGas,
                                descripcion:txtoRegGas,
                                dia_fecha:fechaFormateada,                       
                                tipo:tipo_valor,
                                periodicidad:Periodicidad,
                                numPeriodicidad:numeroMesesSelect
                            }
                            
                            reg_gastos.push(packDatos);
                            nuevo_Registro(packDatos);
                            
                            
                            while (containers1.firstChild) {
                                containers1.firstChild.remove();
                            }
                            containers1.remove();
                            lanzoRegGas(categoriaSelecGas, txtoRegGas, amountGas, fechaFormateada,IdLive,Periodicidad,numeroMesesSelect,localStorage.getItem("imgSeleccionado"),localStorage.getItem("userSeleccionado"))
                            
                            construyeBotones();

                            let cantidadGasto=parseFloat(totGas.textContent)+packDatos.cantidad;
                            totGas.textContent=cantidadGasto.toFixed(2); ;
                            //RECOPILADOS DATOS GASTOS PARA ENVIAR A LA BD
                        }
                    })
                
                })
            }


        }
        
//--------------------CONSULTA A BASE DE DATOS ------------------------------------------




        const arrayFechasIng=[];
        const arrayFechasGas=[];
        
        const datosValidar = { 
            email:emailBD    
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosValidar)
        };

        fetch('/doble_validacion', requestOptions)
        .then(response => response.json())
        .then(datos => {
            
            if (!datos){
                console.error("La consulta no devuleve valores, a la app");
            }else{

                if(datos.idDB==id && datos.mail==emailBD){

                    
                    //AQUI EMPEZARIA A CARGAR LOS ELEMENTOS DEL ID SELECCIONADO EN UN ARRAY
                    //por ahora solo recoje 1 solo resultado necesito sacar todos los resultados con el id seleccionado
                    
                    const datosDeId = { 
                        id:datos.idDB    
                    };
                    const EnvioId = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datosDeId)
                    };
                    fetch('/registros', EnvioId)
                    .then(response => response.json())
                    .then(data => {

                        for (const registro of data) {
                            
                            if(registro.tipo_operacion=='ing'){
                                
                                reg_ing.push(registro);
                                
                                arrayFechasIng.push(registro.dia_fecha);
                                
                            }else if(registro.tipo_operacion=='gas'){

                                
                                reg_gastos.push(registro);
                                arrayFechasGas.push(registro.dia_fecha);
                            }
                        } 
                        for (const registro of reg_ing) {
                            const userImgDiv=(registro.user_img).split(":");
                            const [user,imgen]=userImgDiv;
                            

                            lanzoRegIng(registro.categoria,registro.descripcion,registro.cantidad,registro.dia_fecha,registro.id,registro.periodicidad,registro.numeroMeses,imgen,user);


                        }
                        for (const registro of reg_gastos) {
                            
                            const userImgDiv=(registro.user_img).split(":");
                            const [user,imgen]=userImgDiv;
                            
                            lanzoRegGas(registro.categoria,registro.descripcion,registro.cantidad,registro.dia_fecha,registro.id,registro.periodicidad,registro.numeroMeses,imgen,user);
                            
                        }
                        totGas.textContent=cantTotGas.toFixed(2);
                        totIng.textContent=cantTotIng.toFixed(2);                    
                        
                        construyeBotones();

                        lanzarCalendario(arrayFechasIng,arrayFechasGas);
                    })
                   
                    .catch(error => {
                        console.error(error)
                    });
                     
                }
                
            }
        })
        .catch(error => {
            console.error(error)
        });

        
    }

    // FIN DE FUNCION DE eJECUCION DE LA CONSULTA
    const lanzarCalendario=(fechaIng,fechaGas)=>{
        /*   --------------------- SELECCION DE AÑO ----------------------- */
        
        function Bcr_Fecha(Array,fecha_buscada){
            
            for(let i=0;i<Array.length;i++){
                if (Array[i] == fecha_buscada) {  
                return true;
                }            
            }      
        }           

        const seleccierre=document.getElementById("cierraPestania");
        const selecciono_Ok=document.getElementById("RegistroNewCalendar");
        const seleccionDescription=document.getElementById('descript');
        const selectionCant=document.getElementById('cant_text');
        const Periodic=document.getElementById('PeriodicValue');
        const CategorySelectValue=document.getElementById('CategorySelectValue');
        const fechaCaalendar=document.getElementById("fecha");
        const Periodicidad=document.getElementById("PeriodicValue");
        const numPeriodic=document.getElementById("Num_periodic");
        let numeroPeriodic=0;

        Periodicidad.addEventListener("change",(event)=>{
            if (event.target.value==='true'){
                numPeriodic.innerHTML=`<input class="controls" type="number" name="periodicidad" id="NumeroSelectionado" placeholder="Rango 1-36 meses" />`;
                
            }else{
                numPeriodic.textContent = 'Periodicidad';
            }
            
        })

        const YearDivSelect = document.getElementById("yearSelect");
        // Generar las opciones de año desde 2023 hasta 2030
        for (let year = 2023; year <= 2030; year++) {
        const optionElement = document.createElement('option');
        optionElement.value = year;
        optionElement.textContent = year;
        YearDivSelect.appendChild(optionElement);
        }

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        const MesEnIngresoPpal=document.getElementById('Mes_ingreso');
        const MesEnGastoPpal=document.getElementById('Mes_Gasto');

        let cont=0;        
        const calendarContainer = document.getElementById('gpCalendar');
        
        const mesEnString = {
            0: 'Enero',1: 'Febrero', 2: 'Marzo', 3: 'Abril', 4: 'Mayo', 5: 'Junio', 6: 'Julio', 7: 'Agosto', 8: 'Septiembre', 9: 'Octubre', 10: 'Noviembre', 11: 'Diciembre'
        };
        MesEnIngresoPpal.textContent = currentDate.getDate()+"  "+mesEnString[currentMonth];
        MesEnGastoPpal.textContent = mesEnString[currentMonth];

        function createMonth(mes,year){
            
            const calendar = document.createElement('div');
            calendar.className = 'calendar';

            const mesContainer = document.createElement('div');
            mesContainer.className = 'mesContainer';
            mesContainer.textContent = mesEnString[mes];

            const currentDay = currentDate.getDate();//DIA 

            // Añadir el nombre del mes antes del calendario
            calendarContainer.appendChild(mesContainer);
            
            // -------- DIAS DE LA SEMANA
            if (cont<1){
            const daysOfWeek = ['L', 'M', 'Mx', 'J', 'V', 'S', 'D'];
                for (let i = 0; i < 7; i++) {
                    const header = document.createElement('div');
                    header.className = 'header';
                    header.textContent = daysOfWeek[i];
                    calendar.appendChild(header);
                } 
            cont++;
            }            

            // Obtener el primer día de la semana del mes actual
            const firstDayOfMonth = new Date(year, mes, 0).getDay();
            
            const daysInMonth = new Date(year, mes + 1, 0).getDate();

            // Generar los días del mes actual
            for (let i = 0; i < firstDayOfMonth + daysInMonth; i++) {
            const day = document.createElement('div');
            day.className = 'day';
            
            // Calcular el número de día
            const dayNumber = i - firstDayOfMonth + 1; // Ajustar el número del día para iniciar en 2
            if (i >= firstDayOfMonth) {
                day.textContent = dayNumber;
            }
            
            calendar.appendChild(day);

            const daycondo2cifras = dayNumber.toString().padStart(2, '0');
            const mesdosCifras = ((parseInt(mes))+1).toString().padStart(2, '0');
            let Daterecorrida=year+"-"+mesdosCifras+"-"+daycondo2cifras;
            const lanzarNewRegCalendario=document.querySelector(".Nuevo_reg_calendar");
            //si calendario esta ya mostrandose no enviar otro

            const EliminoVariables=()=>{

                Periodic.value="false";
                CategorySelectValue.value="Gas"
                seleccionDescription.value='';
                selectionCant.value=''; 
                lanzarNewRegCalendario.style.display="none"; 
                numPeriodic.textContent = 'Periodicidad';

            }

            day.addEventListener("click",(e)=>{
                
                fechaCaalendar.textContent = Daterecorrida;

                lanzarNewRegCalendario.style.display="flex";  
                buscarElementosFecha(Daterecorrida);              
            
            })
      
                
            document.addEventListener('mousedown', function(event) {
                // Verificar si el objetivo del evento no está dentro del div superpuesto
                
                if (!lanzarNewRegCalendario.contains(event.target) && lanzarNewRegCalendario.style.display==="flex") {       
                         
                        EliminoVariables();
                                                  
                }
                
            }); 

            seleccierre.addEventListener('click',()=>{
                EliminoVariables();
            });

            //alert(`has pulsado el dia ${dayNumber} del mes ${mes}:${mesEnString[mes]}  del año ${year}`)
            selecciono_Ok.addEventListener("click",()=>{

                if(Periodic.value=="true"){
                    numeroPeriodic=document.getElementById("NumeroSelectionado").value;
                }
                    //------------------------VALIDACION DE LOS DATOS INTRODUCIDOS
                const textFilter = seleccionDescription.value.replace(/[^a-zA-Z0-9_-ñ\s]/g, '');
                if(fechaCaalendar.textContent===Daterecorrida){
                    if( selectionCant.value=="" || textFilter=="" || textFilter.length>50 || numeroPeriodic>24){

                        const mensajeError=document.getElementById("msg_error4");

                        if(textFilter.length>50){
                            mensajeError.textContent="Descripcion requiere menos de 50 letras."
                            mensajeError.style.display="flex";
                            setTimeout(()=>{
                                mensajeError.style.display="none";
                            },2000);
                            
                        }else{

                            if (numeroPeriodic>24){
                                mensajeError.textContent="Valor periodicidad entre 1 y 36 meses."
                                mensajeError.style.display="flex";
                                setTimeout(()=>{
                                    mensajeError.style.display="none";
                                },2000);
                            }else{                            
                            mensajeError.textContent="Introduzca valores."
                            mensajeError.style.display="flex";
                            setTimeout(()=>{
                                mensajeError.style.display="none";
                            },
                            2000);
                            }
                        }

                    }else{

                        // -------------------------BLOQUE DE INSERCION DE REGISTROS------------

                        const packDatosCalendario={
                        cantidad: parseFloat(selectionCant.value),
                        categoria:"Calendar Element",
                        descripcion:textFilter,
                        dia_fecha:Daterecorrida,                       
                        tipo:CategorySelectValue.value,
                        periodicidad:Periodic.value,
                        numPeriodicidad:numeroPeriodic
                        }
                        if(CategorySelectValue.value=="ing"){
                            reg_ing.push(packDatosCalendario);

                        }else if(CategorySelectValue.value=="gas"){

                            reg_gastos.push(packDatosCalendario);

                        }
                        
                        const promesaNuevoRegistro = () => {
                            return new Promise((resolve, reject) => {
                              nuevo_Registro(packDatosCalendario);
                              resolve();
                            });
                        };

                        promesaNuevoRegistro().then(()=>{
                            setTimeout(() => {
                                location.reload();
                                }, 2000);
                            
                        }) 
                        
                    }
                }
            })        

                if (dayNumber === currentDay && mes == currentMonth && year == currentYear) {
                    day.classList.add('current-day'); 
                   
                } 

                //-------------------------BUSCA EL DIA DEL INGRSEO Y LO MARCA EN EL CALENDARIO
                if(Bcr_Fecha(fechaIng,Daterecorrida)){
                    day.classList.add('ingress-day'); 
                    
                }
                if(Bcr_Fecha(fechaGas,Daterecorrida)){
                    day.classList.add('gast-day'); 
                    
                } 

            }            

                calendarContainer.appendChild(calendar);

        }
                // ---------lanzarlo al principio--------
        for (let i=0;i<12;i++){
            createMonth(i,YearDivSelect.value);
        } 

        //--------------- estar a la escucha del evento change del select
        YearDivSelect.addEventListener("change", function() {

            var selectedYearValue = YearDivSelect.value;

            while (calendarContainer.firstChild) {
                calendarContainer.firstChild.remove();
            }
            cont=0;
        
            for (let i=0;i<12;i++){
                createMonth(i,selectedYearValue);
            }
    
        });
    }

    function nuevo_Registro(PackDeDatos){
    var CurrentDate = new Date();
    const ImgyUser =`${localStorage.getItem("userSeleccionado")}:${localStorage.getItem("imgSeleccionado")}`;
    const datos={
    ...PackDeDatos,
    id:localStorage.getItem("Id"),
    user_img:ImgyUser,
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    
    fetch('/inserto_reg',requestOptions)
    .then(response => response.json())
    .then(data =>{

        const mensaje = document.getElementById('mensaje');
        mensaje.style.display = 'block';
        
        mensaje.textContent=`Registro insertado`;
        setTimeout(() => {
        mensaje.style.display = 'none';
        }, 2000);

    })
    .catch(error => console.log(error))

        if(datos.tipo=='ing'){

            actualizaLiquido(datos.cantidad,"add")

        }else if(datos.tipo=='gas' ){

            actualizaLiquido(datos.cantidad,"del")
        }
    }
    
    //nuevo_Registro()
    const lanzarBorradoReg=(id_reg,cant,tipoOpe,description)=>{

        const selecValorActualGAS=document.getElementById("TotGas");
        const selecValorActualING=document.getElementById("TotIng");

        const totGas=parseFloat(selecValorActualGAS.textContent);
        const totIng=parseFloat(selecValorActualING.textContent);

        const cantNumber=parseFloat(cant);
        if(tipoOpe){
            selecValorActualING.textContent=(totIng-cantNumber).toFixed(2);
        }else if(!tipoOpe){
            selecValorActualGAS.textContent=(totGas-cantNumber).toFixed(2);
        }
        
        const datosDeId = { 
            id:id_reg,
            descript:description ,
            id_user:id,
            cant:cant 
        };
        const EnvioId = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosDeId)
        };
        fetch('/Borrar', EnvioId)
        .then(response => response.json())
        .then(data => {
            
            if(tipoOpe==1){

                actualizaLiquido(cant,"del");
    
            }else if(tipoOpe==0 ){
                
                actualizaLiquido(cant,"add");
            }
        })

    }
    const ActualizarReg=(id_reg)=>{
        alert(`Funcion no disponible, eliminala y vuelve a crearla.`);

    }

    const buscarElementosFecha=(fecha)=>{
       
        if(arrayFinal.length==0){
            arrayFinal=[...reg_gastos,...reg_ing];
        }
        
        const manejoRegistroDiaDiv = document.getElementById('ManejoRegistroDia');
   
        while (manejoRegistroDiaDiv.firstChild) {
        manejoRegistroDiaDiv.removeChild(manejoRegistroDiaDiv.firstChild);
        }

        for (let i = 0; i < arrayFinal.length; i++) {
                   
          if(arrayFinal[i].dia_fecha==fecha){

            const divArticulo = document.createElement('div');
            divArticulo.classList.add('articulo');

            const descripcionP = document.createElement('p');
            descripcionP.textContent = arrayFinal[i].descripcion;

            const tipoOP = document.createElement('p');

            if (arrayFinal[i].tipo_operacion=='gas'){
                
                tipoOP.textContent = "Gasto";
            }else if(arrayFinal[i].tipo_operacion=='ing'){
                
                tipoOP.textContent = "Ingreso";
            }
            else{
                
                tipoOP.textContent = "";

            }           

            const precioSpan = document.createElement('span');
            precioSpan.textContent = (arrayFinal[i].cantidad).toFixed(2)+"€";
            
            const eliminarButton = document.createElement('button');
            eliminarButton.textContent = 'Eliminar';

            eliminarButton.addEventListener('click', () => {
            
                divArticulo.remove();

                lanzarBorradoReg(arrayFinal[i].id, 0, arrayFinal[i].tipo_operacion);
                arrayFinal.splice(i, 1);

            });

            divArticulo.appendChild(tipoOP);
            divArticulo.appendChild(descripcionP);
            
            divArticulo.appendChild(precioSpan);
            divArticulo.appendChild(eliminarButton);
        
            manejoRegistroDiaDiv.appendChild(divArticulo);  
          }

        }

    }

    const insertNewImg=(id, usuario,imagen, op)=>{


        const datos={
            id:id,
            imgen:imagen,
            user:usuario,
            tipo_op:op
        }
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        };
        
        fetch('/actualizoImg',requestOptions)
        .then(response => response.json())
        .then(data =>{
            
            if(data.validacion=='true'){

                const mensaje = document.getElementById('mensaje');
                mensaje.style.display = 'block';
                mensaje.textContent=`Imagen Seleccionada`;

                setTimeout(() => {
                mensaje.style.display = 'none';
                location.reload();
                }, 2000);
                

                const usuModified=localStorage.getItem('userSeleccionado')+':'+localStorage.getItem('imgSeleccionado');
                if(data.tOperacion=='update'){

                    localStorage.setItem("user", usuModified);

                }else if (data.tOperacion=='add'){
                    const antiguoValor=localStorage.getItem('user');
                    const nuevoValor = `${antiguoValor}, ${data.user}:${data.imagen}`;
                    localStorage.setItem("user", '');
                    localStorage.setItem("user", nuevoValor);
                }
                
                spaceImg.innerHTML = "";
                const selectionspaceImg = document.getElementById('spaceImg');
                selectionspaceImg.insertAdjacentHTML('beforeend', `<img src="./assets/img/clients/${localStorage.getItem('imgSeleccionado')}" alt="user">`); 
            }else{
                const mensaje = document.getElementById('mensaje');
                mensaje.style.display = 'block';
                mensaje.textContent=`Ha ocurrrido un error`;

                setTimeout(() => {
                mensaje.style.display = 'none';
                location.reload();
                }, 2000);
            }

            
        })
        .catch(error => console.log(error));

        
    }
   
    const cerrarSesion=()=>{


        localStorage.clear();
        
           location.reload(); 
        
        

    }

    const actualizaLiquido=(valor, tipo)=>{

        if(tipo=='add'){
            let resultado=CtotalLiquido+parseFloat(valor);
            CtotalLiquido=resultado;
            LiquidoTotalPerfil.value=resultado.toFixed(2);
        }else if(tipo=='del') {
            let resultado=CtotalLiquido-parseFloat(valor);
            CtotalLiquido=resultado;
            LiquidoTotalPerfil.value=resultado.toFixed(2);
        }else if(tipo=='update'){
            LiquidoTotalPerfil.value, CtotalLiquido=(parseFloat(valor)).toFixed(2);
            
        }

        const datos={
            id:id,
            cantTotal:CtotalLiquido,
            tipo:tipo
        }
        const EnvioId = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        };
        fetch('/valorTotal', EnvioId)
        .then(response => response.json())
        .then(data => {
            if (data==true){
                
                localStorage.setItem("CTotal",CtotalLiquido);
                
            }
            
        })
    }

}else{
    window.location.href = "login.html";
}

 

//empezar a configurar el validado de usuario por correo 




//BOTON PARA IR ATRAS EN LA SELECCION DE IMAGEN

//Un formulario de Contacto
//crear la politica de noseq









