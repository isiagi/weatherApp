import { useState, useEffect } from "react";
import "./home.css";

const Home = () => {
  const [city, setCity] = useState("kampala");
  const [result, setResult] = useState({});

  const fetchApi = async (city) => {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=`
    );

    const response = await data.json();

    // console.log(response);

    return response;
  };

  useEffect(() => {
    fetchApi(city);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchApi(city);

    console.log(data);
  };

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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className=""
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
