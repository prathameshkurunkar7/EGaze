import React from 'react'
import Main from '../Main/Main';
import Navbar from '../Navbar/Navbar';

import './Home.css';
function Home() {
    return (
        <div className="home">
            <Navbar/>
            <div className="main__section">
                <Main/>
            </div>
        </div>
    )
}

export default Home;
