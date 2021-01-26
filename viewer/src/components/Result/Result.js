import React, { Component } from 'react';

import './Result.css';

const start_num = 101;
const num_p = 100;
const part5_cnt = 30;
const part6_cnt = part5_cnt + 16;
const part7_cnt = part6_cnt + 54;

class Result extends Component {
    answerColor = (correct) => {
        if (correct === 'O') return {color: '#1a508b'}
        else if (correct === 'X') return {color: '#eb596e'}
    }

    correctCount = (result) => {
        let part5 = 0;
        let part6 = 0;
        let part7 = 0;

        for (let i = 0; i < part5_cnt; i++) {
            if (result[i].correct === 'O') part5++;
        }

        for (let i = part5_cnt; i < part6_cnt; i++) {
            if (result[i].correct === 'O') part6++;
        }

        for (let i = part6_cnt; i < part7_cnt; i++) {
            if (result[i].correct === 'O') part7++;
        }

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>part5</td>
                            <td>{part5}/{part5_cnt}</td>
                        </tr>
                        <tr>
                            <td>part6</td>
                            <td>{part6}/{part6_cnt - part5_cnt}</td>
                        </tr>
                        <tr>
                            <td>part7</td>
                            <td>{part7}/{part7_cnt - part6_cnt}</td>
                        </tr>
                        <tr>
                            <td>total</td>
                            <td>{part5 + part6 + part7}/{part7_cnt}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        const { test, result, backClick } = this.props;
        const p_list = [...Array(num_p).keys()].map(num => num + start_num);

        return (
            <div>
                <h3>{test} Result</h3>
                {this.correctCount(result)}
                <div className="result_wapper">
                    <table>
                        <tbody>
                            {p_list.map((idx, i) => <tr style={this.answerColor(result[i].correct)} key={"p_" + idx} className="r_wapper">
                                <td>{idx}</td>
                                <td>{result[i].user}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                <button onClick={backClick} className="result_button">Back</button>
            </div>
        )
    }
}

export default Result;