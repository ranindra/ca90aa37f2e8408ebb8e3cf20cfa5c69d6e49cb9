import { useEffect, useState } from 'react'
import styled from 'styled-components'
import './App.scss'

// COMPONENTS
import DateItem from './component/DateItem'
// ASSETS
import arrow_left from './img/keyboard_backspace-black.svg'
import arrow_bottom from './img/keyboard_arrow_down-black.svg'

function App() {
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [btnActive, setBtnActive] = useState("");

  useEffect(() => {
    getDateRange();
  }, []);


  function getDateRange() {
    var date = [];
    var today = new Date();

    //generate days of 2 weeks after today
    var i;
    for (i = 0; i < 14; i++) {
      var day = new Date(today.getTime() + i * 86400000);
      var x = day.getDay();
      var obj = {
        date: day.getDate(),
        day:
          x === 1 ? "SEN" :
            x === 2 ? "SEL" :
              x === 3 ? "RAB" :
                x === 4 ? "KAM" :
                  x === 5 ? "JUM" :
                    x === 6 ? "SAB" :
                      "MIN"
      }
      date.push(obj);
    }
    setDateRange(date);
  }



  function header() {
    return (
      <div className="nav-header">
        <img src={arrow_left} alt="icon-back" />
        <div className="loc">
          <label>ALAMAT PENGANTARAN</label>
          <div className="loc-title">Tokopedia Tower <img src={arrow_bottom} alt="icon-arrow" /></div>
        </div>
      </div>
    )
  }

  function swipeDate() {
    return (
      <div className="swipe-date-wrapper">
        <div className="swipe-date-container">
          {dateRange.map((x, i) => {
            return (
              <DateItem
                day={x.day}
                date={x.date}
                key={x.day + i}
                disable={x.day === "SAB" || x.day === "MIN" ? true : false}
                active={i === selectedDate ? true : false}
                onActive={x.day !== "SAB" && x.day !== "MIN" ? () => setSelectedDate(i) : null}
              />
            )
          })}
        </div>
      </div>
    )
  }

  function topButton() {
    const Button = styled.button`
      display: inline-block;
      color:  #6e7679;
      background: #ffffff;
      font-size: 12px;
      font-weight: 600;
      padding: 8px;
      border: 0px solid #e2e4e4;
      width: 100%;
      display: block;
      outline: none;
    `;

    const LunchBtn = styled(Button)`
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
      border: ${props => props.active ? "0px" :"2px solid #e2e4e4" };
      border-right: 0px;
      color: ${props => props.active ? "#ffffff" : "#6e7679" };
      background: ${props => props.active ? "#424749" : "#ffffff"};
    `;

    const DinnerBtn = styled(Button)`
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;      
      border: ${props => props.active ? "0px" :"2px solid #e2e4e4" };
      border-left: 0px;
      color: ${props => props.active ? "#ffffff" : "#6e7679" };
      background: ${props => props.active ? "#424749" : "#ffffff"};
    `;

    return (
      <div className="top-btn-container">
        <div className="top-btn-wrapper">
          <LunchBtn active={btnActive === "lunch" ? true : false} onClick={()=>setBtnActive("lunch")}>Lunch</LunchBtn>
          <DinnerBtn active={btnActive === "dinner" ? true : false} onClick={()=>setBtnActive("dinner")}>Dinner</DinnerBtn>
        </div>
        </div>
    )
  }

  return (
    <div className="app">
      <header>
        {header()}
        {swipeDate()}
        {topButton()}
      </header>
    </div>
  );
}


export default App;
