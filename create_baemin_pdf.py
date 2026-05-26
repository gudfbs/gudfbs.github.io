import sys
from pathlib import Path

try:
    from PyPDF2 import PdfReader, PdfWriter
except ImportError:
    print("PyPDF2 is not installed. Please install it with 'pip install PyPDF2' and rerun the script.")
    sys.exit(1)

def create_baemin_pdf():
    src_path = Path(r"d:\work\toss.pdf").resolve()
    dest_path = Path(r"d:\work\배민.pdf").resolve()
    if not src_path.exists():
        print(f"Source PDF not found: {src_path}")
        return
    reader = PdfReader(str(src_path))
    writer = PdfWriter()
    # Keep only the first three pages (0-indexed)
    num_pages_to_keep = min(3, len(reader.pages))
    for i in range(num_pages_to_keep):
        writer.add_page(reader.pages[i])
    # Write the new PDF
    with open(dest_path, "wb") as out_file:
        writer.write(out_file)
    print(f"Created {dest_path} with {num_pages_to_keep} pages.")

if __name__ == "__main__":
    create_baemin_pdf()
