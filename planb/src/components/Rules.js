import './style/pdf.css';
import PDFReader from "./PDFReader";


function Rules(props) {
    const {} = props;

    const pdf_url = "https://www.hasbro.com/common/instruct/00009.pdf"; // sample pdf url, should be taken from props
    //const pdf_url = props.url;

    const prevent_cors_errors = "https://cors-anywhere.herokuapp.com/";

    const complete_url = prevent_cors_errors + pdf_url;

    return (
        <>
            <PDFReader pdf_url={complete_url} />
        </>
    );
}

export default Rules;
