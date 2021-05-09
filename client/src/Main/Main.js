import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {fetchEvents} from '../store/actions/events';
import NewEvent from '../NewEvent/NewEvent';
import Card from '../Card/Card';

import { makeStyles } from '@material-ui/core/styles';

import AddToQueueRoundedIcon from '@material-ui/icons/AddToQueueRounded';
import Pagination from '@material-ui/lab/Pagination';


import './Main.css'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
}));

function Main() {
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
   
    useEffect(()=>{
        dispatch(fetchEvents(page));
    },[page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const classDeterminer = () =>{
        if(totalCount===0){
            return 'no-content'
        }
        return 'content__section'
    }

    const events = useSelector(state => state.eventReducer.events)
    const totalCount = useSelector(state => state.eventReducer.totalCount)
    
    return (
        <div className="content">
            <NewEvent/>
            <div className="header__section">
                <AddToQueueRoundedIcon/>
                <h2 style={{marginLeft:"5px"}}>Event-List</h2>
            </div>
            <div className= {`${classDeterminer()}`} >
                {
                    totalCount===0 ?<p id ='no-content'>No Events Added</p>:events.map(event=>{
                        return <Card event={event} key={event.event_id}/>
                    })
                }
            </div>
            <div className={`${classes.root} pagination`}>
                <Pagination count={Math.ceil(totalCount/8)} shape="rounded" page={page} onChange={handleChangePage}/>
            </div>
        </div>
    )
}

export default Main;
