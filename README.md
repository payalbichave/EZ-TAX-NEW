# EZ TAX NEW

EZ TAX NEW is a comprehensive web application designed to simplify tax-related tasks. It provides an easy-to-use interface for tax document processing, calculations, and staying updated with the latest tax information.

## Features

- **Tax Document OCR**: Upload and extract text from tax documents (Form 16, etc.) using advanced OCR technology.
- **Tax Calculator**: Perform tax calculations with a dedicated calculator tool.
- **Tax Updates**: Stay informed with the latest tax news and updates.
- **User-Friendly Interface**: Clean, responsive web design for seamless user experience.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python with Streamlit for OCR processing
- **OCR**: Tesseract OCR with OpenCV preprocessing
- **PDF Processing**: PyMuPDF (Fitz)

## Installation and Setup

### Prerequisites

- Python 3.7+
- Node.js and npm (for local development)
- Tesseract OCR installed on your system

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/payalbichave/EZ-TAX-NEW.git
   cd EZ-TAX-NEW
   ```

2. Install Python dependencies:
   ```bash
   pip install streamlit pytesseract opencv-python numpy PyMuPDF
   ```

3. Install Tesseract OCR:
   - Download and install from [https://github.com/UB-Mannheim/tesseract/wiki](https://github.com/UB-Mannheim/tesseract/wiki)
   - Update the path in `app.py` if necessary

4. Run the Streamlit app:
   ```bash
   streamlit run app.py
   ```

5. For the web interface, open `index.html` in a browser or serve it locally:
   ```bash
   npx http-server
   ```

## Usage

1. **Homepage**: Navigate through the main site for services and information.
2. **Upload Documents**: Use the OCR tool to upload and process tax documents.
3. **Tax Calculator**: Access the calculator for tax computations.
4. **Tax Updates**: Check the latest tax-related news.

## Project Structure

```
EZ TAX NEW/
├── index.html          # Main homepage
├── about.html          # About page
├── taxupdates.html     # Tax updates page
├── app.py              # Streamlit OCR application
├── calc/               # Tax calculator directory
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── styles.css          # Main styles
├── script.js           # Main JavaScript
├── newscript.js        # Additional scripts
├── tu.css              # Tax updates styles
├── tu.js               # Tax updates JavaScript
└── README.md           # This file
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-source. Please check the license file for details.

## Contact

For questions or support, please contact the project maintainer.  

