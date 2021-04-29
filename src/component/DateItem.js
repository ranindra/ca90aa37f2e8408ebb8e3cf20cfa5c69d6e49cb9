function DateItem(props) {
    return (
        <div className={props.active ? "date-item active" : props.disable ? "date-item disable" : "date-item"} onClick={props.onActive}>
            {props.active ? <div className="active"></div> : null}
            <label>{props.day}</label>
            <h5>{props.date}</h5>
        </div>
    )
}

export default DateItem