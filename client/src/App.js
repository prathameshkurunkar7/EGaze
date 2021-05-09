import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AR from './AR/AR';
import Home from './Home/Home';

import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/event/attend' component={AR}></Route>
          <Route render={()=> <h1>404 Page Not Found</h1>}></Route>
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </div>
    </Router>
  );
}

export default App;
// 