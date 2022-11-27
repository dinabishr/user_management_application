import React ,{ Suspense } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes, Route,Link} from 'react-router-dom';
// import UserForm from './components/UserForm';
//import Table from './components/Table';
const UserForm = React.lazy(() => import('./components/UserForm'));
const Home = React.lazy(() => import('./components/Home'));
import store from "./store/store";
import {Provider} from "react-redux";


function App() {
  return (
      <div >
        {/* lazy loading */}
      <Suspense fallback={<div>Loading...</div>}>
      <Router>
      <div className="navbar">
      <div className="bar">
        <nav>
        <a
          className="logo"
        >
          USER MANAGEMENT <span>APP</span></a>
          <ul className="options">
            <li className="selected">
            <Link to="/">Home</Link>
            </li>
            <li>
            <button className="nav-btn"> <Link to="/users">Users</Link></button>
            </li>
          </ul>
        </nav>
      </div>
        </div>  
        
      <div>
        {/* navigation between 2 pages */}
        <Routes>
        <Route path="/users" element={<UserForm />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
      </Suspense>
      </div>


  );
}

//wrapper function for APP in order to provide the store 
const AppWrapper = () => (
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
);

export default AppWrapper;
//export default App


