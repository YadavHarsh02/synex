import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const { data, error } = await resend.emails.send({
            from: "Synex <onboarding@agents.unzap.xyz>",
            to: [email],
            subject: "Message from Synex",
            html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Hello!</h2>
          <p>This is from Synex.</p>
        </div>
      `,
        });

        if (error) {
            return res.status(400).json({
                success: false,
                error,
            });
        }

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
        });
    }
};

export { sendEmail };
