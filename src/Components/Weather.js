import { Button } from "semantic-ui-react";

const Weather = ({ currentWeather, onSaveLocation }) => {
    return (
        <div>
            <h3>Current Temp: {currentWeather.temp_f}</h3>
            <Button onClick={onSaveLocation} >Save Location</Button>
        </div>
    );
};

export default Weather;
