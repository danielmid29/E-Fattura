let message = "";

const Popup = ({ error, setError }) => {
  if (error !== "") message = error;
  return (
    <div className={`popup ${error === "" && "hidden"}`}>
      <div className="popup-message">{message}</div>
      <div className="popup-top">
        <button className="popup-icon" onClick={() => setError("")}>
          X
        </button>
      </div>
    </div>
  );
};

export default Popup;
