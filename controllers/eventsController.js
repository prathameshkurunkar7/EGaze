const pool = require('../models/db');
const HttpError = require('../middlewares/http-error');
const {v4: uuidv4} =  require('uuid');
const {validationResult} = require('express-validator');


const createEvent = async(req,res,next) =>{
    
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new HttpError(`${errors.array()[0].msg},please enter valid input.`,422)
        return next(err);
    }

    const {name,description,organizer,attendees,date,start_time,end_time} = req.body;
    const newDate = new Date(date).toISOString();

    let newEvent;
    try {
        newEvent = await pool.query('INSERT INTO events(event_id,name,description,organizer,attendee_count,date,start_time,end_time) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        [uuidv4(),name,description,organizer,attendees,newDate,start_time,end_time]);
    } catch (err) {
        const error = new HttpError('Could Not Add New Event',500);
        return next(error);
    }

    res.status(201).json(newEvent.rows[0]);    
}

const getEvent = async(req,res,next) =>{
    
    let events;
    try {

        //filtering
        const queryObj = {...req.query};
        const fieldsExclude = ['page','sort','limit','fields'];
        fieldsExclude.forEach(elem => delete queryObj[elem]);

        let query = `SELECT * from events`

        //sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.concat(` ORDER BY ${sortBy}`)
        }else{
            query = query.concat(` ORDER BY date DESC`)
        }
        
        // pagination
        const limit = req.query.limit*1 || 10;
        const page = req.query.page*1 || 1;
        const offset = (page-1)*limit;
        
        query = query.concat(` OFFSET ${offset} LIMIT ${limit}`)
        
        //Execute query
        events = await pool.query(query);
        
        if(req.query.page){
            const totalPages = Math.ceil(events.rowCount);
            if(page > totalPages){
                return res.json({events:[]})
            }   
        }

    } catch (err) {
        console.log(err);
        const error = new HttpError('Failed to get event details',500);
        return next(error);
    }
    
    let totalCount;
    try {
        totalCount = await pool.query(`SELECT COUNT(*) FROM events`);
    } catch (err) {
        const error = new HttpError('Failed to get count details',500);
        return next(error);
    }


    res.status(200).json({events:events.rows,totalCount:totalCount.rows[0].count});

}

const updateEvent = async(req,res,next) =>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new HttpError(`${errors.array()[0].msg},please enter valid input.`,422)
        return next(err);
    }
    
    const eventId = req.params.eventId;
    const {name,description,organizer,attendees,date,start_time,end_time} = req.body;
    const newDate = new Date(date).toISOString();

    let event;
    try {
        event = await pool.query('UPDATE events SET name=($1),description=($2),organizer=($3),attendee_count=($4),date=($5),start_time=($6),end_time=($7) WHERE event_id=($8) RETURNING *',
        [name,description,organizer,attendees,newDate,start_time,end_time,eventId]);
    } catch (err) {
        console.log(err);
        const error = new HttpError('Something went wrong while Updating Event!',500);
        return next(error);
    }

    res.status(200).json(event.rows[0])

}

const deleteEvent = async(req,res,next) =>{
    const eventId = req.params.eventId;
    
    let event;
    try {
        event = await pool.query('SELECT * from events WHERE event_id=($1)',[eventId]);
    } catch (err) {
        const error = new HttpError('Something went wrong while Deleting Event!',500);
        return next(error);
    }

    try {
        await pool.query('DELETE from events WHERE event_id=($1)',
        [eventId]);
    } catch (err) {
        const error = new HttpError('Something went wrong while Deleting Event!',500);
        return next(error);
    }

    res.status(200).json(event.rows[0]);

}

exports.createEvent = createEvent;
exports.getEvent = getEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;