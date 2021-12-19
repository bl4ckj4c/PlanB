// import React, { PureComponent } from 'react'
// import { Document, Page, pdfjs } from 'react-pdf';
// import { useState } from "react";
// import {Container} from "react-bootstrap";
// import './style/pdf.css'
//
// function PDF(props) {
//     const {pdf_url} = props;
//
//     // It is needed to ENABLE PDF.JS WORKER: to do that it is possible to use pdf.worker.js from an external CDN
//     //pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//
//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);
//
//     const prevent_cors_errors = "https://cors-anywhere.herokuapp.com/";
//
//     const complete_url = prevent_cors_errors + pdf_url;
//
//     /* When document gets loaded successfully */
//     function onDocumentLoadSuccess({ numPages }) {
//         setNumPages(numPages);
//         setPageNumber(1);
//     }
//
//     /* To Prevent right click on screen */
//     document.addEventListener("contextmenu", (event) => {
//         event.preventDefault();
//     });
//
//     function changePage(offset) {
//         setPageNumber(prevPageNumber => prevPageNumber + offset);
//     }
//
//     function previousPage() {
//         changePage(-1);
//     }
//
//     function nextPage() {
//         changePage(1);
//     }
//
//     return (
//         <>
//             <Container>
//                 <Document
//                     file={complete_url}
//                     onLoadSuccess={onDocumentLoadSuccess}
//                     onLoadError={console.error}
//                 >
//                     <Page pageNumber={pageNumber} />
//                 </Document>
//
//                 {/* Previous and Next buttons */}
//                 <div>
//                     <div className="pagec">
//                         Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
//                     </div>
//                     <div className="buttonc">
//                         <button
//                             type="button"
//                             disabled={pageNumber <= 1}
//                             onClick={previousPage}
//                             className="Pre"
//
//                         >
//                             Previous
//                         </button>
//                         <button
//                             type="button"
//                             disabled={pageNumber >= numPages}
//                             onClick={nextPage}
//
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             </Container>
//         </>
//     );
// }
//
// export default PDF;