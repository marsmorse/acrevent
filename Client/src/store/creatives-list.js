import { observer } from 'mobx-react-lite';
import { values } from 'mobx';
import { types, getParent, destroy } from 'mobx-state-tree';
import React from "react";

//statusTypes: types.array([ "ready", "verifying", "saved",  "duplicate", "invalid" ]),

export const CreativeItem = types
    .model({
        name: types.string
    })
    .views( self => {
        return {
            getName() {
                return self.name
            }
        }
    })
    .actions( self => {
        return {
            remove() {
                getParent(self, 2).remove(self)
            }
            
        }
    })

export const CreativeInput = types
    .model({
        name: types.string,
        status: "ready",
    })
    .views( self => {
        return {
            getName() {
                return self.name
            }
        }
    })
    .actions( self => {
        return {
            remove() {
                getParent(self, 2).remove(self)
            }
            
        }
    })

export const CreativeStore = types
    .model({
        creatives: types.map(CreativeItem)
    })
    .views({
        
    })
    .actions( self => {
        return {
    
            addCreativeItem(id, name) {
                self.creatives.set(id, CreativeItem.create({name}));
            },
            addCreativeInput(id, name) {
                //check for duplicate in map

                // validate creative is real

                // upload to database

                // if successful change input status to done
                    // create new CreativeItem hopefully renders above
                    
                // if error change input staus to invalid 

                // rest value

                

                self.creatives.set(id, CreativeItem.create({name}));
            },
            remove(item) {
                // remove from database!!

                //then remove from ui
                destroy(item);
            }
        }
    })
export const cstore = CreativeStore.create({
    creatives: {}
})

const CreativeItemView = observer( props => {
    <li className="list-group-item">
        <p>Drake</p>
        <button className="delete-item">🗑️</button>
    </li>
});
const CreativeInputView = observer( props => {
    <li className="list-group-item">
        <input type="text" value="artist name" onSubmit={e => console.log(e)}/>
        <button>+</button>
    </li>
});
export const CreativesListView = observer( props => (
    <div className="events-cont">
        <div className="list-cont">
            <h2>Your Creatives</h2>
            <ul className="list-group">
                { values(props.cstore.creatives).map( creativeItem => {
                    <CreativeItemView/>
                })}
                <CreativeInputView/>
            </ul>
        </div>

    </div>
));