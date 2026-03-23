"""
Upload ebooks to Supabase Storage.
Run ONCE after creating the 'books' bucket in Supabase.

Usage:
  pip install supabase python-dotenv
  python upload_books.py
"""

import os
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client

load_dotenv(".env.local")

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SERVICE_KEY  = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
BUCKET       = "books"
EBOOKS_DIR   = Path("ebooks")

def main():
    client = create_client(SUPABASE_URL, SERVICE_KEY)

    pdfs = sorted(EBOOKS_DIR.glob("*.pdf"))
    if not pdfs:
        print("No PDFs found in ./ebooks/ — run generate_ebooks.py first")
        return

    for pdf in pdfs:
        print(f"Uploading {pdf.name}...", end=" ", flush=True)
        with open(pdf, "rb") as f:
            data = f.read()

        res = client.storage.from_(BUCKET).upload(
            path=pdf.name,
            file=data,
            file_options={"content-type": "application/pdf", "upsert": "true"},
        )
        print("✓")

    print(f"\nDone! {len(pdfs)} files uploaded to bucket '{BUCKET}'.")

if __name__ == "__main__":
    main()
