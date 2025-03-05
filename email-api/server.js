require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fetch = require('node-fetch'); // Add this to make the HTTP request for reCAPTCHA verification

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Define the root route to respond to GET requests
app.get("/", (req, res) => {
    res.send("Email API is running!");
});

// Email Sending Route
app.post('/send-email', async (req, res) => {
    const { name, email, message, captchaResponse } = req.body;

    if (!name || !email || !message || !captchaResponse) {
        return res.status(400).json({ error: 'All fields and reCAPTCHA are required' });
    }

    // Step 1: Verify reCAPTCHA
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaResponse}`;

    try {
        const recaptchaVerifyResponse = await fetch(recaptchaVerifyUrl, { method: 'POST' });
        const recaptchaResult = await recaptchaVerifyResponse.json();

        if (!recaptchaResult.success) {
            return res.status(400).json({ error: 'reCAPTCHA verification failed' });
        }

        // Step 2: Send Email using Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
