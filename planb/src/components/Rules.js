//import PDF from './PDF';
//import PDFView from "./PDFView";
//import PDFViewer from 'pdf-viewer-reactjs';
import './style/pdf.css';
//import pdfjs from "pdfjs-dist";
import { Document, Page, pdfjs } from 'react-pdf';
import PDFReader from "./PDFReader";


function Rules(props) {
    const {} = props;

    const pdf_url = "https://arxiv.org/pdf/quant-ph/0410100.pdf";

    const prevent_cors_errors = "https://cors-anywhere.herokuapp.com/";
    const complete_url = prevent_cors_errors + pdf_url;

    return (
        <>
            <PDFReader pdf_url={pdf_url} />
        </>
    );
}

export default Rules;
