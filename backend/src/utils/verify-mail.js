import {
  BREVO_API_KEY,
  MAIL_FROM,
  BACKEND_URL,
} from "../config/config.js";
import { getVerifyMailTemplate, getOtpTemplate } from "./email-templates.js";
import SibApiV3Sdk from "sib-api-v3-sdk"

// config brevo client
const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = BREVO_API_KEY

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

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
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: MAIL_USER, pass: MAIL_PASS }
    })

    const configuration = {
        from: `NoteAppAuth <${MAIL_USER}>`,
        to: email,
        subject: '🔐 Your Password Reset OTP',
        html: getOtpTemplate(otp),
        text: `Your OTP is: ${otp}. It expires in 10 minutes.`
    }

    transporter.sendMail(configuration, (err, info) => {
        if (err) console.log('OTP mail error', err)
        else console.log('OTP mail sent', info)
    })
}

export { verifyMail, sendOtp};
