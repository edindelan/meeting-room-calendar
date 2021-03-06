import React, {Component, Fragment} from 'react';
import room1 from '../src/assets/img/meeting-room-1.jpg';
// import './App.scss';

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
    image: room1,
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
    image: room1,
    bookedSlots: [
      {
        from: 9,
        to: 16
      }
    ]
  },
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
    image: room1,
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
    image: room1,
    bookedSlots: [
      {
        from: 9,
        to: 16
      }
    ]
  }
];

class App extends Component {

  constructor(props) {
    super(props);

    this.calendar = React.createRef();
  }

  state = {
    scrollPosition: null
  }

  componentDidMount() {
    console.log('dada', this.calendar )
    this.calendar.current.addEventListener('scroll', this.handleScroll);
    this.setState({
      scrollPosition: this.calendar.current.scrollLeft - this.calendar.current.offsetLeft - this.calendar.current.clientLeft
    })
  }

  handleScroll = (e) => {
    console.log('dasd', e.target)
    this.setState({
      scrollPosition: e.target.scrollLeft - e.target.offsetLeft - e.target.clientLeft
    })
  }

  render() {
    const {scrollPosition} = this.state;
    const slotHeight = 100 / timeSlots.length;
    return (
      <div className="calendar-main-container">
        <div className="header">
          <div className="title"/>
          <div className="calendar-strip"/>
        </div>

        <div className="rooms">
          <div className="time-units">
            {
              timeSlots.map((slot, index) => (
                <div key={index} className="unit">{slot.slotNumber}</div>
              ))
            }
          </div>
          <div className="wrapper-parent">
            <div className="wrapper" ref={this.calendar}>
              <div className="room-images">
                <div className="room-wrapper" style={{left: -scrollPosition}}>
                  {rooms.map((room, slotContainerIndex) => (
                    <div className="room-image">
                      <img src={room.image}/>
                    </div>
                  ))}
                </div>
              </div>
              <div className="slot-containers">
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
      </div>
    )
  }
}

export default App;
