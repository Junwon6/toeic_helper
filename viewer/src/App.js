import React, { Component } from 'react';

import './App.css';

import MainContent from './components/MainContent'

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 'test_list',
            test: 'none'
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
            test: 'none'
        })
    }

    render() {
        const { page, test } = this.state;
        const { selectTest, backPage } = this;

        return (
            <div>
                <h1>TOEIC</h1>
                <div>
                    <MainContent
                        page={page} test={test}
                        testClick={selectTest}
                        backClick={backPage}/>
                </div>
            </div>
        )
    }
}

export default App;