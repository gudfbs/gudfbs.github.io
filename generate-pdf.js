const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // HTML 파일의 절대 경로를 file:// URL로 변환
    const htmlPath = `file://${path.resolve('d:\\work\\toss.html')}`;
    
    await page.goto(htmlPath, { waitUntil: 'networkidle2' });
    
    // PDF로 저장 - 헤더/푸터 제거
    await page.pdf({
      path: 'd:\\work\\toss.pdf',
      format: 'A4',
      margin: {
        top: '0.4in',
        bottom: '0.4in',
        left: '0.4in',
        right: '0.4in'
      },
      printBackground: true,
      displayHeaderFooter: false  // 헤더/푸터 완벽 제거
    });
    
    const fileSize = fs.statSync('d:\\work\\toss.pdf').size / 1024;
    console.log(`✓ PDF 생성 완료: d:\\work\\toss.pdf`);
    console.log(`  파일 크기: ${fileSize.toFixed(1)} KB`);
    
    await browser.close();
  } catch (error) {
    console.error('✗ 오류 발생:', error.message);
    if (browser) {
      await browser.close();
    }
    process.exit(1);
  }
})();
