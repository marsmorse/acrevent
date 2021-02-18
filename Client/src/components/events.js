import React from 'react';

class Events extends React.Component {

    constructor(props) {
        super(props);
    }
    list(content) {
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
    render(){
        
        return(
            <div className="events-cont">
                { this.list("Announced") }
                { this.list("On Sale") }
                { this.list("Sold Out") }
            </div>
        )
    }
        
}

export default Events