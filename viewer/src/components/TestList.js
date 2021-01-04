import React, { Component } from 'react';


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
                {t_list.map(t => <li key={t}><a href="#!" onClick={this.props.onClick} id={t}>{t}</a></li>)}
            </div>
        )
    }
}

export default TestList;