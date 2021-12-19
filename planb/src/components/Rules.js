//import PDF from './PDF';
//import PDFView from "./PDFView";
import PDFViewer from 'pdf-viewer-reactjs'

function Rules(props) {
    const {} = props;

    const pdf_url = "http://www.africau.edu/images/default/sample.pdf";

    //const prevent_cors_errors = "https://cors-anywhere.herokuapp.com/";
    //const complete_url = prevent_cors_errors + pdf_url;

    return (
        <>
            <PDFViewer document={{
                url: pdf_url,
            }}/>
        </>
    );
}

export default Rules;
