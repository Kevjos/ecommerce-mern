// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function getMessage(email) {
  const body =
    "Bienvenid@ al ecommerce hecho con el stack MERN, en este puedes registrar tu productos, venderlos y también comprarlos.";
  return {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Email de bienvenida",
    text: body,
    html: `<strong>${body}</strong>`,
  };
}

export const sendEmail = async (email) => {
  try {
    await sgMail.send(getMessage(email));
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Error sending test email");
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};
