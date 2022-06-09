import React from 'react';

class Countdown extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      difference: (this.props.targetDate - new Date()) / 1000,
    })
  }

  handleShowCongrats = () => {
    this.props.changeShowCongrats();
  }

  componentDidMount(){
    let timerInterval = setInterval( () => {
      if ((this.props.targetDate - new Date()) / 1000 < 0) {
        clearInterval(timerInterval);
        this.handleShowCongrats();
      } else{
        this.setState({
          difference: (this.props.targetDate - new Date()) / 1000
        })
      }
    } ,1000 )
  }

  render(){
    let diff = this.state.difference;
    let seconds = parseInt(diff % 60);
    let minutes = parseInt(diff / 60 % 60);
    let hours = parseInt(diff / 60 / 60 % 24);
    let days = parseInt(diff / 24 / 60 / 60);
    return(
      <span className='tittle-countdown'>
      Countdown to: {this.props.event}
      <table>
        <tbody>
          <tr><th>{days}</th><th>{hours}</th><th>{minutes}</th><th>{seconds}</th></tr>
          <tr><td>Days</td><td>Hours</td><td>Minutes</td><td>Seconds</td></tr>
        </tbody>
      </table>
    </span>
    )
  }
}

export default Countdown
