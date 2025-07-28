import nodemailer from "nodemailer";

// Create a test transporter using Ethereal email
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "jonathan.kuphal@ethereal.email",
    pass: "vp7FF3kpemDFQyYy5r",
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log("Transporter error:", error);
  } else {
    console.log("✅ Server is ready to take our messages");
  }
});

// Send mail using an async function
const sendTestEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: '"Jonathan Kuphal" <jonathan.kuphal@ethereal.email>',
      to: "puritychelangat18@gmail.com",
      subject: "Hello",
      text: "Hello World",
    });

    console.log("📨 Message sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

// Call the function to send test mail
sendTestEmail();
