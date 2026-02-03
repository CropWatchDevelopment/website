import { PRIVATE_EMAIL_HOST, PRIVATE_EMAIL_PASSWORD, PRIVATE_EMAIL_PORT, PRIVATE_EMAIL_USERNAME, PRIVATE_GOOGLE_RECAPTCHA_SECRET_KEY } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import type { Actions } from './$types';

const CONTACT_RECIPIENTS = {
    to: 'sayaka@cropwatch.io',
    cc: 'kevin@cropwatch.io'
};

const RECAPTCHA_ACTION = 'contact_form';
const RECAPTCHA_MIN_SCORE = 0.5;

export const actions: Actions = {
    default: async ({ request, getClientAddress }) => {
        const formData = await request.formData();

        if (!PRIVATE_GOOGLE_RECAPTCHA_SECRET_KEY) {
            return fail(500, { message: 'reCAPTCHA configuration missing.' });
        }

        const recaptchaToken = formData.get('g-recaptcha-response');
        if (typeof recaptchaToken !== 'string' || recaptchaToken.length === 0) {
            return fail(400, { message: 'Missing reCAPTCHA token.' });
        }

        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const company = formData.get('company');
        const message = formData.get('message');

        if (
            typeof firstName !== 'string' ||
            typeof lastName !== 'string' ||
            typeof email !== 'string' ||
            typeof company !== 'string' ||
            typeof message !== 'string'
        ) {
            return fail(400, { message: 'Invalid form submission.' });
        }

        const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
        const params = new URLSearchParams();
        params.append('secret', PRIVATE_GOOGLE_RECAPTCHA_SECRET_KEY);
        params.append('response', recaptchaToken);
        const remoteIp = getClientAddress();
        if (remoteIp) {
            params.append('remoteip', remoteIp);
        }

        try {
            const recaptchaResponse = await fetch(verificationUrl, {
                method: 'POST',
                body: params
            });

            if (!recaptchaResponse.ok) {
                return fail(502, { message: 'Unable to verify reCAPTCHA at this time.' });
            }

            const recaptchaResult: {
                success: boolean;
                score?: number;
                action?: string;
                ['error-codes']?: string[];
            } = await recaptchaResponse.json();

            const isScoreAcceptable = (recaptchaResult.score ?? 0) >= RECAPTCHA_MIN_SCORE;
            const actionMatches = recaptchaResult.action === RECAPTCHA_ACTION;
            if (!recaptchaResult.success || !isScoreAcceptable || !actionMatches) {
                return fail(400, { message: 'reCAPTCHA verification failed.' });
            }
        } catch (error) {
            return fail(502, { message: 'Unable to verify reCAPTCHA at this time.' });
        }

        const transporter = nodemailer.createTransport({
            host: PRIVATE_EMAIL_HOST,
            port: Number(PRIVATE_EMAIL_PORT),
            secure: Number(PRIVATE_EMAIL_PORT) === 465,
            auth: {
                user: PRIVATE_EMAIL_USERNAME,
                pass: PRIVATE_EMAIL_PASSWORD
            }
        });

        const fullName = `${firstName} ${lastName}`.trim();

        try {
            await transporter.sendMail({
                from: `"${fullName || 'CropWatch Contact'}" <admin@cropwatch.io>`,
                replyTo: email,
                to: CONTACT_RECIPIENTS.to,
                cc: CONTACT_RECIPIENTS.cc,
                subject: '📧❗ Message sent from CropWatch.io Website!',
                text: [
                    `Sender name: ${fullName || 'Not provided'}`,
                    `Sender email: ${email}`,
                    `Company: ${company}`,
                    '--- Message ---',
                    message
                ].join('\n')
            });
        } catch (err) {
            console.error('Email sending error');
            return fail(500, { message: 'Failed to send email.' });
        }

        return { success: true };
    }
};
