import React from 'react';

import Paper from './Paper/Paper'
import TestList from './TestList/TestList'
import Result from './Result/Result'

// ['test_list', 'paper', 'result']

const MainContent = ({ page, test, file_name, testClick, backClick, setResult }) => {
    switch (page) {
        case 'test_list':
            return <TestList onClick={testClick}/>;
        case 'paper':
            return <Paper test={test} backClick={backClick} setResult={setResult}/>;
        case 'result':
            return <Result backClick={backClick} file_name={file_name}/>;
        default:
            return <TestList />;
    }
};

export default MainContent;

