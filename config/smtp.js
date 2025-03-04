const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

async function configureHandlebars() {
  const { nodemailerExpressHandlebars } = await import(
    "nodemailer-express-handlebars"
  );

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Configure Handlebars
  const handlebarsOptions = {
    viewEngine: {
      extname: ".hbs",
      partialsDir: path.resolve("./template"),
      layoutsDir: path.resolve("./template"),
      defaultLayout: "",
    },
    viewPath: path.resolve("./template"),
    extName: ".hbs",
  };

  transporter.use("compile", nodemailerExpressHandlebars(handlebarsOptions));

  return transporter;
}

async function sendEmail(to, subject, template, context) {
  try {
    const transporter = await configureHandlebars();

    const mailOptions = {
      from: `"MyApp" <${process.env.SMTP_USER}>`,
      to,
      subject,
      template,
      context,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = sendEmail;
