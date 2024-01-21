import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  let navigate = useNavigate();

  const handleLogout = async (e) => {
    sessionStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  }    
    
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Ramit Fuel Station</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {!sessionStorage.getItem('token') ? 
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"></li>
            </ul>
           : <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shiftEntry">Shift Entry</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Meter Reading
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/meterReading">MS</Link></li>
                  <li><Link className="dropdown-item" to="/meterReadingDiesel">HSD</Link></li>
                </ul>
              </li>
            </ul>}
              {!sessionStorage.getItem('token') ? <Link to="/login" className="btn btn-outline-dark mx-2">Login</Link> : 
              <div className="btn-group">
                <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" title="Profile">
                  <i className="bi bi-person-circle"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-lg-end">
                  <li><Link className="dropdown-item" to="/profile">View Profile</Link></li>
                  <li><Link to="#" className="dropdown-item" onClick={handleLogout}>Logout</Link></li>
                </ul>
              </div> }
                {/* <Link to="/profile" className="btn btn-outline-dark mx-2"><i className="bi bi-person-circle"></i></Link>
                <Link to="/login" className="btn btn-outline-dark mx-2" onClick={handleLogout}>Logout</Link> */}
          </div>
        </div>
      </nav>
    </div>
  )
};
