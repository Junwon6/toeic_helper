import React, { Component } from 'react';

import './App.css';

import MainContent from './components/MainContent'

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 'test_list',
            test: 'none',
            file_name: 'none',
            result: []
        }
    }

    selectTest = (e) => {
        this.setState({
            page: 'paper',
            test: e.target.id
        })
    }

    backPage = () => {
        this.setState({
            page: 'test_list',
            test: 'none',
            file_name: 'none',
            result: []
        })
    }

    setResult = (file_name, result) => {
        this.setState({
            page: 'result',
            file_name: file_name,
            result: result
        })
    }

    render() {
        const { page, test, file_name, result } = this.state;
        const { selectTest, backPage, setResult } = this;

        return (
            <div>
                <h1>TOEIC</h1>
                <div>
                    <MainContent
                        page={page} test={test} file_name={file_name} result={result}
                        testClick={selectTest}
                        setResult={setResult}
                        backClick={backPage}/>
                </div>
            </div>
        )
    }
}

export default App;