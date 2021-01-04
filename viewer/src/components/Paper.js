import React, { Component } from 'react';

import Select from './Select'
import './Paper.css';

const start_num = 101;
const num_p = 100;

class Paper extends Component {
    save = () => {
        const temp = document.getElementsByName('answer')
        let answer_list = []

        for (var i = 0; i < temp.length; i++)
            answer_list.push(temp[i].value)

        fetch('http://localhost:4000' + '/save_answer', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answer_list: answer_list, title: this.props.test })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
            })
    }

    render() {
        const p_list = [...Array(num_p).keys()].map(num => num + start_num);

        return (
            <div>
                <button onClick={this.props.backClick}>Back</button>
                <h3>{this.props.test}</h3>
                <div>
                    {p_list.map(idx => <div key={"p_" + idx}>{idx} <Select id={"p_" + idx} /></div>)}
                </div>
                <button onClick={this.save}>Submit</button>
            </div>
        )
    }
}

export default Paper;