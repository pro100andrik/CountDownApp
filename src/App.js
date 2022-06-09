import React from 'react';
import InputField from './components/InputField';
import Countdown from './components/Countdown';


import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      date: new Date(),
      renderInput: true,
      event: "your event ",
      showErrMessage: false,
      showCongrats: false
    })
  }

  handleChangeDate = value => {
    if (new Date(Date.parse(value)) < new Date()){
      this.setState({
        showErrMessage: true
      });
      setTimeout(() => this.setState({ showErrMessage: false  }),2000)
      return false;
    }else{
      this.setState({
        date: new Date(Date.parse(value))
      })
    }
    console.log('changing time to ' + value)
  }

  handleUnmount = () => {
    if(this.state.date < new Date()){
      this.setState({
        showErrMessage: true
      });
      setTimeout(() => this.setState({ showErrMessage: false  }),2000)
    }else{
      this.setState({
        renderInput: false
      })
    }
  }

  handleUpdateEvent = eventText => {
    this.setState({
      event: eventText
    })
  }

  changeShowCongrats = () => {
    this.setState ({showCongrats: true})
  }

  render(){
    return(
      <div className="mainContainer">
      {this.state.renderInput ?
        <InputField
          handleChangeDate={this.handleChangeDate}
          date={this.state.date}
          event={this.state.event}
          handleUnmount={this.handleUnmount}
          showErrMessage={this.state.showErrMessage}
          handleUpdateEvent={this.handleUpdateEvent} />
          :
        this.state.showCongrats ?
        <div className='congrats'> CONGRATUATION! <br />{this.state.event} is happent </div>
          :
        <Countdown
          targetDate={this.state.date}
          event={this.state.event}
          changeShowCongrats={this.changeShowCongrats}/>}
      </div>
    )
  }
}

export default App;
