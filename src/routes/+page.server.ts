import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	// Load function can be left empty if there's no specific data to load.
}

/** @type {import('./$types').Actions} */
export const actions = {
	handleContactRequestMessage: async ({ cookies, request }) => {
        const contactRequest = await request.formData();
        const message = contactRequest.get('message');
        const email = contactRequest.get('email');
        const phone = contactRequest.get('phone');

        const response = await sendMail(`RECEIVED A MESSAGE FROM Email: ${email} \n\n Phone Number: ${phone} \n\n ${message}`);

		return { success: response };
	},
};

const sendMail = async (text: string): Promise<boolean> => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        secure: false,
        port: 587,
        auth: {
            user: process.env.PRIVATE_EMAIL_USERNAME,
            pass: process.env.PRIVATE_EMAIL_PASSWORD
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false,
        },
        debug: false,
        logger: false,
    });

    const receivers: string[] = [
        'kevin@cropwatch.io',
        'sayaka@cropwatch.io',
    ];

    const mailOptions: nodemailer.SendMailOptions = {
        from: '"CropWatch" <Admin@CropWatch.io>',
        to: receivers,
        subject: 'MESSAGE FROM MAIN SITE',
        text: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email: ', error);
        return false;
    }
};
