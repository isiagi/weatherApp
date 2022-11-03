import { useState, useEffect, useRef } from "react";
import "./home.css";

const Home = () => {
  const [city, setCity] = useState("kampala");
  const [result, setResult] = useState(null);

  const formRef = useRef()

  const fetchApi = async (city) => {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=`
    ).then((res) => res.json())
    .then((data) => setResult(data));

   
  };

  useEffect(() => {
    fetchApi(city);
    console.log("heyy");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchApi(city);
  };

  // console.log(result.clouds.all);

  // const { clouds, main, name, rain, weather, wind } = result;

  if(result === null) {
    return <p>Loading</p>
  }

  console.log(result);

  console.log(formRef.current)

  return (
    <div className="home__container">
      <div className="home__img">
        <div className="home__hero__info">
          <div>
            <h1>26 C</h1>
          </div>
          <div>
            <h3>Kampala</h3>
            <p>31 - October - 2022</p>
          </div>
          <div>
            <p>Suuny</p>
          </div>
        </div>
      </div>
      <div className="home__details">
        <div className="weather__div">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="home__input"
              ref={formRef}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit" className="weather__button">
              Search
            </button>
          </form>
          <div className="weather__ul">
            <ul>
              <li>Kampala</li>
              <li>Nairobi</li>
              <li>Dodoma</li>
            </ul>
          </div>
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
              {/* <h3>{result.main.humidity}%</h3> */}
            </span>
            <span className="weather__details">
              <h4>Wind</h4>
              {/* <h3>{wind.speed}</h3> */}
            </span>
            <span className="weather__details">
              <h4>Rain</h4>
              <h3>23%</h3>
            </span>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Home;
