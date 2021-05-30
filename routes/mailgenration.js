const nodemailer = require('nodemailer')

// `Welcome to the family ${name}. Create your own home Away from your home. Let Us help you to give the best expireicne you deserve. `

function generateMail(info, name, message){
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
        auth: {
        user: 'homeawayfromhomeroooms.info@gmail.com',
        pass: 'Ashish@123'
        }
    });

    let mailOptions = {
        from: 'homeawayfromhomeroooms.info@gmail.com',
        to: info,
        subject: 'Home-away From Home',
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });

}


module.exports.generateMail = generateMail