import React, { useEffect, useRef } from "react";

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

const PageLoadTimer : React.FC = () => {

  const time = useGetTimer();

  return  <div>The page loaded {time} seconds ago</div>
}


const Content: React.FC<{
  open: any;
}> = (props) => {
  // START - DO NOT EDIT
  const randomNumber = useRandomNumber();
  // END - DO NOT EDIT
  if (!props.open.value) {
    return null;
  }

  return <div>Your random number is: {randomNumber}</div>;
};

const MainPage: React.FC = () => {
  const [open, setOpen] = React.useState({ value: false });

  return (
    <div>
      <PageLoadTimer />
      <button
        onClick={() =>
          setOpen((prevState) => {

            let newState = {...prevState};
            newState.value = !newState.value;
            return newState;
          })
        }
      >
        Generate random number
      </button>

      <Content open={open} />
    </div>
  );
};

export default MainPage;
