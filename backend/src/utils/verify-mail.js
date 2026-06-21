import { BREVO_API_KEY, MAIL_FROM, BACKEND_URL } from "../config/config.js";
import { getVerifyMailTemplate, getOtpTemplate } from "./email-templates.js";
import apiInstance from "./brevo-client.js";

const verifyMail = async (token, email) => {
  // The verify link hits your backend, which sets verified = true, then redirects to login
  const verifyLink = `${BACKEND_URL}/api/auth/verify-email?token=${token}`;
  const htmlTemplate = getVerifyMailTemplate(verifyLink);

  const sendSmtpEmail = {
    sender: { name: "Note-Auth", email: MAIL_FROM },
    to: [{ email }],
    subject: "✦ Verify Your Email — Action Required",
    htmlContent: htmlTemplate,
    // Plain-text fallback for email clients that don't render HTML
    textContent: `Hi! Please verify your email by visiting this link (expires in 10 minutes):\n\n${verifyLink}\n\nIf you didn't sign up, ignore this email.`,
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Verification email sent successfully via Brevo");
  } catch (err) {
    console.error("Brevo send error:", err.response?.body || err.message);
  }
};

const sendOtp = async (email, otp) => {

  const sendSmtpEmail = {
    sender: { name: "Note-Auth", email: MAIL_FROM },
    to: [{ email }],
    subject: "🔐 Your Password Reset OTP",
    htmlContent: getOtpTemplate(otp),
    textContent: `Your OTP is: ${otp}. It expires in 10 minutes.`,
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("OTP verification email sent successfully via Brevo");
  } catch (err) {
    console.error("Brevo send error:", err.response?.body || err.message);
  }

};

export { verifyMail, sendOtp };
