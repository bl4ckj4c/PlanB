import React from 'react';

const PDFPrinter = ({ pdf_url }) => {
    const print = () => {
        const pdfFrame = document.createElement('iframe');
        pdfFrame.style.visibility = 'hidden';
        pdfFrame.src = pdf_url;

        document.body.appendChild(pdfFrame);

        pdfFrame.contentWindow.focus();
        pdfFrame.contentWindow.print();
    };
    return (
        <i className="fas fa-print clickable" onClick={print} title="download" />
    );
};

export default PDFPrinter;