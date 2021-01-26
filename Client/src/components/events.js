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
                    <li className="list-group-item">
                        <h5>Jamie XX</h5>
                        <p> 1/31/2021, 7:00pm </p>
                        {() => { console.log((content === "Announced"));return ((content === "Announced") ? <p>Tickets on Sale: <span className="highlight">1/31/2021, 7:00pm </span></p> : null)}}
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