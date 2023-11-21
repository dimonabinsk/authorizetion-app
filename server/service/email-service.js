const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_HOST,
      port: process.env.EMAIL_SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_SMTP_USERNAME,
        pass: process.env.EMAIL_SMTP_PASSWORD,
      },
    });
  }
  async sendActivationEmail(to, link) {
    await this.transporter.sendMail({
      from: '"Приложение авторизация" <dimonabinsk@yandex.ru>',
      to,
      subject: `Активация аккаунта на сайте по адресу: ${process.env.API_URL}`,
      text: " ",
      html: `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `,
    });
  }
}

module.exports = new EmailService();
