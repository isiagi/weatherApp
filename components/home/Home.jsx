import { useState, useEffect, useRef } from "react";
import "./home.css";

const Home = () => {
  const initialValue = "kampala";

  const city = useRef();
  const [result, setResult] = useState(null);

  const fetchApi = async (city) => {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=19b3f1f33b2e5574d503f185c06659f3`
    )
      .then((res) => res.json())
      .then((data) =>
        data.cod === "404" ? alert("City Not Found") : setResult(data)
      );
  };

  useEffect(() => {
    fetchApi(initialValue);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchApi(city.current.value);
    city.current.value = "";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (result === null) {
    return <p>Loading</p>;
  }

  console.log(result);

  return (
    <div className="home__container">
      <div className="home__img">
        <div className="home__hero__info">
          <div>
            <h1>
              {result.main.temp} {"\u00b0"}C
            </h1>
          </div>
          <div>
            <h3>{result.name}</h3>
            <p>{new Date().toISOString().split("T")[0]}</p>
          </div>
          <div>
            <p>{result.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`}
              alt="weather__icon"
            />
          </div>
        </div>
      </div>
      <div className="home__details">
        <div className="weather__div">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="home__input"
              ref={city}
              placeholder="Choose City"
            />
            <button type="submit" className="weather__button">
              Search
            </button>
          </form>
          <hr />
        </div>
        <div className="weather__div">
          <h4 className="h4">Weather Conditions</h4>
          <div>
            <span className="weather__details">
              <h4>Cloudy</h4>
              <h3>{result.clouds.all}%</h3>
            </span>
            <span className="weather__details">
              <h4>Humidity</h4>
              <h3>{result.main.humidity}%</h3>
            </span>
            <span className="weather__details">
              <h4>Wind</h4>
              <h3>{result.wind.speed}m/s</h3>
            </span>
            <span className="weather__details">
              <h4>Rain</h4>
              <h3>{result.wind.speed}mm</h3>
            </span>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Home;
