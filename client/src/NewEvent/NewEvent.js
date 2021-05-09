import React,{useState,Fragment} from 'react';
import Modal from '../Modal/Modal';
import {useDispatch} from 'react-redux';
import {createEvent} from '../store/actions/events';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import CloseIcon from '@material-ui/icons/Close';

import './NewEvent.css';

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

function NewEvent() {
    const classes = useStyles();

    const dispatch = useDispatch()

    const [showModal,setShowModal] = useState(false);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [organizer,setOrganizer] = useState('');
    const [startTime,setStartTime] = useState('');
    const [endTime,setEndTime] = useState('');
    const [date,setDate] = useState('');
    const [attendees,setAttendees] = useState(0);
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        const form = {
            name,
            description,
            organizer,
            attendees,
            date:date,
            start_time:startTime,
            end_time:endTime
        }

        dispatch(createEvent(form));
        setName('');
        setDescription('');
        setOrganizer('');
        setAttendees(0);
        setShowModal(false);
    }


    return (
        <div className="new__content">
            <h2>A Place Built for Mixed Reality Events</h2>
            <p>Organize More Interactive Online Events</p>
            <button className="btn" onClick={()=>setShowModal(true)}>CREATE</button>
            {
                showModal &&
                <Modal click = {()=>setShowModal(false)}>
                        <Fragment key='header'>
                            <CloseIcon className="close-button" onClick={()=>setShowModal(false)}/>
                            <h3>CREATE EVENT</h3>
                        </Fragment>
                        <Fragment key='body'>
                            <form className={`${classes.container} edit-form`}>
                                <input onChange={e=>setName(e.target.value)} value={name} required='required' type='text' placeholder="Name"></input>
                                <textarea name="content" placeholder="What's the event about?" rows="8" value={description} onChange={e=>setDescription(e.target.value)}/>
                                <input value={organizer} name="genre" onChange={e=>setOrganizer(e.target.value)} required='required' type='text' placeholder="Organizer"></input>
                                <input type="number" min="0" placeholder="Attendance Count" value={attendees} onChange={e=>setAttendees(e.target.value)}/>
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
                            <button className="btn" onClick={handleSubmit}>CREATE</button>
                        </Fragment>
                </Modal>
            }
        </div>
    )
}

export default NewEvent;