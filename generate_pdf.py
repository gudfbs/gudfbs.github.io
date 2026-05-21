import subprocess
from pathlib import Path

def generate_pdf_with_edge():
    """Edge를 사용해서 HTML을 PDF로 변환 (이미지 포함, 헤더/푸터 제거)"""
    
    html_path = Path(r"d:\work\toss.html").absolute()
    pdf_path = Path(r"d:\work\toss.pdf").absolute()
    
    # HTML을 file:// URL로 변환
    file_url = f"file:///{html_path}".replace("\\", "/")
    
    # Edge 실행
    cmd = [
        "msedge",
        "--headless=new",
        "--disable-gpu",
        f'--print-to-pdf={pdf_path}',
        '--print-to-pdf-no-header',
        '--print-to-pdf-no-footer',
        file_url
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
        if result.returncode == 0 and pdf_path.exists():
            file_size = pdf_path.stat().st_size / 1024
            print(f"✓ PDF 생성 완료: {pdf_path}")
            print(f"  파일 크기: {file_size:.1f} KB")
            return True
        else:
            print(f"✗ PDF 생성 실패")
            if result.stderr:
                print(f"  오류: {result.stderr[:200]}")
            return False
    except Exception as e:
        print(f"✗ 오류: {e}")
        return False

if __name__ == "__main__":
    generate_pdf_with_edge()

