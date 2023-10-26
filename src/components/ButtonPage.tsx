import react from 'react';

const ButtonPage = ({horse}: {horse: string}) => {
  return (
    <div className="body">
      <button className="go-button">GO {horse}!!</button>
    </div>
  );
};

export default ButtonPage;