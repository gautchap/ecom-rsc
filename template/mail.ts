import { createTransport } from "nodemailer";

type verificationRequestParameters = {
  identifier: string;
  url: string;
  provider: {
    server: {
      host: string;
      port: number;
      auth: {
        user: string;
        pass: string;
      };
    };
    from: string;
  };
};

export async function sendVerificationRequest({
  identifier,
  url,
  provider,
}: verificationRequestParameters) {
  const { host } = new URL(url);
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: {
      name: "Ecom RSC",
      address: provider.from,
    },
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
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
