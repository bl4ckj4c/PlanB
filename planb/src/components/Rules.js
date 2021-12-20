import './style/pdf.css';
import PDFReader from "./PDFReader";


function Rules(props) {
    const {} = props;

    const pdf_url = "https://www.hasbro.com/common/instruct/00009.pdf";
    // Sample Monopoly rules: "https://www.hasbro.com/common/instruct/00009.pdf"

    // Some pdf examples:
    const pdf_url2 = "https://images.zmangames.com/filer_public/7b/01/7b0185d6-5f93-4b18-a726-40a541cb71eb/ph2200-rulebook_web.pdf"
    const pdf_url3 = "https://asmadigames.com/Red7Rules.pdf"
    const pdf_url4 = "https://cdn.svc.asmodee.net/production-rprod/storage/downloads/games/justone/jo-en01-rules-1612262916hCy2w.pdf"

    const prevent_cors_errors = "https://cors-anywhere.herokuapp.com/";
    const complete_url = prevent_cors_errors + pdf_url;

    return (
        <>
            <PDFReader pdf_url={complete_url} />
        </>
    );
}

export default Rules;
