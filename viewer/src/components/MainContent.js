import React from 'react';

import Paper from './Paper'
import TestList from './TestList'

// ['test_list', 'paper', 'result']

const MainContent = ({ page, test, testClick, backClick }) => {
    switch (page) {
        case 'test_list':
            return <TestList onClick={testClick}/>;
        case 'paper':
            return <Paper test={test} backClick={backClick}/>;
        // case 'result':
        //     return <TestList />;
        default:
            return <TestList />;
    }
};

export default MainContent;

