@echo off
REM Edge를 사용해서 HTML을 PDF로 변환 (헤더/푸터 모두 제거)
cd /d d:\work

REM Edge 실행 - 헤더/푸터 완전히 제거
start msedge --headless --disable-gpu --print-to-pdf="d:\work\toss.pdf" --print-to-pdf-no-header --print-to-pdf-no-footer "file:///d:/work/toss.html"

echo PDF 생성 중입니다...
timeout /t 5
echo 완료!

