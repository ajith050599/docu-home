import './App.css';
import Table from './components/Table/Table';
import Button from "./components/Buttons/Buttons";
import Header from './components/Header/Header';
import CustomModal from './components/modal/Modal';
import Qblogo from "./assets/QBlogo.png"
import { useState } from 'react';


function App() {
  const [rowActions, setRowActions] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="App">
      <Header />
      <div className='create-project-div'>
        <div className='project-name-div'>
          Projects
        </div>
          <input
          className="search-input"
          placeholder="Search projects here"
          >
          </input>
        <div>
        <Button 
        setRowActions={setRowActions}
        setIsOpen={setIsOpen}
        />
        </div>
      </div>
      <Table 
      setRowActions={setRowActions}
      setIsOpen={setIsOpen}
      rowActions={rowActions}
      isOpen={isOpen}
        />

      <div className='footer'>
        <div className='footer-copyright'>Copyright © 2022 Qburst</div>
        <img src={Qblogo} className='footer-logo' />
      </div>
      
    </div>
  );
}

export default App;
