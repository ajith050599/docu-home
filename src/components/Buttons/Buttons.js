import React from 'react';
import { Fragment } from 'react';
import addImg from "../../assets/plus.png";
import "./buttons.scss"
import { stepLabelClasses } from '@mui/material';

const  Button = (props) => {
    const setAddModal = () => {
        props.setRowActions("add")
        props.setIsOpen(true)
    }
  return (
  <Fragment>
    <button className='create-new-button' onClick={() => setAddModal()}>
        <div className='btn-img-name'>
        <img src={addImg} className='plus-img' >
        </img>
        <span className='create-btn-term'>
            Create New
        </span>
        </div>

    </button>

  </Fragment>

  )
}

export default Button