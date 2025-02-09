import { PRIVATE_EMAIL_HOST, PRIVATE_EMAIL_PASSWORD, PRIVATE_EMAIL_PORT, PRIVATE_EMAIL_USERNAME, PRIVATE_GOOGLE_RECAPTCHA_SECRET_KEY } from '$env/static/private';
import nodemailer from 'nodemailer';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    // Extract form data
    const formData = await request.formData();
    let gRecaptchaResponse = formData.get('token');
    let name = formData.get('name');
    let email = formData.get('email');
    let subject = formData.get('subject');
    let message = formData.get('message');
    
    if (!gRecaptchaResponse) {
      return new Response(JSON.stringify({ error: 'Missing reCAPTCHA token.' }), { status: 400 });
    }

    // Verify the reCAPTCHA token with Google
    const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const params = new URLSearchParams();
    params.append('secret', PRIVATE_GOOGLE_RECAPTCHA_SECRET_KEY);
    params.append('response', gRecaptchaResponse);

    const recaptchaResponse = await fetch(verificationUrl, {
      method: 'POST',
      body: params
    });
    const recaptchaResult = await recaptchaResponse.json();

    if (!recaptchaResult.success && recaptchaResult.score < 0.5) {
      console.error('reCAPTCHA failed:', recaptchaResult);
      return new Response(JSON.stringify({ error: 'reCAPTCHA verification failed.' }));
    }

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: PRIVATE_EMAIL_HOST,
      port: PRIVATE_EMAIL_PORT,
      secure: false, // Use true for port 465 if applicable
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: PRIVATE_EMAIL_USERNAME,
        pass: PRIVATE_EMAIL_PASSWORD,
      },
    });

    // Send the email
    try {
      const info = await transporter.sendMail({
        from: `"${name}" <admin@cropwatch.io>`, // sender info from form data
        to: "kevin@cropwatch.io",      // receiver email
        subject: '📧❗ Message sent from CropWatch.io Website!',
        text: `
        sender name: ${name}
        sender email: ${email}
        sender's subject: ${subject}
        Messasge: ${message}
        `,
      });
      return { status: 200, body: JSON.stringify({ message: 'Email sent successfully!' }) };
    } catch (error) {
      console.error('Email sending error:', error);
      return new Response(JSON.stringify({ error: 'Failed to send email.' }), { status: 500 });
    }
  },
};
