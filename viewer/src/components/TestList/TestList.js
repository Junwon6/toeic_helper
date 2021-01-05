import React, { Component } from 'react';

import './TestList.css';

class TestList extends Component {


    render() {
        const t_list = [
            "TEST01", "TEST02", "TEST03",
            "TEST04", "TEST05", "TEST06",
            "TEST07", "TEST08", "TEST09",
            "TEST10"
        ]
        return (
            <div>
                {t_list.map(t => <h3 key={t}><a href="#!" className="test_list" onClick={this.props.onClick} id={t}>{t}</a></h3>)}
            </div>
        )
    }
}

export default TestList;