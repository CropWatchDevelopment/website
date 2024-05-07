import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import Mail from 'nodemailer/lib/mailer';
dotenv.config();


/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	
}

/** @type {import('./$types').Actions} */
export const actions = {
	handleContactRequestMessage: async ({ cookies, request }) => {
		
        const contactRequest = await request.formData();
        const message = contactRequest.get('message');
        const email = contactRequest.get('email');
        const phone = contactRequest.get('phone');

        sendMail(`RECIEVED A MESSAGE FROM Email: ${email} \n\n Phone Number: ${phone} \n\n ${message}`);
		

		return { success: true };
	},
};



export const sendMail = async (text: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        secure: false,
        port: 587,
        auth: {
            user: process.env.PRIVATE_EMAIL_USERNAME,
            pass: process.env.PRIVATE_EMAIL_PASSWORD
        },
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },
        debug: false,
        logger: false,
    });

    const recievers: string [] = [
        'kevin@cropwatch.io',
        'sayaka@cropwatch.io',
    ]

    const mailOptions: Mail.Options = {
        from: '"CropWatch" <Admin@CropWatch.io>',
        to: recievers,
        subject: 'MESSAGE FROM MAIN SITE',
        text: text
    };
    console.log(mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}