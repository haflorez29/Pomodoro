import React from "react";
// imr
import '../styles/TimerContent.css'

// sfc
const TimeContent = ({titleTimer, count, convertTime, play, pause, reset, onClickT, playPause, onClickReset}) => (

    <div className='session-content time'>
    <div className="cont-timer">
     <h3 id='timer-label'>{titleTimer}</h3>
      <span id='countTime'>{convertTime(count)}</span>
      <audio id='alarm' src='https://goo.gl/65cBl1' preload='auto'></audio>
    </div>
    <div className="btn-timer">
      <button onClick={onClickT}>{(playPause)? pause : play}</button>
      <button onClick={onClickReset}>{reset}</button>
    </div>
    </div>
);

export default TimeContent;
