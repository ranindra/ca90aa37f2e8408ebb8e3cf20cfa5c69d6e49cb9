import { useEffect, useState } from 'react'
import styled from 'styled-components'
import './App.scss'
import { dummy } from './Dummy'
// COMPONENTS
import DateItem from './component/DateItem'
import ItemCart from './component/ItemCart'
import {
  HideScroll
} from "react-hide-on-scroll";
// ASSETS
import arrow_left from './img/keyboard_backspace-black.svg'
import arrow_bottom from './img/keyboard_arrow_down-black.svg'
import cart from './img/shopping_cart.svg'
import arrow from './img/chevron_right.svg'
import pin from './img/location_red.svg'
import pin_1 from './img/location.svg'
import close from './img/close.svg'

function App() {
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [btnActive, setBtnActive] = useState("");
  const [selectDate, setSelectDate] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [searchLoc, setSearchLoc] = useState("");

  useEffect(() => {
    getDateRange();
  }, []);

  useEffect(() => {
    getSelectDay();
  }, [selectedDate]);

  function getSelectDay() {
    var today = new Date();
    var selectday = new Date(today);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    selectday.setDate(today.getDate() + selectedDate);
    var day = selectday.toLocaleDateString('id', options);
    setSelectDate(day);
    // console.log(selectday.toLocaleDateString('id', options))
  }


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
          <div onClick={()=>setShowModal(!showModal)} className="loc-title">Tokopedia Tower <img src={arrow_bottom} alt="icon-arrow"/></div>
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
      border: ${props => props.active ? "0px" : "2px solid #e2e4e4"};
      border-right: 0px;
      color: ${props => props.active ? "#ffffff" : "#6e7679"};
      background: ${props => props.active ? "#424749" : "#ffffff"};
    `;

    const DinnerBtn = styled(Button)`
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;      
      border: ${props => props.active ? "0px" : "2px solid #e2e4e4"};
      border-left: 0px;
      color: ${props => props.active ? "#ffffff" : "#6e7679"};
      background: ${props => props.active ? "#424749" : "#ffffff"};
    `;

    return (
      <HideScroll variant="down" showOnPageInit={true} >
        <div className="top-btn-container">
          <div className="top-btn-wrapper">
            <LunchBtn active={btnActive === "lunch" ? true : false} onClick={() => setBtnActive("lunch")}>Lunch</LunchBtn>
            <DinnerBtn active={btnActive === "dinner" ? true : false} onClick={() => setBtnActive("dinner")}>Dinner</DinnerBtn>
          </div>
        </div>
      </HideScroll>
    )
  }

  const addItem = (item) => {
    console.log(item.target.value);
    var data = item.target.value;
    var price = totalPrice;
    setTotalPrice(parseInt(price) + parseInt(data));
    var items = selectedItem.slice(0);
    items.push(data);
    setSelectedItem(items);
  }

  const handleChange = ({ target }) => {
    setSearchLoc(target.value);
  }

  //main
  return (
    <div className="app">
      <header className="header-cont">
        {header()}
        {swipeDate()}
        {topButton()}
      </header>
      <div id="main-section">
        <div className="main-date">{selectDate}</div>
        <div className="main-item">
        {
          dummy.map((item, i) => {
            return (
              <ItemCart
                preview={item.img_url}
                rating={item.rating}
                title={item.title}
                subtitle={item.subtitle}
                price={item.price}
                value={item.price}
                onAdd={(value) => addItem(value)}
              />
            )
          })
        }
        </div>
      </div>
      {selectedItem.length === 0 ?
        null :
        <Cart
          items={selectedItem.length}
          totalprice={totalPrice}
        />
      }
      <div className="modal" style={{display: showModal ? 'block':'none'}}>
        <div className="modal-content">
          <img id="close-btn" src={close} alt="close" onClick={()=>setShowModal(!showModal)}/>
          <h3>Cek makanan yang tersedia di lokasi kamu!</h3>
          <div className="modal-input-wrapper">
            <img src={pin} alt="map" />
            <input 
              onChange={handleChange}
            />
          </div>
          {
              searchLoc.length >= 3 ?
            
          <div className="location-result-wrapper">            
            <LocationResult
              name="Kulina"
              detail="Jl. Tulodong Atas No.28, RT.6/RW.3, Senayan, Kebayoran Baru, South Jakarta City, Jakarta 12190"
            />
            <LocationResult
              name="Kulina"
              detail="Jl. Tulodong Atas No.28, RT.6/RW.3, Senayan, Kebayoran Baru, South Jakarta City, Jakarta 12190"
            />
            <LocationResult
              name="Kulina"
              detail="Jl. Tulodong Atas No.28, RT.6/RW.3, Senayan, Kebayoran Baru, South Jakarta City, Jakarta 12190"
            />
          </div>
          : null }
        </div>
      </div>
    </div>
  );
}

function Cart(props) {
  return (
    <div className="cart">
      <p id="item">{props.items} Items | Rp {props.totalprice}
        <br /><span>Termasuk ongkos kirim</span>
      </p>
      <img id="cart-icon" src={cart} alt="cart" />
      <img src={arrow} alt="arrow" />
    </div>
  )
}

function LocationResult(props) {
  return (
    <div className="location-result">
      <img src={pin_1} alt="place" />
      <div id="loc">
        <div className="loc-name">{props.name}</div>
        <div id="loc-detail">{props.detail}</div>
      </div>
    </div>
  )
}

export default App;
