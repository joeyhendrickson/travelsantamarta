module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Travel Santa Marta - Test</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .container {
                background: white;
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                text-align: center;
                max-width: 600px;
            }
            h1 {
                color: #2c3e50;
                margin-bottom: 20px;
            }
            .status {
                background: #e8f5e8;
                border: 1px solid #4caf50;
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🌴 Travel Santa Marta - Test Page</h1>
            <p>Vercel deployment is working!</p>
            
            <div class="status">
                <h3>✅ Success!</h3>
                <p>This is a test page to verify Vercel deployment works.</p>
                <p>Next step: Fix the Python/FastAPI deployment.</p>
            </div>

            <div style="margin-top: 30px;">
                <p><strong>Current Status:</strong></p>
                <p>✅ Node.js serverless functions work</p>
                <p>❌ Python/FastAPI needs debugging</p>
                <p>🔧 Working on Python deployment fix</p>
            </div>
        </div>
    </body>
    </html>
  `);
}; 