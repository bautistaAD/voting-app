import React, { useState } from 'react';

const SwitchComponent = (prop) => {
  const filter = prop.filter;
  const setFilter = prop.setFilter;
  const [switchStateLeft, setSwitchStateLeft] = useState('switch-state-active');
  const [switchStateRight, setSwitchStateRight] = useState('switch-state-inactive');
  const [switchStateMiddle, setSwitchStateMiddle] = useState('switch-state-inactive');

  const handleClick = (event) => {
    const value = event.target.id
    
    console.log(value)
    if(value == "all"){
      setSwitchStateLeft('switch-state-active');
      setSwitchStateRight('switch-state-inactive');
      setSwitchStateMiddle('switch-state-inactive');
      setFilter("all");

    }
    else if(value == "ongoing"){
      setSwitchStateLeft('switch-state-inactive');
      setSwitchStateRight('switch-state-inactive');
      setSwitchStateMiddle('switch-state-active');
      setFilter("ongoing");
    }
    else{
      setSwitchStateLeft('switch-state-inactive');
      setSwitchStateRight('switch-state-active');
      setSwitchStateMiddle('switch-state-inactive');
      setFilter("upcoming");
    }
  };

  return (
    <div className="switch-3">
      <div className={`switch-3-label ${switchStateLeft}`} id="all" onClick={handleClick}>All</div>
      <div className={`switch-3-label ${switchStateMiddle}`} id="ongoing" onClick={handleClick}>On Going</div>
      <div className={`switch-3-label ${switchStateRight}`} id="upcoming" onClick={handleClick}>Upcoming</div>
    </div>
  );
};

export default SwitchComponent;
