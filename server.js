import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

app.post('/api/send-email', async (req, res) => {
    const { recipient, subject, html } = req.body;

    if (!recipient || !html) {
        return res.status(400).json({ error: 'Missing recipient or HTML content' });
    }

    try {
        const info = await transporter.sendMail({
            from: `"PayPal" <${process.env.SMTP_USER}>`,
            to: recipient,
            subject: subject || 'Your payment\'s waiting',
            html: html,
        });

        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Email server running at http://localhost:${port}`);
});
