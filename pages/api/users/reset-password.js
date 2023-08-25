import nodemailer from "nodemailer";
import crypto from "crypto";

export default async function handler(req, res) {
  // Send an email with the password reset link to the user's email address
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { method } = req;
  const email = req.body;

  if (method === "POST") {
    // Generate a unique token
    const token = crypto.randomBytes(20).toString("hex");

    const resetLink = `${req.headers.origin}:${process.env.PORT}/login/verify?token=${token}`;
    const message = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f3f3f3;
                margin: 0;
                padding: 0;
              }
              
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              
              .logo {
                text-align: center;
                margin-bottom: 20px;
              }
              
              .logo img {
                max-width: 200px;
              }
              
              .message {
                color: #333333;
              }
              
              .button {
                display: inline-block;
                background-color: #4caf50;
                color: #ffffff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <p class="message">Please click the button below to reset your password.</p>
              <div class="button-container" style="text-align: center;">
                <a class="button" href="${resetLink}">Reset Password</a>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(message);
      res.status(200).json({ token, message: "Email sent" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to send email" });
    }
  }
}
