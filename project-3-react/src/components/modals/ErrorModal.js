import React from "react";
import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";
import styles from "./Modal.module.css";

const Overlay = (props) => {
  return (
    <>
      <div className={styles.backdrop}>
        <div className={`${styles.board} ${styles.modal}`}>
          <header className={styles.header}>
            <h3>{props.title}</h3>
          </header>
          <div className={styles.content}>
            <p>{props.message}</p>
          </div>
          <footer className={styles.actions}>
            <Button
              className={`col-sm-4 btn btn-primary ${styles.btnOptions}`}
              onClick={props.onClick}
            >
              Okay
            </Button>
          </footer>
        </div>
      </div>
    </>
  );
};

const ErrorModal = (props) => {
  return (
    <>{ReactDOM.createPortal(<Overlay {...props} />, document.querySelector("#modal-root"))}</>
  );
};

export default ErrorModal;
