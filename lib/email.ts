/**
 * Send booking/report PDFs to the configured email.
 * Used when a new booking (PDF-style report) is submitted.
 */

const BOOKING_REPORT_EMAIL = 'joeyhendrickson@me.com';

export interface SendPdfOptions {
  to?: string;
  subject: string;
  filename: string;
  pdfBuffer: Buffer;
}

/**
 * Sends a PDF attachment by email. Uses Resend when RESEND_API_KEY is set.
 * All new booking PDF reports are sent to joeyhendrickson@me.com.
 */
export async function sendBookingReportPdf(options: SendPdfOptions): Promise<boolean> {
  const { subject, filename, pdfBuffer } = options;
  const to = options.to ?? BOOKING_REPORT_EMAIL;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set; skipping email send for booking report.');
    return false;
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    const from = process.env.EMAIL_FROM ?? 'Travel Santa Marta <onboarding@resend.dev>';

    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      attachments: [
        {
          filename,
          content: pdfBuffer,
        },
      ],
      html: `<p>Please find your booking report attached.</p><p><strong>${filename}</strong></p>`,
    });

    if (error) {
      console.error('Failed to send booking report email:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error sending booking report email:', err);
    return false;
  }
}
