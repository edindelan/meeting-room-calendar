import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import room1 from '../src/assets/img/meeting-room-1.jpg';
import room2 from '../src/assets/img/meeting-room-2.jpg';
import room3 from '../src/assets/img/meeting-room-3.jpg';
import room4 from '../src/assets/img/meeting-room-4.jpg';
import room5 from '../src/assets/img/meeting-room-5.jpg';
import room6 from '../src/assets/img/meeting-room-6.jpg';
import logo from '../src/assets/svg/mindspace_logo.svg';
import './App2.scss';

const timeSlots = [
  {
    slotNumber: 1,
    selected: false
  },
  {
    slotNumber: 2,
    selected: false
  },
  {
    slotNumber: 3,
    selected: false
  },
  {
    slotNumber: 4,
    selected: false
  },
  {
    slotNumber: 5,
    selected: false
  },
  {
    slotNumber: 6,
    selected: false
  },
  {
    slotNumber: 7,
    selected: false
  },
  {
    slotNumber: 8,
    selected: false
  },
  {
    slotNumber: 9,
    selected: false
  },
  {
    slotNumber: 10,
    selected: false
  },
  {
    slotNumber: 11,
    selected: false
  },
  {
    slotNumber: 12,
    selected: false
  },
  {
    slotNumber: 13,
    selected: false
  },
  {
    slotNumber: 14,
    selected: false
  },
  {
    slotNumber: 15,
    selected: false
  },
  {
    slotNumber: 16,
    selected: false
  },
  {
    slotNumber: 17,
    selected: false
  },
  {
    slotNumber: 18,
    selected: false
  },
  {
    slotNumber: 19,
    selected: false
  },
  {
    slotNumber: 20,
    selected: false
  }
];

const rooms = [
  {
    image: room1,
    bookedSlots: [
      {
        from: 3,
        to: 6
      },
      {
        from: 8,
        to: 9
      },
      {
        from: 14,
        to: 19
      }
    ]
  },
  {
    image: room2,
    bookedSlots: [
      {
        from: 1,
        to: 2
      },
      {
        from: 4,
        to: 12
      }
    ]
  },
  {
    image: room3,
    bookedSlots: [
      {
        from: 9,
        to: 16
      }
    ]
  },
  {
    image: room4,
    bookedSlots: [
      {
        from: 3,
        to: 6
      },
      {
        from: 8,
        to: 9
      },
      {
        from: 14,
        to: 19
      }
    ]
  },
  {
    image: room5,
    bookedSlots: [
      {
        from: 1,
        to: 2
      },
      {
        from: 4,
        to: 12
      }
    ]
  },
  {
    image: room6,
    bookedSlots: [
      {
        from: 9,
        to: 16
      }
    ]
  }
];

const days = [...Array(31)].map((item, index) => {
  return {
    dayNumber: index + 1,
    dayName: 'Mo'
  };
});

console.log('days', days)

class App extends Component {
  constructor(props) {
    super(props);

    this.roomCalendar = React.createRef();
    this.roomCalendarImages = React.createRef();

    this.state = {
      timeUnitScrollPosition: 0
    }
  }

  componentDidMount() {
    this.roomCalendar.current.addEventListener('scroll', this.handleScroll);
    // this.roomCalendarImages.current.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.roomCalendar.current.removeEventListener('scroll', this.handleScroll);
    // this.roomCalendarImages.current.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    const node = e.target;
    this.setState({
      timeUnitScrollPosition: this.roomCalendar.current.scrollTop
    })
    this.roomCalendarImages.current.scrollLeft = node.scrollLeft;
  }

  render() {
    const {timeUnitScrollPosition} = this.state;
    const slotHeight = 100 / timeSlots.length;
    return (
      <div className="calendar-main-container">
        <div className="header">
          <div className="title">
            <img src={logo} alt='logo'/>
          </div>
          <div className="calendar-strip">
            <div className="days">
              {days.map(day => (
                <div className="day-wrapper">
                  <span>{day.dayName}</span>
                  <span className="day-number">{day.dayNumber}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


          <div className="calendar">
            <div className="rooms-images">
              <div className="rooms-images-inner" ref={this.roomCalendarImages}>
                {rooms.map((room, slotContainerIndex) => (
                  <div key={slotContainerIndex} className="room-image" style={{backgroundImage: `url(${room.image})`}} />
                ))}
              </div>
            </div>
            <div className="time-slots">
              <div className="time-units" style={{top: -timeUnitScrollPosition}}>
                {
                  timeSlots.map((slot, index) => (
                    <div key={index} className="unit">{slot.slotNumber}</div>
                  ))
                }
              </div>
              <div className="time-slots-inner" ref={this.roomCalendar}>
                {rooms.map((room, slotContainerIndex) => (
                  <div key={slotContainerIndex} className="slot-container">
                    {timeSlots.map((slot, slotIndex) => (
                      <div
                        key={slotIndex}
                        className="slot"
                      />
                    ))}
                    <div className="container">
                      {room.bookedSlots.map((slot, bookedSlotIndex) => (
                        <div
                          key={bookedSlotIndex}
                          className="slot-content-container"
                          style={{
                            top: `${(slot.from - 1) * slotHeight}%`,
                            height: `${((slot.to - slot.from) + 1) * slotHeight}%`
                          }}
                        >
                          <div className="slot-content">
                            Taken slot: {slot.from} - {slot.to}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


      </div>
    )
  }
}

export default App;
