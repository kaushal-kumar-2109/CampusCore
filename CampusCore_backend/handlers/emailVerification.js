const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
 
const sendOtpMail = async (email, otp) => {
  try {
     const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    console.log("Verifying transporter...");

    await transporter.verify();

    console.log("Transporter verified");

    const mailOptions = {
      from: `"CampusCore" <${process.env.EMAIL }>`,
      to: email,
      subject: "CampusCore Email Verification OTP",
      html: `
        <div style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,sans-serif;">

          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="padding:40px 20px;">

                <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0"
                  style="background:#ffffff;border-radius:18px;overflow:hidden;
                  box-shadow:0 8px 30px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td
                      style="
                        background:linear-gradient(135deg,#4F46E5,#7C3AED);
                        padding:40px 30px;
                        text-align:center;
                      "
                    >
                      <h1 style="color:#ffffff;margin:0;font-size:30px;">
                        CampusCore
                      </h1>

                      <p style="color:#e0e7ff;margin-top:10px;font-size:15px;">
                        Smart Campus Management System
                      </p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px 30px;">

                      <h2 style="margin:0;color:#0F172A;font-size:24px;">
                        Verify Your Email
                      </h2>

                      <p
                        style="
                          color:#475569;
                          font-size:16px;
                          line-height:28px;
                          margin-top:18px;
                        "
                      >
                        Hello,
                      </p>

                      <p
                        style="
                          color:#475569;
                          font-size:16px;
                          line-height:28px;
                        "
                      >
                        Thank you for signing in to CampusCore.
                        Please use the verification code below
                        to complete your authentication process.
                      </p>

                      <!-- OTP Box -->
                      <div
                        style="
                          margin:35px 0;
                          text-align:center;
                        "
                      >
                        <div
                          style="
                            display:inline-block;
                            background:#EEF2FF;
                            border:2px dashed #4F46E5;
                            border-radius:16px;
                            padding:20px 40px;
                          "
                        >
                          <span
                            style="
                              font-size:38px;
                              letter-spacing:10px;
                              font-weight:800;
                              color:#4F46E5;
                            "
                          >
                            ${otp}
                          </span>
                        </div>
                      </div>

                      <p
                        style="
                          color:#64748B;
                          font-size:15px;
                          line-height:26px;
                        "
                      >
                        This OTP will expire in
                        <strong>5 minutes</strong>.
                      </p>

                      <p
                        style="
                          color:#64748B;
                          font-size:15px;
                          line-height:26px;
                        "
                      >
                        If you did not request this verification,
                        please ignore this email.
                      </p>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td
                      style="
                        background:#F8FAFC;
                        padding:25px 30px;
                        text-align:center;
                      "
                    >
                      <p
                        style="
                          margin:0;
                          color:#94A3B8;
                          font-size:13px;
                          line-height:22px;
                        "
                      >
                        © 2026 CampusCore. All rights reserved.
                      </p>

                      <p
                        style="
                          margin-top:8px;
                          color:#94A3B8;
                          font-size:13px;
                        "
                      >
                        Secure • Reliable • Smart Campus Platform
                      </p>
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>

        </div>
        `,
    };

    const res = await transporter.sendMail(mailOptions);
    return ({
      status: 200,
      message: "OTP sent successfully",
      res:res
    });
  } catch (error) {
    return ({
      status: 500,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

module.exports = {sendOtpMail};