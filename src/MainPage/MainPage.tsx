import React from "react";

// START - DO NOT EDIT
function useRandomNumber() {
  const randomNumber = Math.trunc(Math.random() * 1000);
  return randomNumber;
}
// END - DO NOT EDIT

const startTime = Date.now();
function useGetTimer() {
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    const intervalRef = window.setInterval(() => {
      const now = Date.now();

      setTime((now - startTime).toString());
    });
    return () => {
      clearInterval(intervalRef);
    };
  });

  return time;
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

  const time = useGetTimer();
  return (
    <div>
      <div>The page loaded {time} seconds ago</div>
      <button
        onClick={() =>
          setOpen((value) => {
            value.value = !value.value;
            return value;
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
