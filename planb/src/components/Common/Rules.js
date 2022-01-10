import '../style/pdf.css';
import PDFReader from "../PDF/PDFReader";
import React from "react";


function Rules(props) {
    const {pdf_url, setShowRulesModal} = props;

    //const pdf_url = "https://www.hasbro.com/common/instruct/00009.pdf"; // sample pdf url, should be taken from props

    //const prevent_cors_errors = "https://cors-anywhere.herokuapp.com/";
    const prevent_cors_errors = "http://localhost:8080/";

    const complete_url = prevent_cors_errors + pdf_url;

    console.log(complete_url);

    return (
        <>
            <PDFReader pdf_url={complete_url}/>
        </>
    );
}

export default Rules;
