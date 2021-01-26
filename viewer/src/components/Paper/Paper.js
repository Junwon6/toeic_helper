import React, { Component } from 'react';

import Select from './Select'
import Timer from './Timer'
import './Paper.css';

const start_num = 101;
const num_p = 100;
const p_list = [...Array(num_p).keys()].map(num => num + start_num);

//101 ~ 130 : 30
//131 ~ 146 : 16
//147 ~ 180 : 54
const part = [
    { name: 'PART5', p_num: [...Array(30).keys()].map(num => num + 101) },
    { name: 'PART6', p_num: [...Array(16).keys()].map(num => num + 131) },
    { name: 'PART7', p_num: [...Array(54).keys()].map(num => num + 147) },
]

class Paper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            part5: false,
            part6: false,
            part7: false,
        }
    }

    areYouSure = () => {
        if (window.confirm("Are you sure?")) {
            this.save()
        }
    }

    setPart = (idx) => {
        if (part[0].p_num.includes(idx)) return part[0].name
        else if (part[1].p_num.includes(idx)) return part[1].name
        else if (part[2].p_num.includes(idx)) return part[2].name

        return 'none'
    }

    checkPart = () => {
        part.forEach(data => {
            let cnt = 0;
            data.p_num.forEach(idx => {
                const answer = document.getElementById(`answer_p_${data.name}_${idx}`)
                if (answer.value !== '-') cnt++;
            })
            if (cnt === data.p_num.length) {
                const temp = {}
                temp[data.name.toLowerCase()] = true
                this.setState(temp)
            }
        })
    }

    save = () => {
        const temp = document.getElementsByName('answer')
        let answer_list = []

        for (var i = 0; i < temp.length; i++)
            answer_list.push(temp[i].value)

        fetch('http://168.188.126.207:8080/save_answer', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answer_list: answer_list, title: this.props.test })
        })
            .then(res => res.json())
            .then(json1 => {
                fetch('http://168.188.126.207:8080/get_result', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ file_name: json1.file_name })
                })
                    .then(res => res.json())
                    .then(json2 => {
                        this.props.setResult(json1.file_name, json2.result);
                    })
            })
    }

    render() {

        return (
            <div>
                <h3>{this.props.test}</h3>
                <Timer
                    part5={this.state.part5}
                    part6={this.state.part6}
                    part7={this.state.part7} />
                <div className="paper_wapper">
                    <table>
                        <tbody>
                            {p_list.map(idx => <tr key={"p_" + idx} className="p_wapper">
                                <td>{idx}</td>
                                <td><Select checkPart={this.checkPart} id={"p_" + this.setPart(idx) + "_" + idx} /></td></tr>)}
                        </tbody>
                    </table>
                </div>
                <button onClick={this.save} className="paper_button">Submit</button>
                <button onClick={this.props.backClick} className="paper_button">Back</button>
            </div>
        )
    }
}

export default Paper;