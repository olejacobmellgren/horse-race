import confetti from "https://esm.run/canvas-confetti@1";

const ButtonPage = ({horse}: {horse: string}) => {
  function onClick() {
    confetti({
      particleCount: 150,
      spread: 60,
      startVelocity: 30,
    });
  }

  return (
    <div className="button-body">
      <button 
        className="go-button"
        onClick={ onClick }
      >
        GO {horse}!!
      </button>
    </div>
  );
};

export default ButtonPage;