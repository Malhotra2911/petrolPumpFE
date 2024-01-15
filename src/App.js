import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import MeterReading from './components/MeterReading';
import MeterReadingDiesel from './components/MeterReadingDiesel';
import ShiftEntry from './components/ShiftEntry';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/meterReading" element={<MeterReading />} />
              <Route exact path="/meterReadingDiesel" element={<MeterReadingDiesel />} />
              <Route exact path="/shiftEntry" element={<ShiftEntry />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/profile" element={<Profile />} />
            </Routes>
          </div>
      </BrowserRouter>
    </>
  );
}

export default App;
