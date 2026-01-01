import streamlit as st
import pytesseract
import cv2
import numpy as np
import tempfile
import fitz  # PyMuPDF
import re
import json
import os

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# ====================== OCR Preprocessing ===========================
def preprocess_image_opencv(image):
    """Convert to grayscale, denoise, and threshold."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray, (gray.shape[1]*2, gray.shape[0]*2))  # scale up
    blur = cv2.medianBlur(gray, 3)
    thresh = cv2.adaptiveThreshold(blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                   cv2.THRESH_BINARY, 31, 2)
    return thresh

def extract_text_from_image(image):
    """Extract text using Tesseract."""
    processed = preprocess_image_opencv(image)
    return pytesseract.image_to_string(processed, config='--psm 6')

def extract_text_from_pdf(pdf_file):
    """Convert PDF pages to images and run OCR."""
    text_output = ""
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
        tmp_file.write(pdf_file.read())
        pdf_path = tmp_file.name

    doc = fitz.open(pdf_path)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=300)
        img_data = np.frombuffer(pix.tobytes(), dtype=np.uint8)
        img = cv2.imdecode(img_data, cv2.IMREAD_COLOR)
        page_text = extract_text_from_image(img)
        text_output += f"\n--- Page {i+1} ---\n" + page_text
    os.remove(pdf_path)
    return text_output

# ====================== Field Extraction ===========================

# ======================== Streamlit UI ================================
st.set_page_config(page_title="EZ Tax Extractor", layout="wide")
st.title("📄 EZ Tax Document OCR")
st.markdown("Upload a **Form 16 or Tax Document** to extract key fields automatically.")

uploaded_file = st.file_uploader("📤 Upload Image or PDF", type=["png", "jpg", "jpeg", "pdf"])

if uploaded_file:
    file_type = uploaded_file.type

    if file_type == "application/pdf":
        st.info("📄 PDF file detected. Processing all pages...")
        extracted_text = extract_text_from_pdf(uploaded_file)
    else:
        file_bytes = np.asarray(bytearray(uploaded_file.read()), dtype=np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        extracted_text = extract_text_from_image(image)

    st.subheader("📑 Raw Extracted OCR Text")
    st.text_area("Text", extracted_text, height=400)

    # Extract and show structured fields

else:
    st.info("👈 Upload a file to begin OCR processing.")
