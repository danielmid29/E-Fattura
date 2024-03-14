import { useEffect, useState } from "react";
import * as BiIcons from "react-icons/bi";

const SurveyAndMarketing = ({ setSam, data }) => {
  const [rating, setRating] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [poster, setPoster] = useState("");
  const [posterType, setPosterType] = useState("");
  const [posterName, setPosterName] = useState("");
  const [enablePoster, setEnablePoster] = useState(false);
  const [schedule, setSchedule] = useState("");

  const setSamData = () => {
    console.log(posterName);
    const json_data = {
      rating: rating,
      feedback: feedback,
      poster: poster,
      posterType: posterType,
      poster_name: posterName,
      posterEnabled: enablePoster,
      schedule: schedule,
    };
    setSam(json_data);

    console.log(json_data);
  };

  useEffect(() => {
    setSam();
  }, [
    rating,
    feedback,
    poster,
    posterType,
    posterName,
    enablePoster,
    schedule,
  ]);

  console.log(data);
  useEffect(() => {
    setRating(data.rating);
    setFeedback(data.feedback);
    setPoster(data.poster);
    setPosterType(data.posterType);
    setPosterName(data.poster_name);
    setEnablePoster(data.posterEnabled);
    setSchedule(data.schedule);
  }, [data]);

  const handleRatingChange = (e) => {
    if (e.target.checked) setRating(true);
    else setRating(false);
  };

  const handleFeedbackChange = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) setFeedback(true);
    else setFeedback(false);
  };

  const handlePosterEnableChange = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) setEnablePoster(true);
    else {
      setPosterName("");
      setPoster("");
      setEnablePoster(false);
    }
  };

  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setPosterName(file.name);
      setPosterType(file.type);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        setPoster(base64String);
      };
    }
  };

  const handleScheduleChange = (e) => {
    console.log(e);
    setSchedule(e.target.value);
  };

  var currentdate = new Date();
  var datetime =
    currentdate.getMonth() +
    1 +
    "/" +
    currentdate.getDate() +
    "/" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  useEffect(() => {
    setSamData();
  }, [rating, feedback, poster, enablePoster, schedule]);

  return (
    <div className="cb-form-container">
      <div className="cb-form-title">Survey And Marketing</div>
      <div className="cb-form">
        <div className="cb-form-element">
          <div className="cb-form-element-name">Rating</div>

          <label class="switch">
            <input
              type="checkbox"
              onChange={handleRatingChange}
              checked={rating}
            />
            <span class="slider"></span>
          </label>
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Feedback</div>
          <label class="switch">
            <input
              type="checkbox"
              onChange={handleFeedbackChange}
              checked={feedback}
            />
            <span class="slider"></span>
          </label>
        </div>

        {/* <div className="cb-form-element">
          <div className="cb-form-element-name">Schedule</div>
          <input
            name="no-of-products"
            className="cb-form-input-text"
            type="datetime-local"
            min={datetime}
            defaultValue={datetime}
            onChange={handleScheduleChange}
            step={60}
          />
        </div> */}

        <div className="cb-form-element">
          <div className="cb-form-element-name  ci">Poster</div>
          <div className="switch-ci">
            <label class="switch">
              <input
                type="checkbox"
                onChange={handlePosterEnableChange}
                checked={enablePoster}
              />
              <span class="slider"></span>
            </label>
          </div>
          <input
            name="no-of-products"
            className="cb-form-input-text bt"
            type="text"
            value={posterName}
            readOnly
          />
          <button className="cb-form-button icon">
            <input
              className="cb-form-button file"
              type="file"
              onChange={handlePosterUpload}
              disabled={enablePoster === false}
            />
            <BiIcons.BiUpload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyAndMarketing;
