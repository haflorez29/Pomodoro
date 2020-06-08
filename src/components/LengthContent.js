import React from "react";
import '../styles/LengthContent.css'

const LengthContent = ({
  btnArrowUp,
  btnArrowDown,
  breakLength,
  session,
  onClickB,
  onClickS,
}) => (
  <React.Fragment>
    <div className="break-content">
      <h3>Break Length</h3>
      <div className="cont-btn-break">
        <button id="breakDown" onClick={onClickB}>
          {btnArrowDown}
        </button>
        <span>{breakLength}</span>
        <button id="breakUp" onClick={onClickB}>
          {btnArrowUp}
        </button>
      </div>
    </div>
    <div className="session-content">
      <h3>Session Length</h3>
      <div className="cont-btn-break">
        <button id="sessionDown" onClick={onClickS}>
          {btnArrowDown}
        </button>
        <span>{session}</span>
        <button id="sessionUp" onClick={onClickS}>
          {btnArrowUp}
        </button>
      </div>
    </div>
  </React.Fragment>
);

export default LengthContent;
