export function mandarEmail(correo,usuario){

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

}