import React from 'react';
import {Button} from "react-bootstrap";

const Loader = ({isLoading, setShowRulesModal}) => {
    if (!isLoading) return <div/>;
    return (
        <>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <img src="https://react-pdf.org/images/logo.png" alt="loader" className="mb-5 App-logo"/>
            </div>
        </>
    );
}

export default Loader;