const ButtonPage = ({horse}: {horse: string}) => {


  return (
    <div className="button-body">
      <button 
        className="go-button"
      >
        GO {horse}!!
      </button>
    </div>
  );
};

export default ButtonPage;