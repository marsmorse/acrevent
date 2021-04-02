
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/auth'


function List(content) {
    let auth = useAuth();
    const [events, setEvents] = useState(null);
    useEffect(() => {
        axios.get('/events/all').then( res => {
            console.log(res.data)
            setEvents(['j', 'k', 'mothafucker']);
            //setEvents(res.data.map( c => { return c.name }));
        }).catch( error => { console.log(`ERRORJ: ${error}`); })
    }, []);
    //Error: Request failed with status code 404

    if ((typeof events === 'object') && Array.isArray(events) ){
        return(
            <div className="list-group">
                {events.map( (c, index) => { 
                    return (
                        <div key={ index } className="list-group-item">{c}</div>
                    )})}
            </div>
        ) 
    } else {
        return ( <h1>Loading...</h1>)
    }
    return(
        <div className="list-cont">
            <h2>{content}</h2>
            <ul className="list-group">
                <li className="list-group-item event-item">
                    <h5>{"Jamie XX"}</h5>
                    <p> 1/31/2021, 7:00pm</p>
                    <p>{ content === 'On Sale' ? <span className="highlight">{'$15'}</span>: null} @{"The Independent"}</p>
                    {console.log((content === "Announced"))}
                    { content === 'Announced' ? <p>Tickets on Sale: <br/><span className="highlight">1/31/21 @7:00 pm</span></p>: null }
               
                </li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
            </ul>
        </div>
    )
}
function Events() {
    return(
        <div className="events-cont">
            { List("Shows") }
        </div>
    )
}
export default Events