import React from 'react';
import {Printer} from "react-bootstrap-icons";

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
        <Printer onClick={print} title="download" />
    );
};

export default PDFPrinter;