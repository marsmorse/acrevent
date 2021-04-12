import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/auth'

function ExistingCreativesListItems({ mode }) {
    let auth = useAuth();
    const [existingCreatives, setExistingCreatives] = useState(null);
    useEffect(() => {
        axios.get('/creatives/all').then( res => {
            console.log(res.data)
            setExistingCreatives(res.data.map( c => { return c.name }));
        }).catch( error => { console.log(error); })
    }, []);
    
    //Deletes creative if delete mode is active
    const handleClick = (event) => {
        console.log(mode)
        if (mode === 'delete') {
            //setExistingCreatives(existingCreatives.filter(item => item !== event.target.innerHTML));
            axios.delete(`/creatives/${event.target.innerHTML}`).then( res => {
                console.log(res);
                if (res === 'Invalid Session') {
                    auth.setError('Session Expired');
                } else {
                    setExistingCreatives(existingCreatives.filter(item => item !== event.target.innerHTML));
                }
            }).catch( error => { console.log(error); })
            console.log(existingCreatives);
        }
    }

    if (typeof(existingCreatives === 'object') && Array.isArray(existingCreatives) ){
        return(
            <div className="list-group">
                {existingCreatives.map( (c, index) => { 
                    return (
                        <div key={ index } className="list-group-item" onClick={handleClick}>{c}</div>
                    )})}
            </div>
        ) 
    } else {
        return ( <h1>Loading...</h1>)
    }
}

function NewCreativesList({ mode }) {
    const [newCreatives, setNewCreatives] = useState([]);
    //Find out interval for saving new Creatives to the Database
    let auth = useAuth();
    const listRef = useRef(newCreatives.length);

    useEffect(() => {
        console.log(`listref = ${listRef} and newCreativeLength = ${newCreatives.length}`)
        if (newCreatives.length > listRef.current) {
            console.log(newCreatives);
            axios.post(`/creatives`, { 'name': newCreatives[0], 'type': 'music'}).then( res => {
                console.log(res.data)
                if (res.data.error === 'Invalid Session') {
                    auth.setError('Session Expired');
                }
                console.log(res);
            }).catch( error => { console.log(error); })
        }
        listRef.current = newCreatives.length;        
    }, [newCreatives]);


    const addNewCreative = (input) => {
        //check for duplicate amongst new and existing creatives
        //validate that the creative exists in api's that the backend uses
        setNewCreatives([input, ...newCreatives]);
    }

    //Deletes creative if delete mode is active
    const handleClick = (event) => {
        if (mode === 'delete') {
            setNewCreatives(newCreatives.filter(item => item !== event.target.innerHTML));
            axios.delete('/creatives', { name: event.target.innerHTML, uid: auth.user.profile.uid }).then( res => {
                setNewCreatives(newCreatives.filter(item => item !== event.target.innerHTML));
            }).catch( error => { console.log(error); })
        }
    }
    if (typeof(newCreatives === 'object') && Array.isArray(newCreatives) ){
        return(
                <div>
                    <CreativeInput submitAction={addNewCreative}/>
                    <ul className="list-group">
                        {newCreatives.map( (c, index) => {
                            return (<li key={index} className="list-group-item" onClick={handleClick}>{c}</li>)
                        })}
                    </ul>
                </div>
        ) 
    } else {
        return ( <h1>Loading...</h1>)
    }
}

function CreativeInput(props) {
    const [creativeName, setCreativeName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        props.submitAction(event.target.name.value);
        setCreativeName("");
    }; 

    return(
        <ul className="list-group">
            <li className="list-group-item">
                <form onSubmit={handleSubmit}>
                    <input id="name" type="text" value={creativeName} onChange={e => setCreativeName(e.target.value)}/>
                    <button type="submit">+</button>
                </form>
            </li>
        </ul>
    )
}

function EditBar(props) {
    const [editEnabled, setEditEnabled] = useState(false);

    const exitMenu = () => {
        setEditEnabled(false);
        props.clickAction('view');
    }
    if (editEnabled) {
        return(
            <div>
                <button type="button" onClick={() => { props.clickAction('delete') }}>🗑</button>
                <button type="button" onClick={exitMenu}>X</button>
            </div>
        )
    } else {
        return(
            <div>
                <button type="button" onClick={() => setEditEnabled(true)}>edit</button>
                
            </div>
        )
    }
}

function CreativesList() {

    const [mode, setMode ] = useState('view');
    return(
        <div className="events-cont">
            <div className="list-cont">
                <EditBar clickAction={(new_mode) => setMode(new_mode)}/>
                <NewCreativesList mode={mode}/>
                <ExistingCreativesListItems mode={mode}/>
            </div>
        </div>
    ) 
}

export default CreativesList