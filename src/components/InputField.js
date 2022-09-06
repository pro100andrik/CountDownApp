import ErrMessage from './ErrMessage';

const InputField = props => {
  const handleClick = () => {
    props.handleUnmount()
  }

  const handleChange = e => {
    props.handleChangeDate(e.target.value)
  }

  const handleTittleChange = e => {
    props.handleUpdateEvent(e.target.textContent)
  }

  const clearEvent = () => {
    props.handleUpdateEvent(' ')
  }


    // function formatDate(date){
    //   return (
    //     date.getFullYear() + '-' +
    //     ('0' + (+date.getMonth() + 1)).slice(-2) + '-' +
    //     ('0' + +date.getDate()).slice(-2) +
    //     'T' + date.toLocaleTimeString().slice(0, 5)
    //   )
    // }
    return(
      <div>
        <div className='caption'>

        When <span className='event-name'>
                <span onBlur={handleTittleChange}
                  onClick={clearEvent}
                  contentEditable
                  suppressContentEditableWarning={true}> {props.event}
                </span>
              </span>
        must happent? <br /> </div>

        {props.showErrMessage ? <ErrMessage /> : null}
        <div><input
                type='datetime-local'
                step='60'
                onChange={handleChange}
                className='datepicker'
              /></div>
        <div className='test'>  </div>
        <button onClick={handleClick}> Show me how long to wait! </button>
      </div>
    )
}

export default InputField
