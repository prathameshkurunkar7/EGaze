import {FETCH_EVENTS,CREATE_EVENT,EDIT_EVENT,DISCARD_EVENT} from '../actions/events';

const initialState = {
    events: [],
    totalCount: 0
}

const eventReducer = (state=initialState,action) =>{
    const {type,payload} = action;
    switch(type){
        case FETCH_EVENTS: 
        return{
            ...state,
            events:payload.events,
            totalCount:payload.totalCount
        }
        case CREATE_EVENT:
        return{
            ...state,
            events:[...state.events, payload],
            totalCount: state.totalCount+1
        }
        case EDIT_EVENT:
            const newEvents = state.events.map((event)=>{
                if(event.event_id === payload.event_id){
                    event = payload;
                }
                return event;
            })
            return{
                ...state,
                events:newEvents,
                totalCount: state.totalCount
            }
        case DISCARD_EVENT:
            const updatedEvents = state.events.filter((event)=>event.event_id!==payload.event_id)
            return{
                ...state,
                events:updatedEvents,
                totalCount: state.totalCount-1
            }
        default: {
            return state
        }
    }
}

export default eventReducer;