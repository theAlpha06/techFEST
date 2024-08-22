import React from 'react';
import CardUi from './CardUi';
import classes from './ErrorModel.module.css';
import ButtonUi from './ButtonUi';
import ReactDOM from 'react-dom';

const BackdropBg = props => {
  return <div className={classes.backdrop} onClick={props.onErrorClick} />;
};

const ModalOverlay = props => {
  return (
    <CardUi className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div  style={{ color:'green',fontSize:'2em'}} className={classes.content}>{props.message}</div>
      <footer className={classes.actions}>
        <ButtonUi onBtnClick={props.onErrorClick}>CLOSE</ButtonUi>
      </footer>
    </CardUi>
  );
};

const ErrorModel = props => {
  return (
    <>
    
      {ReactDOM.createPortal(
        <BackdropBg onErrorClick={props.onErrorClick} />,
        document.getElementById('backdropbg-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onErrorClick={props.onErrorClick}
        />,
        document.getElementById('error-model-root')
      )}
    </>
  );
};

export default ErrorModel;
