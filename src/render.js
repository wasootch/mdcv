import { chromium } from 'playwright';
import fs from 'fs';
import { marked } from 'marked';

(async () => {
  const config = JSON.parse(fs.readFileSync('config/config.json', 'utf-8'));
  const { inputFile, outputFile, htmlTitle } = config;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const md = fs.readFileSync(inputFile, 'utf-8');
  const htmlContent = await marked.parse(md); // Marked is async in newer versions

  const fullHtml = `
    <html>
      <head>
        <title>${htmlTitle}</title>
        <style>
          body { font-family: sans-serif; line-height: 1.2; font-size: 0.9rem; color: #333; }
          h1 { border-bottom: 2px solid #333; padding-bottom: 10px; }
          h2 { color: #0070f3; margin-top: 25px; border-left: 4px solid #0070f3; padding-left: 10px; }
          ul { margin-bottom: 20px; }
          li { margin-bottom: 5px; }
        </style>
      </head>
      <body>${htmlContent}</body>
    </html>
  `;

  await page.setContent(fullHtml);
  await page.waitForLoadState('networkidle');
  await page.pdf({ 
    path: outputFile,
    format: 'A4', 
    printBackground: true,
    margin: { top: '0.75in', bottom: '0.75in', left: '0.75in', right: '0.75in' }
  });
  
  await browser.close();
  console.log(`PDF Generated successfully: ${outputFile}`);
})();