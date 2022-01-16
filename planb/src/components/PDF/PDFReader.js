import React, { useState } from 'react';
import Loader from './PDFLoader';
import { Document, Page, pdfjs } from 'react-pdf';
import ControlPanel from './PDFControlPanel';
import PDFPrinter from "./PDFPrinter";
import PDFControlPanel from "./PDFControlPanel";
import {Container} from "react-bootstrap";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const PDFReader = (props) => {
    const {pdf_url} = props;

    const [scale, setScale] = useState(1.0);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const mobileWidth = 370;
    const mobileHeight = 650;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    const onDocumentLoadError = (err) => {
        console.error('pdf viewer error:', err);
    }

    return (
        <div>
            <Loader isLoading={isLoading}/>
            <section
                className="d-flex flex-column align-items-center"
            >
                <Document
                    file={pdf_url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                >
                    <Container aria-label="pdf-container">
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            width={mobileWidth}
                            height={mobileHeight}
                        />
                    </Container>
                </Document>
                <PDFControlPanel
                    pdf_url={pdf_url}
                    pageNumber={pageNumber}
                    numPages={numPages}
                    setPageNumber={setPageNumber}
                    scale={scale}
                    setScale={setScale}
                    isLoading={isLoading}
                />
            </section>
        </div>
    );
};

export default PDFReader;
