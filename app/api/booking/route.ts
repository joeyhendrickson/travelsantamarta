import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { sendBookingReportPdf } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      checkIn,
      checkOut,
      packageType,
      guests,
      activities,
      notes,
    } = body;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]);
    const { height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const sizeTitle = 18;
    const sizeHeading = 12;
    const sizeBody = 10;
    let y = height - 50;

    const drawText = (text: string, x: number, size: number, useBold = false) => {
      const f = useBold ? fontBold : font;
      page.drawText(text, { x, y, size, font: f, color: rgb(0, 0, 0) });
      y -= size + 4;
    };

    drawText('Santa Marta Travel Guide – Booking Request', 50, sizeTitle, true);
    y -= 8;
    drawText(`Submitted: ${new Date().toLocaleString()}`, 50, sizeBody);
    y -= 24;

    drawText('Guest details', 50, sizeHeading, true);
    drawText(`Name: ${String(name).trim()}`, 50, sizeBody);
    drawText(`Email: ${String(email).trim()}`, 50, sizeBody);
    if (guests) drawText(`Guests: ${guests}`, 50, sizeBody);
    y -= 12;

    drawText('Dates', 50, sizeHeading, true);
    if (checkIn) drawText(`Check-in: ${checkIn}`, 50, sizeBody);
    if (checkOut) drawText(`Check-out: ${checkOut}`, 50, sizeBody);
    y -= 12;

    if (packageType) {
      drawText('Package', 50, sizeHeading, true);
      const labels: Record<string, string> = {
        single: 'Single Traveler Lux Resort + Jungle + Beach Tour — $2000/week',
        couple: 'Couple Resort + Jungle + Beach Tour — $2750/week',
        family: 'Family/Group Lux Resort + Jungle + Beach Tour — $3500/week',
      };
      drawText(labels[packageType] || packageType, 50, sizeBody);
      y -= 12;
    }

    if (activities && Array.isArray(activities) && activities.length > 0) {
      drawText('Activities of interest', 50, sizeHeading, true);
      activities.forEach((item: string) => {
        if (y < 80) return;
        page.drawText(`• ${String(item).substring(0, 78)}`, { x: 50, y, size: sizeBody, font, color: rgb(0, 0, 0) });
        y -= sizeBody + 2;
      });
      y -= 8;
    }

    if (notes?.trim()) {
      drawText('Notes / special requests', 50, sizeHeading, true);
      const lines = String(notes).trim().split(/\n/).slice(0, 15);
      for (const line of lines) {
        if (y < 80) break;
        page.drawText(line.substring(0, 80), { x: 50, y, size: sizeBody, font, color: rgb(0, 0, 0) });
        y -= sizeBody + 2;
      }
      y -= 8;
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);
    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `booking-${dateStr}-${String(name).trim().replace(/\s+/g, '-').slice(0, 20)}.pdf`;

    const emailSent = await sendBookingReportPdf({
      subject: `New Santa Marta booking – ${String(name).trim()}`,
      filename,
      pdfBuffer,
    });

    if (!emailSent) {
      console.warn('Booking PDF created but email was not sent (RESEND_API_KEY may be missing).');
    }

    return NextResponse.json({
      success: true,
      message: emailSent
        ? 'Booking submitted. A PDF has been sent to joeyhendrickson@me.com.'
        : 'Booking submitted. Email delivery skipped (check RESEND_API_KEY).',
    });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Booking submission failed',
      },
      { status: 500 }
    );
  }
}
