import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function GET() {
  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const sizeTitle = 20;
    const sizeHeading = 14;
    const sizeBody = 11;

    const sections = [
      { title: 'Welcome to Santa Marta', body: 'Santa Marta is Colombia\'s oldest city and the gateway to the Caribbean coast, Tayrona National Park, and the Lost City trek. This guide helps you plan your trip with practical tips and recommendations.' },
      { title: 'When to Go', body: 'December to April is dry and ideal for beaches and hiking. May–November sees more rain but fewer crowds and lush landscapes. Tayrona National Park sometimes closes in February for indigenous rest.' },
      { title: 'Getting There', body: 'Simón Bolívar International Airport (SMR) serves Santa Marta. From Cartagena you can take buses or private transfers (about 4 hours).' },
      { title: 'Top Experiences', body: '• Tayrona National Park – beaches and jungle\n• Lost City (Ciudad Perdida) trek – 4–6 day hike\n• Taganga – diving and beach town\n• Minca – mountains, coffee, and waterfalls\n• Historic center and waterfront' },
      { title: 'Practical Tips', body: 'Use sunscreen and insect repellent. Book Tayrona and Lost City in advance in high season. Carry cash in smaller towns. Tap water is not always safe to drink – use bottled or filtered water.' },
    ];

    let page = pdfDoc.addPage([612, 792]);
    const { height } = page.getSize();
    let y = height - 60;

    const drawText = (p: ReturnType<typeof pdfDoc.getPages>[0], text: string, x: number, size: number, bold: boolean) => {
      const f = bold ? fontBold : font;
      p.drawText(text, { x, y, size, font: f, color: rgb(0.11, 0.42, 0.42) });
      y -= size + 4;
    };

    drawText(page, 'THE', 50, sizeBody, false);
    drawText(page, 'SANTA MARTA', 50, sizeTitle, true);
    drawText(page, 'TRAVEL GUIDE', 50, sizeBody, false);
    y -= 20;

    drawText(page, 'Your guide to Colombia\'s Caribbean gem', 50, sizeBody, false);
    y -= 30;

    for (const section of sections) {
      if (y < 120) {
        page = pdfDoc.addPage([612, 792]);
        y = height - 50;
      }
      drawText(page, section.title, 50, sizeHeading, true);
      y -= 6;
      const lines = section.body.split('\n');
      for (const line of lines) {
        if (y < 60) {
          page = pdfDoc.addPage([612, 792]);
          y = height - 50;
        }
        page.drawText(line.substring(0, 85), { x: 50, y, size: sizeBody, font, color: rgb(0.2, 0.2, 0.2) });
        y -= sizeBody + 3;
      }
      y -= 16;
    }

    const pdfBytes = await pdfDoc.save();
    const filename = 'santa-marta-travel-guide.pdf';

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Guide PDF error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate guide' },
      { status: 500 }
    );
  }
}
