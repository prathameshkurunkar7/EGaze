import React from 'react'
import 'aframe';
import EventImage from '../assets/images/Street-View-360-4.jpg';
import Exhibition from '../assets/images/exhibition.jpg';
import AuctionRoom from '../assets/images/AuctionRoom.jpg'
import Auditorium from '../assets/images/Auditorium.jpg';
import LiveShow from '../assets/images/liveShow.jpg';
import 'aframe-particle-system-component';
import {Entity,Scene} from 'aframe-react';

function AR() {
    return (
        <Scene>
            <Entity primitive="a-sky" src={EventImage} />
            <Entity light={{type: 'point'}}/>
            <Entity text={{value:'Welcome Viewer',align:'center',color:'white',width:'5',height:'5'}} position={{x:0,y:1,z:-4}} />

            <Entity text={{value:'Exhibition',align:'center',color:'white',width:'5',height:'5'}} position={{x:4,y:1,z:-4}} />
            <a-image src={Exhibition} width="3" height="1.5" position="4 1 -4" ></a-image>
            <Entity text={{value:'Auditorium',align:'center',color:'white',width:'5',height:'5'}} position={{x:-6,y:2,z:-2}} />
            <a-image src={Auditorium} width="3" height="1.5" position="-6 2 -2" ></a-image>
            <Entity text={{value:'Auction Room',align:'center',color:'white',width:'5',height:'5'}} position={{x:10,y:1,z:-6}} />
            <a-image src={AuctionRoom} width="3" height="1.5" position="10 1 -6" ></a-image>
            <Entity text={{value:'Live Show',align:'center',color:'white',width:'5',height:'5'}} position={{x:-2,y:3,z:-4}} />
            <a-image src={LiveShow} width="3" height="1.5" position="-2 2 -4" ></a-image>
            
            <Entity primitive='a-box' color="yellow" position="0 0 -5" />     
        </Scene>
    )
}

export default AR;
