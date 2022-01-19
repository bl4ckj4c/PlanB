import React, { useState } from 'react';
import Loader from './PDFLoader';
import { Document, Page, pdfjs } from 'react-pdf';
import PDFControlPanel from "./PDFControlPanel";
import {Container} from "react-bootstrap";

const PDFPages = (props) => {
    const {pages, scale, width, height} = props;

    return pages.map((item, index) => <Page
        pageNumber={item.page_index}
        scale={scale}
        width={width}
        height={height}
    />);
};

export default PDFPages;
