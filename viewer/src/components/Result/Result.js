import React, { Component } from 'react';

import './Result.css';

const start_num = 101;
const num_p = 100;

class Result extends Component {
    render() {
        const p_list = [...Array(num_p).keys()].map(num => num + start_num);

        fetch('http://168.188.126.207:8080/get_result', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ file_name: this.props.file_name })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
            })

        return (
            <div>
                <h3>{this.props.test} Result</h3>
                <div className="result_wapper">
                    {p_list.map(idx => <div key={"p_" + idx} className="r_wapper">{idx} </div>)}
                </div>
                <button onClick={this.props.backClick} className="result_button">Back</button>
            </div>
        )
    }
}

export default Result;