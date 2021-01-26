import React, { useState, useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const timeFormat = (time) => {
    let h = String(parseInt(time / 3600) % 24);
    let m = String(parseInt(time / 60) % 60);
    let s = String(time % 60);

    if (h.length === 1) h = '0' + h;
    if (m.length === 1) m = '0' + m;
    if (s.length === 1) s = '0' + s;

    return `${h}:${m}:${s}`;
}

const Timer = (props) => {
    let [count, setCount] = useState(0);
    let [part5, setPart5] = useState({status: false, time: 0}); 
    let [part6, setPart6] = useState({status: false, time: 0}); 
    let [part7, setPart7] = useState({status: false, time: 0}); 

    if (!part5.status && props.part5) {
        setPart5({status: true, time: count})
    }
    if (!part6.status && props.part6) {
        setPart6({status: true, time: count})
    }
    if (!part7.status && props.part7) {
        setPart7({status: true, time: count})
    }

    useInterval(() => {
        // Your custom logic here
        setCount(count + 1);
    }, 1000);

    return (
        <div className="timer" style={{marginBottom: '10px'}}>
            <table>
                <tbody>
                    <tr>
                        <td>time</td>
                        <td>{timeFormat(count)}</td>
                    </tr>
                    <tr>
                        <td>part5</td>
                        <td>{timeFormat(part5.time)}</td>
                    </tr>
                    <tr>
                        <td>part6</td>
                        <td>{timeFormat(part6.time)}</td>
                    </tr>
                    <tr>
                        <td>part7</td>
                        <td>{timeFormat(part7.time)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Timer;
