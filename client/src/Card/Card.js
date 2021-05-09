import React,{useState,Fragment} from 'react';
import {useDispatch} from 'react-redux';
import {editEvent,discardEvent} from '../store/actions/events';
import DefaultEventImage from '../assets/images/exhibition.jpg';
import Modal from '../Modal/Modal';
import {Link} from 'react-router-dom';
import moment from 'moment';

import CloseIcon from '@material-ui/icons/Close';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import EventIcon from '@material-ui/icons/Event';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GroupIcon from '@material-ui/icons/Group';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './Card.css';


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

function Card({event}) {
    const classes = useStyles();

    const dispatch = useDispatch();
    moment().format();


    const [showModal,setShowModal] = useState(false);
    const [showViewModal,setShowViewModal] = useState(false);

    const [name,setName] = useState(event.name);
    const [description,setDescription] = useState(event.description);
    const [organizer,setOrganizer] = useState(event.organizer);
    const [attendees,setAttendees] = useState(event.attendees);
    const [startTime,setStartTime] = useState('');
    const [endTime,setEndTime] = useState('');
    const [date,setDate] = useState('');


    const modalHandler = (event) =>{
        setShowViewModal(false)
        setName(event.name);
        setDescription(event.description);
        setOrganizer(event.organizer);
        setAttendees(event.attendee_count);
        setDate(event.date);
        setStartTime(event.start_time);
        setEndTime(event.end_time);
        setShowModal(true);
    }

    const handleDiscardSubmit = (e) =>{
        e.preventDefault();
        dispatch(discardEvent(event.event_id));
        setShowViewModal(false);
    }

    const handleEditSubmit = (e) =>{
        e.preventDefault();
        const body = {
            name,
            description,
            organizer,
            attendees,
            date,
            start_time: startTime,
            end_time: endTime
        }

        let formData = new FormData()
        for(const key in body){
            formData.append(key,body[key])
        }

        dispatch(editEvent(event.event_id,formData));
        setShowModal(false);
    }

    return (
        <div className="card" onClick={()=>setShowViewModal(true)}>
            <div className="card__header">
                <img src={DefaultEventImage} alt="Event"></img>
            </div>
            <div className="card__body">
                <h2>{event.name}</h2>
                <div className="card__mid__details">
                    <p>{event.description}</p>
                </div>
                <div className="card__bottom__details">
                    <span className="card__organizer">{event.organizer}</span>
                    <span className="card__date"><EventIcon className="date__icon"></EventIcon>{moment(event.date).format("MMMM Do YYYY")}</span>
                    <span className="card__attendee"><GroupIcon className="group__icon"></GroupIcon>{event.attendee_count}</span>
                </div>

                {
                    showViewModal &&
                    <Modal click = {()=>setShowViewModal(false)}>
                        <Fragment key='header'>
                            <CloseIcon className="close-button" onClick={()=>setShowViewModal(false)}/>
                            <h3>View Event</h3>
                        </Fragment>
                        <Fragment key='body'>
                            <div className="view__content">
                                {event.description}
                            </div>
                            <div className="details__content">
                                <span className="details__date"><EventIcon className="date__icon__big"></EventIcon>{moment(event.date).format("dddd, MMMM Do YYYY")}</span>
                                <span className="details__time"><AccessTimeIcon className="time__icon__big"></AccessTimeIcon><p>{String(event.start_time).split('+')[0]}-{String(event.end_time).split('+')[0]}</p></span>
                            </div>
                        </Fragment>
                        <Fragment key ='footer'>
                            <button className="btn icon__btn" onClick={modalHandler} ><EditRoundedIcon className="edit__icon"/></button>
                            <Link to="/event/attend" className="btn icon__btn link">Attend</Link>
                            <button className="btn icon__btn" onClick={handleDiscardSubmit}><DeleteRoundedIcon className="delete__icon"/></button>
                        </Fragment>
                    </Modal>
                }


                {
                    showModal &&
                    <Modal click = {()=>setShowModal(false)}>
                        <Fragment key='header'>
                            <CloseIcon className="close-button" onClick={()=>setShowModal(false)}/>
                            <h3>Edit Event</h3>
                        </Fragment>
                        <Fragment key='body'>
                            <form className={`${classes.container} edit-form`}>
                                <input onChange={e=>setName(e.target.value)} value={name} required='required' type='text' placeholder={event.name}></input>
                                <textarea name="event" placeholder={event.description} rows="8" value={description} onChange={e=>setDescription(e.target.value)}/>
                                <input type="text" value={organizer} name="genre" onChange={e=>setOrganizer(e.target.value)} className="genre__select" placeholder={event.organizer} required></input>
                                <input type="number" min="0" placeholder={event.attendee_count} value={attendees} onChange={e=>setAttendees(e.target.value)}/>
                                <TextField
                                    id="date"
                                    label="Date of Event"
                                    type="date"
                                    defaultValue="2021-05-09"
                                    className={classes.textField}
                                    onChange={e=>setDate(e.target.value)} 
                                    value={date}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                <TextField
                                    id="time"
                                    label="Start Time"
                                    type="time"
                                    defaultValue="07:30"
                                    className={classes.textField}
                                    value={startTime}
                                    onChange={e=>setStartTime(e.target.value)}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                />
                                <TextField
                                    id="time"
                                    label="End Time"
                                    type="time"
                                    defaultValue="07:30"
                                    className={classes.textField}
                                    value={endTime}
                                    onChange={e=>setEndTime(e.target.value)}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                />
                            </form>
                        </Fragment>
                        <Fragment key ='footer'>
                            <button className="btn" onClick={handleEditSubmit}>Save Changes</button>
                        </Fragment>
                </Modal>
            }
            </div>
        </div>
    )
}

export default Card;
