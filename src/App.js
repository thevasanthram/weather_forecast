import './App.css';
import { useState } from 'react';

function App() {
  const [cityname, setCityname] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  function handleInputCityName(event) {
    // console.log('entering');
    setCityname(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(cityname);
    const apiUrl = `http://api.weatherstack.com/current?access_key=303679edd6331634577c7de4a86e576f&query=${cityname}`;
    console.log('apiUrl: ', apiUrl);
    const response = await fetch(apiUrl);
    const resData = await response.json();
    console.log('resData: ', resData);
    setData(resData);
    // console.log('data:', data);
    setLoading(true);
  }

  return (
    <div>
      <br />
      <form onSubmit={handleSubmit}>
        <label>Select City</label>
        <select
          required
          onChange={handleInputCityName}
          class='custom-select custom-select-lg mb-3'
        >
          <option value='london'>London</option>
          <option value='india'>India</option>
          <option value='china'>China</option>
        </select>
        <button type='submit' class='btn btn-primary'>
          Submit
        </button>
      </form>
      <br />
      {loading && (
        <section class='vh-100' style={{ 'background-color': '#4B515D' }}>
          <div class='container py-5 h-100'>
            <div class='row d-flex justify-content-center align-items-center h-100'>
              <div class='col-md-8 col-lg-6 col-xl-4'>
                <div
                  class='card'
                  style={{ color: '#4B515D', 'border-radius': '35px' }}
                >
                  <div class='card-body p-4'>
                    <div class='d-flex'>
                      <h6 class='flex-grow-1'>{data.location.country}</h6>
                      <h6>{data.location.localtime}</h6>
                    </div>

                    <div class='d-flex flex-column text-center mt-5 mb-4'>
                      <h6
                        class='display-4 mb-0 font-weight-bold'
                        style={{ color: '#1C2331' }}
                      >
                        {' '}
                        {data.current.temperature}°C{' '}
                      </h6>
                      <span class='small' style={{ color: '#868B94' }}>
                        {data.current.weather_descriptions[0]}
                      </span>
                    </div>

                    <div class='d-flex align-items-center'>
                      <div class='flex-grow-1' style={{ 'font-size': '1rem' }}>
                        <div>
                          <i
                            class='fas fa-wind fa-fw'
                            style={{ color: '#868B94' }}
                          ></i>{' '}
                          <span class='ms-1'>
                            {' '}
                            {data.current.wind_speed} km/h
                          </span>
                        </div>
                        <div>
                          <i
                            class='fas fa-tint fa-fw'
                            style={{ color: '#868B94' }}
                          ></i>{' '}
                          <span class='ms-1'> {data.current.humidity}% </span>
                        </div>
                        <div>
                          <i
                            class='fas fa-sun fa-fw'
                            style={{ color: '#868B94' }}
                          ></i>{' '}
                          <span class='ms-1'> 0.2h </span>
                        </div>
                      </div>
                      <div>
                        <img
                          src={data.current.weather_icons[0]}
                          alt='weather description icon'
                          width='100px'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
