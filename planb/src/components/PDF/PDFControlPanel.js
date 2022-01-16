import React from 'react';
import PDFPrinter from './PDFPrinter';
import {
    ChevronCompactLeft,
    ChevronCompactRight, ChevronDoubleLeft,
    ChevronDoubleRight,
    Download,
    ZoomIn,
    ZoomOut
} from "react-bootstrap-icons";
import {Col, Container, Row} from "react-bootstrap";

const ControlPanel = (props) => {
    const {pdf_url, pageNumber, numPages, setPageNumber, scale, setScale, isLoading} = props;

    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === numPages;

    const firstPageClass = isFirstPage ? 'disabled' : 'clickable';
    const lastPageClass = isLastPage ? 'disabled' : 'clickable';

    const goToFirstPage = () => {
        if (!isFirstPage) setPageNumber(1);
    };
    const goToPreviousPage = () => {
        if (!isFirstPage) setPageNumber(pageNumber - 1);
    };
    const goToNextPage = () => {
        if (!isLastPage) setPageNumber(pageNumber + 1);
    };
    const goToLastPage = () => {
        if (!isLastPage) setPageNumber(numPages);
    };

    const onPageChange = (e) => {
        const {value} = e.target;
        setPageNumber(Number(value));
    };

    const isMinZoom = scale < 0.6;
    const isMaxZoom = scale >= 10.0; // 1000%

    const zoomOutClass = isMinZoom ? 'disabled' : 'clickable';
    const zoomInClass = isMaxZoom ? 'disabled' : 'clickable';

    const zoomOut = () => {
        if (!isMinZoom) setScale(scale - 0.1);
    };

    const zoomIn = () => {
        if (!isMaxZoom) setScale(scale + 0.1);
    };

    return (
        <>
            {
                isLoading ?
                    <div />
                    :
                    <Container className="control-panel m-3 p-3 align-items-center my-auto">
                        {/*<Row className="my-auto p-3">
                            <Col>
                                <div className="d-flex justify-content-between align-items-baseline">
                                    <div className="p-2">
                                        <ChevronDoubleLeft
                                            onClick={goToFirstPage}
                                        />
                                    </div>
                                    <div className="p-2">
                                        <ChevronCompactLeft
                                            onClick={goToPreviousPage}
                                        />
                                    </div>
                                    <span>
                                    Page{' '}
                                        <input
                                            name="pageNumber"
                                            type="number"
                                            min={1}
                                            max={numPages || 1}
                                            className="p-0 pl-1 mx-2"
                                            value={pageNumber}
                                            onChange={onPageChange}
                                        />{' '}
                                        of {numPages}
                                    </span>
                                    <div className="p-2">
                                        <ChevronCompactRight
                                            onClick={goToNextPage}
                                        />
                                    </div>
                                    <div className="p-2">
                                        <ChevronDoubleRight
                                            onClick={goToLastPage}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>*/}
                        <Row className="my-auto p-3">
                            <Col>
                                <Container
                                    className="d-flex justify-content-between align-items-center"
                                    style={{
                                        'background-color':'#bcbcbc',
                                        'width': '100%',
                                        'height': '170%',
                                        'border-radius': '12px'
                                    }}
                                >
                                    <div>
                                        <ZoomOut
                                            onClick={zoomOut}
                                            size={22}
                                        />
                                    </div>
                                    <div>
                                        <span>{(scale * 100).toFixed()}%</span>
                                    </div>
                                    <div>
                                        <ZoomIn
                                            onClick={zoomIn}
                                            size={22}
                                        />
                                    </div>
                                </Container>
                            </Col>
                            {/*<Col>
                                <div className="mx-3">
                                    <a href={pdf_url} download={true} title="download">
                                        <Download className="text-black"/>
                                    </a>
                                </div>
                                <div className="mx-3">
                                    <PDFPrinter pdf_url={pdf_url}/>
                                </div>
                            </Col>*/}
                        </Row>
                    </Container>
            }
        </>
    );
};

export default ControlPanel;
