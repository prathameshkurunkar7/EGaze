import API from './api';

const EventService = {
    fetchEvents: (page) =>{
        return API.get(`/events/?page=${page}&limit=8`)
        .then(({data})=>{
            return data;
        })
        .catch((err)=>{
            throw err;
        })
    },
    createEvent:(data)=>{
        return API.post('/events/create',data)
        .then(({data})=>{
            return data;
        })
        .catch((err)=>{
            throw err;
        })
    },
    editEvent:(eventId,data)=>{
        const headers = {
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }
        return API.patch(`/events/update/${eventId}`,data,headers)
        .then(({data})=>{
            return data;
        })
        .catch((err)=>{
            throw err;
        })
    },
    discardEvent:(eventId) =>{
        return API.delete(`/events/delete/${eventId}`)
        .then(({data})=>{
            return data;
        })
        .catch((err)=>{
            throw err;
        })
    },
}


export default EventService;