import React from 'react';
import InputField from './components/InputField';
import Countdown from './components/Countdown';


import './App.css';

const myStorage = window.localStorage;


class App extends React.Component {
  constructor(props){
    super(props);
    if (myStorage.length === 0){
      this.state = ({
        date: new Date(),
        renderInput: true,
        event: "your event ",
        showErrMessage: false,
        showCongrats: false
      })
    }else{
      this.state = ({
        date: new Date(+myStorage.getItem('date')),
        renderInput: false,
        event: myStorage.getItem('event'),
        showErrMessage: false,
        showCongrats: false
      })
    }
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
  }

  handleUnmount = () => {
    if(this.state.date < new Date()){
      this.setState({
        showErrMessage: true
      });
      setTimeout(() => this.setState({ showErrMessage: false  }),2000)
    }else{
      myStorage.setItem('date', Date.parse(this.state.date));
      myStorage.setItem('event', this.state.event);
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
    myStorage.clear();
  }

  handleChangeEvent = () => {
    this.setState({
      date: new Date(),
      renderInput: true,
      event: "your event ",
      showCongrats: false,
    })
    myStorage.clear();
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
        <>
          <div className='congrats'> CONGRATUATION! <br />{this.state.event} is happent </div>
          <button onClick={this.handleChangeEvent}> set new event </button>
        </>
          :
        <Countdown
          targetDate={this.state.date}
          event={this.state.event}
          changeShowCongrats={this.changeShowCongrats}
          handleChangeEvent={this.handleChangeEvent}/>}
      </div>
    )
  }
}

export default App;
