import React from "react";

// START - DO NOT EDIT
function useRandomNumber() {
  const randomNumber = Math.trunc(Math.random() * 1000);
  return randomNumber;
}
// END - DO NOT EDIT

const startTime = Date.now();
function useGetTimer() {
  const [time, setTime] = React.useState<string>('0.0');

  React.useEffect(() => {
    const intervalRef = window.setInterval(() => {
      const now = Date.now();

      setTime(((now - startTime)/1000).toFixed(1));
    });
    return () => {
      clearInterval(intervalRef);
    };
  });

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
