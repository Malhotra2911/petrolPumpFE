import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import MeterReading from './components/MeterReading';
import MeterReadingDiesel from './components/MeterReadingDiesel';
import ShiftEntry from './components/ShiftEntry';
import Login from './components/Login';
import Profile from './components/Profile';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Alert alert={alert}/>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/meterReading" element={<MeterReading showAlert={showAlert} />} />
              <Route exact path="/meterReadingDiesel" element={<MeterReadingDiesel showAlert={showAlert} />} />
              <Route exact path="/shiftEntry" element={<ShiftEntry showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/profile" element={<Profile showAlert={showAlert} />} />
            </Routes>
          </div>
      </BrowserRouter>
    </>
  );
}

export default App;
