import React, { useEffect, useRef } from "react";
import './MainPage.css'

// START - DO NOT EDIT
function useRandomNumber() {
  const randomNumber = Math.trunc(Math.random() * 1000);
  return randomNumber;
}
// END - DO NOT EDIT

const START_TIME = Date.now();
const INTERVAL_TIME = 100;

function useGetTimer() {
  const [time, setTime] = React.useState<string>('0.0');
  const timerPreviousVal = useRef<number>(START_TIME);

  const startTimer = () => {

    const startInterval = window.setTimeout(() => {
      const now = Date.now();
      const deltaTime = now - timerPreviousVal.current - INTERVAL_TIME; // Time exhauted in JS thread 

      setTime(((now - START_TIME - deltaTime) / 1000).toFixed(1));

      timerPreviousVal.current = now;

      startTimer();

    }, INTERVAL_TIME);

    return () => {
      clearTimeout(startInterval);
    }

  }

  useEffect(startTimer, [])

  return time;
}

const PageLoadTimer: React.FC = () => {

  const time = useGetTimer();

  const counterWidth = 15 * time.length - 1;


  return <div>The page loaded<span className="counterView" style={{ width: counterWidth }}>{time}</span>seconds ago</div>
}


const Content: React.FC<{
  isOpen: any;
}> = (props) => {
  // START - DO NOT EDIT
  const randomNumber = useRandomNumber();
  // END - DO NOT EDIT
  if (!props.isOpen) {
    return <div className="contentContainer"   />;
  }
  
  
  return <div className="contentContainer">Your random number is: {randomNumber}</div>;
};

const MainPage: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);


  const toggleIsOpen = ()=> setIsOpen(isOpen=>!isOpen);

  return (
    <div className="container">
      <PageLoadTimer />
      <button
        onClick={toggleIsOpen}
        className="btnPrimary"
      >
        Generate random number
      </button>

      <Content isOpen={isOpen} />
    </div>
  );
};

export default MainPage;
