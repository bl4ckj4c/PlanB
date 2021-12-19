// import React, { PureComponent } from 'react'
// import { Document, Page, pdfjs } from 'react-pdf';
// import { useState } from "react";
// import {Container} from "react-bootstrap";
// import './style/pdf.css'
// import PDF from "./PDF";
// //import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
//
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//     //pdfjs.GlobalWorkerOptions.workerSrc = "./../../build/pdf.worker.js";
//     //pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
//     //pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/scripts/pdf.worker.js`;
//
// export default class PDFView extends PureComponent {
//     render() {
//         const {pdf_url} = this.props;
//
//         return(
//             <>
//                 <PDF pdf_url={pdf_url}/>
//             </>
//         );
//     }
// }
