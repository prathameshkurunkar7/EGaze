import EventService from '../../services/eventService';
import { toast } from "react-toastify";

export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const EDIT_EVENT = 'EDIT_EVENT';
export const DISCARD_EVENT = 'DISCARD_EVENT';


export const fetchEvents = (page)=>dispatch =>{
    return EventService.fetchEvents(page)
    .then(data=>{
        dispatch({type:FETCH_EVENTS,payload:data});
        return data;
    })
    .catch()
}

export const createEvent = (params) => dispatch =>{
    return EventService.createEvent(params).then(data=> {
        dispatch({type:CREATE_EVENT,payload:data});
    }).catch(err=>{
        dispatch({
            type: ERROR,
            payload: err.response.data.message
        });
        toast.error(err.response.data.message,{
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    })
}

export const editEvent = (eventId,body) => dispatch =>{
    return EventService.editEvent(eventId,body).then(data=> {
        dispatch({type:EDIT_EVENT,payload:data});
    }).catch(err=>{
        dispatch({
            type: ERROR,
            payload: err.response.data.message
        });
        toast.error(err.response.data.message,{
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    })
}

export const discardEvent = (eventId)=>dispatch =>{
    return EventService.discardEvent(eventId).then(data=> {
        dispatch({type:DISCARD_EVENT,payload:data});
    })
}