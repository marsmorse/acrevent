import React from 'react';

class Creatives extends React.Component {

    constructor(props) {
        super(props);
    }
    render(){
        
        return(
            <div className="events-cont">
                <div className="list-cont">
                <h2>Your Creatives</h2>
                <ul className="list-group">
                    <li className="list-group-item">
                        Drake
                    </li>
                    <li className="list-group-item">Grateful Dead</li>
                </ul>
                </div>
            </div>
        )
    }
        
}

export default Creatives