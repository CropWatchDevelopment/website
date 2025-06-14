import { defineConfig } from '@playwright/test';

export default defineConfig({
        webServer: {
                command: 'PUBLIC_RECAPTCHA_SITE_KEY=test PRIVATE_GOOGLE_RECAPTCHA_SECRET_KEY=test PRIVATE_EMAIL_HOST=localhost PRIVATE_EMAIL_PORT=1025 PRIVATE_EMAIL_USERNAME=user PRIVATE_EMAIL_PASSWORD=pass npm run build && npm run preview',
                port: 4173
        },

        testDir: 'e2e'
});
