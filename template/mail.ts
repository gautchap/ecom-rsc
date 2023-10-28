import { createTransport } from "nodemailer";

export async function sendVerificationRequest(parameters) {
    const { identifier, url, provider } = parameters;
    const { host } = new URL(url);
    const transport = createTransport(provider.server);
    const result = await transport.sendMail({
        to: identifier,
        from: provider.from,
        subject: `Sign in to ${host}`,
        text: text({ url, host }),
        html: html({ url, host }),
    });
    const failed = [...result.rejected, ...result.pending].filter(Boolean);
    if (failed.length > 0) {
        throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
    }
}

function html(parameters: { url: string; host: string }) {
    const { url } = parameters;

    return `Oh ! Here is your magic link : <a href="${url}">Link</a>`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`;
}
