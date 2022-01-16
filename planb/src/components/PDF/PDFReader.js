import React, {useEffect, useState} from 'react';
import Loader from './PDFLoader';
import { Document, Page, pdfjs } from 'react-pdf';
import ControlPanel from './PDFControlPanel';
import PDFPrinter from "./PDFPrinter";
import PDFControlPanel from "./PDFControlPanel";
import {Container} from "react-bootstrap";
import PDFPages from "./PDFPages";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const PDFReader = (props) => {
    const {pdf_url} = props;

    const [scale, setScale] = useState(1.0);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const [pages, setPages] = useState([]);

    const mobileWidth = 370;
    const mobileHeight = 650;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    const onDocumentLoadError = (err) => {
        console.error('pdf viewer error:', err);
    }

    useEffect(() => {
        let array = [];
        for(let i = 1; i <= numPages; i++)
        {
            let json_item = {page_index: i}
            array.push(json_item);
        }
        setPages(array);
    }, [numPages]);

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
                        <PDFPages
                            pages={pages}
                            scale={scale}
                            width={mobileWidth}
                            height={mobileHeight} />
                    </Container>
                </Document>
                <Container className="fixed-bottom"
                           style={{
                               'margin-right':'3%'
                           }}>
                    <PDFControlPanel
                        pdf_url={pdf_url}
                        pageNumber={pageNumber}
                        numPages={numPages}
                        setPageNumber={setPageNumber}
                        scale={scale}
                        setScale={setScale}
                        isLoading={isLoading}
                    />
                </Container>
            </section>
        </div>
    );
};

export default PDFReader;
