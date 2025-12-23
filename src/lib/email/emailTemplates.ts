
interface BaseEmailTemplateProps {
  title: string;
  preheader?: string;
  content: string;
  ctaButton?: {
    text: string;
    url: string;
  };
}

export function BaseEmailTemplate({ title, preheader, content, ctaButton }: BaseEmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${preheader ? `<meta name="description" content="${preheader}">` : ''}
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
    .logo { max-width: 150px; height: auto; }
    .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
    .content h1 { color: #667eea; font-size: 24px; margin-bottom: 20px; }
    .content p { font-size: 16px; margin-bottom: 15px; }
    .cta-button { display: inline-block; padding: 15px 30px; background-color: #667eea; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .cta-button:hover { background-color: #5568d3; }
    .footer { background-color: #f8f9fa; padding: 30px; text-align: center; color: #666666; font-size: 14px; }
    .social-icons { margin: 20px 0; }
    .social-icons a { display: inline-block; margin: 0 10px; }
    .social-icons img { width: 32px; height: 32px; }
    .divider { height: 1px; background-color: #e0e0e0; margin: 30px 0; }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header with Logo -->
    <div class="header">
      <img src="${process.env.NEXT_PUBLIC_APP_URL}/assets/rpflogo.png" alt="CHH Europe Logo" class="logo">
    </div>

    <!-- Main Content -->
    <div class="content">
      <h1>${title}</h1>
      ${content}
      ${ctaButton ? `
        <div style="text-align: center;">
          <a href="${ctaButton.url}" class="cta-button">${ctaButton.text}</a>
        </div>
      ` : ''
    }
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="divider"></div>

      <!-- Social Icons -->
      <div class="social-icons">
        <a href="https://facebook.com/chheurope"><img src="https://img.icons8.com/color/48/facebook.png" alt="Facebook"></a>
        <a href="https://twitter.com/chheurope"><img src="https://img.icons8.com/color/48/twitter.png" alt="Twitter"></a>
        <a href="https://instagram.com/chheurope"><img src="https://img.icons8.com/color/48/instagram-new.png" alt="Instagram"></a>
        <a href="https://youtube.com/@chheurope"><img src="https://img.icons8.com/color/48/youtube-play.png" alt="YouTube"></a>
      </div>

      <p style="margin: 10px 0;">Christ Healing Home Europe</p>
      <p style="margin: 5px 0;">Where Worship Meets Community</p>
      <p style="margin: 15px 0; font-size: 12px; color: #999999;">
        You received this email because you are part of the CHH Europe community.<br>
        If you have any questions, please contact us at <a href="mailto:info@chheurope.com" style="color: #667eea;">info@chheurope.com</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Specific email templates
export function welcomeUserEmail(name: string, resetLink: string): string {
  return BaseEmailTemplate({
    title: 'Welcome to CHH Europe Admin',
    preheader: 'Set up your account password',
    content: `
      <p>Hello ${name},</p>
      <p>Welcome to the CHH Europe admin panel! Your account has been created successfully.</p>
      <p>To get started, please set up your password by clicking the button below:</p>
    `,
    ctaButton: {
      text: 'Set Up Password',
      url: resetLink,
    },
  });
}

export function passwordResetEmail(name: string, resetLink: string): string {
  return BaseEmailTemplate({
    title: 'Reset Your Password',
    preheader: 'Click to reset your password',
    content: `
      <p>Hello ${name},</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      <p style="color: #666; font-size: 14px;">This link will expire in 1 hour for security reasons.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
    ctaButton: {
      text: 'Reset Password',
      url: resetLink,
    },
  });
}

export function formSubmissionEmail(formType: string, data: any): string {
  const formattedData = Object.entries(data)
    .map(([key, value]) => `<tr><td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">${key}</td><td style="padding: 10px; border: 1px solid #e0e0e0;">${value}</td></tr>`)
    .join('');

  return BaseEmailTemplate({
    title: 'New Form Submission Received',
    preheader: `New ${formType} submission`,
    content: `
      <p>You have received a new form submission.</p>
      <p><strong>Form Type:</strong> ${formType}</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr>
            <th style="padding: 10px; border: 1px solid #e0e0e0; background-color: #f8f9fa;">Field</th>
            <th style="padding: 10px; border: 1px solid #e0e0e0; background-color: #f8f9fa;">Value</th>
          </tr>
        </thead>
        <tbody>
          ${formattedData}
        </tbody>
      </table>
      <p>Please review and follow up as needed.</p>
    `,
    ctaButton: {
      text: 'View in Admin',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/submissions`,
    },
  });
}
