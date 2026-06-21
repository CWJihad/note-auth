import userModel from "../models/user.model.js";
import { getFeedbackTemplate } from "../utils/email-templates.js";
import { MAIL_FROM, RECEIVER_EMAIL } from "../config/config.js";
import apiInstance from "../utils/brevo-client.js";

const sendFeedback = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Subject and message are required",
      });
    }

    const user = await userModel
      .findById(req.user.id)
      .select("fullName email username");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const initials = user.fullName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const html = getFeedbackTemplate(user, initials, subject, message);

    const sendSmtpEmail = {
      sender: { name: "Note-Auth", email: MAIL_FROM },
      to: [{ email: RECEIVER_EMAIL }],
      replyTo: { email: user.email, name: user.fullName }, // ← lets you hit "reply" and respond directly to the user
      subject: `[Feedback] ${subject} — from ${user.fullName}`,
      htmlContent: html,
    };

    try {
      await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log("Feedback email sent successfully via Brevo");
    } catch (err) {
      console.error("Brevo send error:", err.response?.body || err.message);
    }

    return res.status(200).json({
      success: true,
      message: "Feedback sent successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { sendFeedback };
