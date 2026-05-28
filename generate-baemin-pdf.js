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
    
    // PDF 전용 HTML 파일 사용 (baemin.html에 print 스타일이 이미 적용되어 있음)
    const htmlPath = `file://${path.resolve('d:\\work\\배민\\baemin.html')}`;
    
    await page.goto(htmlPath, { waitUntil: 'networkidle2' });
    
    // PDF로 저장 - 헤더/푸터 제거
    await page.pdf({
      path: 'd:\\work\\배민\\baemin.pdf',
      format: 'A4',
      margin: {
        top: '0.4in',
        bottom: '0.35in',
        left: '0.35in',
        right: '0.35in'
      },
      printBackground: true,
      displayHeaderFooter: false,
      pageRanges: '1-2'
    });
    
    const fileSize = fs.statSync('d:\\work\\배민\\baemin.pdf').size / 1024;
    console.log(`✓ PDF 생성 완료: d:\\work\\배민\\baemin.pdf`);
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
