import React from "react";
import LengthContent from "./LengthContent";
import TimeContent from "./TimeContent";
import "../styles/content.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { faPauseCircle } from "@fortawesome/free-regular-svg-icons";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";




// ccc
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.loop = undefined
  }

  state = {
    session: 25,
    breakLength: 5,
    count: 25*60,
    titleTimer: "Session",
    playPause: false,
  };

  convertTime = (count) => {
    let min = Math.floor(count / 60);
    let seconds = count % 60;
    min = min < 10 ? `0${min}` : min;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${min}: ${seconds}`;
  };

  handleClickB = (e) => {
    const { breakLength, playPause } = this.state;
    if (e.currentTarget.id === "breakUp" && breakLength < 60 && playPause === false) {
      this.setState({
        breakLength: breakLength + 1,
      });
    } else if (e.currentTarget.id === "breakDown" && breakLength > 1 && playPause === false) {
      this.setState({
        breakLength: breakLength - 1,
      });
    }
  };

  handleClickS = (e) => {
    const { session, playPause } = this.state;
    if (e.currentTarget.id === "sessionUp" && session < 60 && playPause === false) {
      this.setState({
        session: session + 1,
        count: (session + 1) * 60,
      });
    } else if (e.currentTarget.id === "sessionDown" && session > 1  &&playPause === false) {
      this.setState({
        session: session - 1,
        count: (session - 1) * 60,
      });
    }
  };

  handleClickPlay = () => {
    const {playPause} = this.state;
    const audio = document.getElementById('alarm');
    if(playPause){
      clearInterval(this.loop)
      this.setState({
        playPause:false
      })
    }else {
      this.setState({
        playPause: true
      })
      this.loop = setInterval(()=>{
        const{count, titleTimer, breakLength, session} = this.state;
        if (count === 0){
          document.getElementById('timer-label')
          .style.color = 'white'
          document.getElementById('countTime')
          .style.color = 'white'
          this.setState({
            titleTimer : (titleTimer === 'Session') ? 'Break' : 'Session',
            count : (titleTimer === 'Session') ? (breakLength*60) : (session*60)
          })
          audio.play();
        }else if(count>0 && count<61){
          document.getElementById('timer-label')
          .style.color = 'red'
          document.getElementById('countTime')
          .style.color = 'red'
          this.setState({
            count : count -1
          })
        }else {
          this.setState({
            count : count-1
          })
        }    
      },1000)
    }
  }

  handleClickReset =()=> {
    const audio = document.getElementById('alarm');
    this.setState({
      session: 25,
      breakLength: 5,
      count: 25 * 60,
      titleTimer: "Session",
      playPause: false,
    })
    clearInterval(this.loop)
    audio.pause()
    audio.currentTime = 0;
  }



  render() {
    const { session, breakLength, count, titleTimer, playPause } = this.state;
    return (
      <div className="timer-container">
        <div className="title-content">
          <h2>Pomodoro Clock</h2>
        </div>
        <div className="length-content">
          <LengthContent
            btnArrowUp={<FontAwesomeIcon icon={faArrowAltCircleUp} />}
            btnArrowDown={<FontAwesomeIcon icon={faArrowAltCircleDown} />}
            session={session}
            breakLength={breakLength}
            onClickB={this.handleClickB}
            onClickS={this.handleClickS}
          ></LengthContent>
        </div>
        <div className="content-time">
          <TimeContent
            titleTimer={titleTimer}
            count={count}
            convertTime={this.convertTime}
            play = {<FontAwesomeIcon icon={faPlayCircle}/>}
            pause = {<FontAwesomeIcon icon={faPauseCircle}/>}
            reset = {<FontAwesomeIcon icon={faUndoAlt}/>}
            onClickT = {this.handleClickPlay}
            playPause =  {playPause}
            onClickReset = {this.handleClickReset}



          ></TimeContent>
        </div>
      </div>
    );
  }
}

export default Content;
