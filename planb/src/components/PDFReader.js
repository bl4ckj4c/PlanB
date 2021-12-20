import React, { useState } from 'react';
import Loader from './PDFLoader';
import { Document, Page, pdfjs } from 'react-pdf';
import ControlPanel from './PDFControlPanel';
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

    return (
        <div>
            <Loader isLoading={isLoading} />
            <section
                id="pdf-section"
                className="d-flex flex-column align-items-center w-100"
            >
                <ControlPanel
                    scale={scale}
                    setScale={setScale}
                    numPages={numPages}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    pdf_url={pdf_url}
                    isLoading={isLoading}
                />
                <Document
                    file={pdf_url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={console.error}
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        width={mobileWidth}
                        height={mobileHeight}
                    />
                </Document>
            </section>
        </div>
    );
};

export default PDFReader;
