import React from 'react';
import './App.css';
import 'h8k-components';
import Faqs from "./components/collapsible-faq/index"

const title = "Collapsible FAQs";

const App = () => {
    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <Faqs />
        </div>
    );
}

export default App;
