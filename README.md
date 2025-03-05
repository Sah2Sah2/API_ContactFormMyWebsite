# Email API for Contact Form

This is a simple Express.js-based API designed to send emails via a contact form submission on my website/portfolio. 
The API uses Nodemailer to send emails and is configured with CORS and dotenv to handle cross-origin requests and environment variables securely

## Features

- Handle **POST** requests to send emails from the contact form
- Validate input fields (name, email, and message) to ensure all fields are filled
- Send emails using **Gmail** as the SMTP service (configured via environment variables)
- Respond with success or error messages based on the outcome of the email sending process
- **reCAPTCHA** verification to protect the contact form from spam and bots
- **Rate Limiting** to limit the number of requests per user and prevent abuse

## Requirements

- **Node.js** 
- **Nodemailer**: For email sending
- **dotenv**: For environment variables
- **CORS**: To handle cross-origin requests
- **express-rate-limit**: To implement rate limiting
- **node-fetch**: To make the HTTP request for reCAPTCHA verification

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Sah2Sah2/API_ContactFormMyWebsite.git
    ```

2. Navigate to the project directory:

    ```bash
    cd email-api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file at the root of the project to store your Gmail credentials:

    ```bash
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-email-password
    RECAPTCHA_SECRET=your-recaptcha-secret
    ```

> **Note**: For security, consider using an app-specific password for Gmail rather than your actual Gmail password

5. Run the server:

    ```bash
    npm start
    ```

    This will start the server on port `5000` (or any port defined in your environment)

## API Endpoints

### 1. **GET /**

Returns a simple message indicating the API is running

#### Example Request:

```http
GET http://localhost:5000/
```

#### Example Response:

```json
{
  "message": "Email API is running!"
}
```

---

### 2. **POST /send-email**

Handles contact form submissions and sends an email

#### Request Body:

```json
{
  "name": "Your Name",
  "email": "your-email@example.com",
  "message": "Hello, I would like to get in touch.",
  "captchaResponse": "recaptcha-response-token"
}
```

#### Example Request:

```http
POST http://localhost:5000/send-email
Content-Type: application/json


```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "message": "Hi, I’m interested in your profile. Please get back to me.",
  "captchaResponse": "recaptcha-response-token"
}


#### Example Response (Success):

```json
{
  "success": "Email sent successfully!"
}
```

#### Example Response (Error):

```json
{
  "error": "Failed to send email"
}
```

---

## Deployment

### 1. **Render Deployment**

1. Create an account on [Render](https://render.com) - free version available
2. Create a new web service and link it to your GitHub repository
3. Set environment variables (e.g., `EMAIL_USER` `EMAIL_PASS` and `RECAPTCHA_SECRET`) in the Render dashboard
4. Deploy the service, and your API will be available at a URL like `https://your-api-name.onrender.com/`

### 2. **Frontend Integration**

- Make sure your frontend points to the correct backend URL when sending POST requests
- Example: `https://your-api-name.onrender.com/send-email`

### 3. **Security**

-**Rate Limiting**: To prevent abuse, the `/send-email` route is rate-limited to 2 requests per IP every 30 minutes
-**reCAPTCHA**: To protect the form from bots, the API requires a valid reCAPTCHA response. Obtain your reCAPTCHA secret key from Google reCAPTCHA.

---

## Troubleshooting

If the email sending fails, check the following:
- Ensure your Gmail credentials are correct and that you have enabled access for less secure apps if you're using Gmail's SMTP service
- If you're using a service like Render, make sure the environment variables (`EMAIL_USER`, `EMAIL_PASS` and `RECAPTCHA_SECRET`) are correctly set in the Render dashboard

## Setting Up Gmail for Sending Emails

Before you can use Gmail to send emails via this API, you need to set up your Gmail account to allow access to the service

### Step-by-Step Setup:

1. **Enable Two-Factor Authentication (2FA) for Better Security:**
   - It is highly recommended to enable **2FA** (two-factor authentication) for your Gmail account to enhance security
   - If you have 2FA enabled, you will need to create an **app-specific password** for use with the API. Follow the next step to generate one

2. **Use App-Specific Passwords (Recommended for 2FA users):**
   - If you have **2-step verification** enabled on your Gmail account, you will need to generate an app-specific password to use with the API
   - To generate an app-specific password:
     1. Go to [Google Account Settings](https://myaccount.google.com/)
     2. Under **Security**, find the **App passwords** section
     3. Choose **Mail** as the app and **Windows Computer** (or any device you're using)
     4. Google will generate a 16-character password. Copy this password
   
3. **Enable Less Secure Apps (If You Don't Have 2FA Enabled):**
   - If you do not have 2FA enabled, Gmail's security settings may block access to the SMTP service unless you allow "Less Secure Apps." You can enable this by:
     - Go to [Less Secure Apps](https://myaccount.google.com/lesssecureapps)
     - Turn on access for less secure apps
   > **Note**: It's highly recommended to enable 2FA to increase the security of your account. Using a regular password and allowing less secure apps makes your Gmail account more vulnerable
   
4. **Update `.env` with your Gmail Credentials:**
   - In your `.env` file, use the generated password (for 2FA) or your regular password if you're not using 2FA

    ```bash
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-specific-password
    ```

5. **Ensure IMAP is Enabled (for Gmail):**
   - In Gmail, go to **Settings** > **Forwarding and POP/IMAP**
   - Make sure **IMAP** is enabled, as it is required for sending emails through the SMTP server

### Security Considerations:
- If you're using your regular Gmail password (not recommended), make sure that you are aware of the security risks involved
- Using app-specific passwords is safer and preferred when 2FA is enabled

---

## License

This project is licensed under the MIT License 
Copyright (c) [2025] [Sara Battistella]

## Author

- [Sara Battistella](https://github.com/Sah2Sah2)


