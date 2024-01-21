import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { backendApiUrl } from '../config/config';

const MeterReadingDiesel = (props) => {

    function calculateTankSale() {
        let prevStock = document.getElementById("prevStock").value;
        let currentStock = document.getElementById("Stock").value;
    
        let result = Number(prevStock) - Number(currentStock);
        document.getElementById("tankSale").value = parseFloat(result) || 0;
    }
    
    function calculateTotalNozzleSales() {
    let Nozzle1 = document.getElementById("Nozzle1").value;
    let Nozzle2 = document.getElementById("Nozzle2").value;
    let Testing = document.getElementById("Testing").value;

    let result = ((Number(Nozzle1) + Number(Nozzle2)) - Number(Testing));
    document.getElementById("totalNozzleSales").value = parseFloat(result) || 0;
    }

    function setRadioValue(radioId) {
        let radioResult = document.getElementById(radioId)?.value;
        setRadio(radioResult);
    }

  const data = {
    Date : "",
    Time : "",
    Density : "",
    Dip : "",
    WaterDip : "",
    Stock : "",
    Receipt : "",
    Testing : "",
    Nozzle1 : "",
    Nozzle2 : "",
    Remark : "",
  };

  const searchData = {
    fromDate : "",
    toDate : ""
  }

  const [credentials, setCredentials] = useState([data]);
  const [myDatas, setMyDatas] = useState([]);
  const [isError, setIsError] = useState([]);
  const [searchCredentials, setSearchCredentials] = useState([searchData]);
  const [editDatas, setEditDatas] = useState([]);
  const [radio, setRadio] = useState([]);

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value});
    setSearchCredentials({...searchCredentials, [e.target.name] : e.target.value});
    setEditDatas({...editDatas, [e.target.name] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const DensityAsFloat = parseFloat(credentials.Density)
    const DipAsFloat = parseFloat(credentials.Dip)
    const WaterDipAsFloat = parseFloat(credentials.WaterDip)
    const StockAsFloat = parseFloat(credentials.Stock)
    const ReceiptAsFloat = parseFloat(credentials.Receipt)
    const TestingAsFloat = parseFloat(credentials.Testing)
    const Nozzle1AsFloat = parseFloat(credentials.Nozzle1)
    const Nozzle2AsFloat = parseFloat(credentials.Nozzle2)
    const updatedCredentials = {...credentials, Density: DensityAsFloat, Dip: DipAsFloat, WaterDip: WaterDipAsFloat, Stock: StockAsFloat, Receipt: ReceiptAsFloat, Testing: TestingAsFloat, Nozzle1: Nozzle1AsFloat, Nozzle2: Nozzle2AsFloat}
    const response = await axios.post(`${backendApiUrl}meter/add-meterReadingDiesel`, updatedCredentials, {
        headers : {
            'auth-token' : sessionStorage.getItem('token')
        }
    });
    if(response.data) {
        alert("Added Successfully...");
        window.location.reload();
        props.showAlert("Added Successfully...", "success");
    }
    console.log(response.data);
  }

  const handleSearchSubmit = async (e) => {
    axios.get(`${backendApiUrl}meter/get-meterReadingDiesel?fromDate=${searchCredentials.fromDate}&toDate=${searchCredentials.toDate}`)
    .then((res) => {
        setMyDatas(res.data.data);
    }).catch((error) => {
        setIsError(error.message);
    })
  }

  const handleEditData = async (e) => {
    axios.get(`${backendApiUrl}meter/get-meterReadingDiesel?id=${e}`)
    .then((res) => {
        setEditDatas(res.data.data[0]);
    })
    .catch((error) => {
        setIsError(error.message);
    })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    axios.put(`${backendApiUrl}meter/edit-meterReadingDiesel`, editDatas);
    alert("Updated Successfully...");
    window.location.reload();
    props.showAlert("Updated Successfully...", "success");
  }

  const handleDelete = async (e) => {
    axios.delete(`${backendApiUrl}meter/delete-meterReadingDiesel?id=${e}`)
    .then(() => {
        axios.get(`${backendApiUrl}meter/get-meterReadingDiesel`)
        .then((res)=> {
            setMyDatas(res.data.data);
        })
        .catch((error)=> {
            setIsError(error.message);
        })
    })
    props.showAlert("Deleted Successfully...", "success");
  }

  const handleInput = async (e) => {
    axios.get(`${backendApiUrl}meter/get-stockFromDip?dip=${document.getElementById("Dip").value}`)
    .then((res) => {
        document.getElementById("Stock").value = res?.data?.data?.Stock
    })
    .catch((error) => {
        setIsError(error.message);
    })
  }

  useEffect(() => {
    axios.get(`${backendApiUrl}meter/get-meterReadingDiesel`)
    .then((res)=> {
        setMyDatas(res.data.data);
    })
    .catch((error)=> {
        setIsError(error.message);
    })
  }, [])
  

  return (
    sessionStorage.getItem('token') ?
    <div className='MeterReading'>
        <h2 className='text-start mx-4'><u>HSD</u></h2>
        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content text-white" style={{ backgroundColor: "navy" }}>
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Daily HSD Entry</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form className='text-start' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="Date" className="form-label">Date</label>
                                <input type="date" className="form-control" name="Date" id="Date" value={credentials.Date} onChange={onChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Time" className="form-label">Time</label>
                                <input type="time" className="form-control" name="Time" id="Time" value={credentials.Time} onChange={onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="Density" className="form-label">Density</label>
                                <input type="text" className="form-control" name="Density" id="Density" value={credentials.Density} onChange={onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-md-3">
                                <label htmlFor="prevDip" className="form-label">Prev. Dip</label>
                                <input type="text" className="form-control" name="prevDip" id="prevDip" value={myDatas[myDatas.length - 1]?.Dip} disabled/>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="prevStock" className="form-label">Prev. Stock</label>
                                <input type="text" className="form-control" name="prevStock" id="prevStock" value={myDatas[myDatas.length - 1]?.Stock} disabled/>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="tankSale" className="form-label">Tank Sale</label>
                                <input type="text" className="form-control" name="tankSale" id="tankSale" disabled/>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="totalNozzleSales" className="form-label">Total Nozzle Sales</label>
                                <input type="text" className="form-control" name="totalNozzleSales" id="totalNozzleSales" disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="Dip" className="form-label">Dip</label>
                                <input type="text" className="form-control" name="Dip" id="Dip" value={credentials.Dip} onChange={onChange} onInput={() => {handleInput(), calculateTankSale()}} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="WaterDip" className="form-label">Water Dip</label>
                                <input type="text" className="form-control" name="WaterDip" id="WaterDip" value={credentials.WaterDip} onChange={onChange} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="Stock" className="form-label">Stock</label>
                                <input type="text" className="form-control" name="Stock" id="Stock" value={credentials.Stock} onChange={onChange} onInput={() => calculateTankSale()} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="Receipt" className="form-label">Receipt</label>
                                {/* <input type="text" className="form-control" name="Receipt" id="Receipt" value={credentials.Receipt} onChange={onChange} /> */}
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input mx-2" type="radio" name="inlineRadioOptions" id="receiptYes" value="Yes" onChange={onChange} onInput={() => setRadioValue("receiptYes")} />
                                    <label className="form-check-label" htmlFor="receiptYes">Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="receiptNo" value="No" defaultChecked onChange={onChange} onInput={() => setRadioValue("receiptNo")} />
                                    <label className="form-check-label" htmlFor="receiptNo">No</label>
                                </div>
                                { radio == 'Yes' ? <input type="text" className="form-control" name="Receipt" id="Receipt" value={credentials.Receipt} onChange={onChange} />
                                   : <input type="text" className="form-control" name="Receipt" id="Receipt" value={credentials.Receipt} defaultValue={"0"} onChange={onChange} disabled/>
                                }
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Testing" className="form-label">Testing</label>
                                <input type="text" className="form-control" name="Testing" id="Testing" value={credentials.Testing} onChange={onChange} onInput={() => calculateTotalNozzleSales()} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="Nozzle1" className="form-label">Nozzle 1</label>
                                <input type="text" className="form-control" name="Nozzle1" id="Nozzle1" value={credentials.Nozzle1} onChange={onChange} onInput={() => calculateTotalNozzleSales()} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Nozzle2" className="form-label">Nozzle 2</label>
                                <input type="text" className="form-control" name="Nozzle2" id="Nozzle2" value={credentials.Nozzle2} onChange={onChange} onInput={() => calculateTotalNozzleSales()} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Remark" className="form-label">Remark</label>
                        <input type="text" className="form-control" name="Remark" id="Remark" value={credentials.Remark} onChange={onChange} />
                    </div>
                    <hr />
                    { radio == 'Yes' ? 
                    <div>
                        <h4 className='text-center'><u>Tank Truck Loading</u></h4>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <label htmlFor="ttDate" className="form-label">TT Date</label>
                                    <input type="date" className="form-control" name="ttDate" id="ttDate" />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="invoiceNo" className="form-label">Invoice No.</label>
                                    <input type="text" className="form-control" name="invoiceNo" id="invoiceNo" />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="ttNo" className="form-label">TT No.</label>
                                    <input type="text" className="form-control" name="ttNo" id="ttNo" />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="" className="form-label">TT Load (KL)</label> <br />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled />
                                        </div>
                                        <div className="col-md-7">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="transporter" className="form-label">Transporter</label>
                                    <input type="text" className="form-control" name="transporter" id="transporter" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="driverName" className="form-label">Driver Name</label>
                                    <input type="text" className="form-control" name="driverName" id="driverName" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <label htmlFor="mpb" className="form-label">MPB</label>
                                    <input type="text" className="form-control" name="mpb" id="mpb" />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="MOB" className="form-label">MOB</label>
                                    <input type="text" className="form-control" name="MOB" id="MOB" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <label htmlFor="ttLoadingDate" className="form-label">TT Loading Date</label>
                                    <input type="date" className="form-control" name="ttLoadingDate" id="ttLoadingDate" />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="ttLoadingTime" className="form-label">TT Loading Time</label>
                                    <input type="time" className="form-control" name="ttLoadingTime" id="ttLoadingTime" />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="ttUnloadingDate" className="form-label">TT Unloading Date</label>
                                    <input type="date" className="form-control" name="ttUnloadingDate" id="ttUnloadingDate" />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="ttUnloadingTime" className="form-label">TT Unloading Time</label>
                                    <input type="time" className="form-control" name="ttUnloadingTime" id="ttUnloadingTime" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="" className="form-label"><u>INVOICE DENSITY @ 15 C</u></label> <br />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled />
                                        </div>
                                        <div className="col-md-4">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" />
                                        </div>
                                        <div className="col-md-4">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                        </div>
                                    </div>                                    
                                </div>
                                <div className="col-md-1">
                                </div>
                                <div className="col-md-7">
                                    <label htmlFor="" className="form-label"><u>SAMPLE DENSITY @ 15 C</u></label> <br />
                                    <div className="row">
                                        <div className="col-md-2">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='Hydro.' /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='Hydro.' />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='Temp.' /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='Temp.' /> 
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='15c' /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='15c' /> 
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="" className="form-label"><u>TANK LOADING BEFORE REPORT</u></label> <br />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='PRODUCT' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled />
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DIP' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='STOCK' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU1' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU2' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                        </div>
                                    </div>                                    
                                </div>
                                <div className="col-md-2">
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="" className="form-label"><u>GAIN/LOSS DENSITY</u></label> <br />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="" className="form-label"><u>TANK LOADING AFTER REPORT</u></label> <br />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='PRODUCT' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled />
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DIP' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='STOCK' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU1' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU2' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                        </div>
                                    </div>                                    
                                </div>
                                <div className="col-md-2">
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="" className="form-label"><u>GAIN/LOSS STOCK</u></label> <br />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" />
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="" className="form-label"><u>PREVIOUS TANK LOADING AFTER REPORT</u></label> <br />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='PRODUCT' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='STOCK' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU1' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU2' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                        </div>
                                    </div>                                    
                                </div>
                                <div className="col-md-1">
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="" className="form-label"><u>PREVIOUS TANK LOADING AFTER REPORT</u></label> <br />
                                    <div className="row">
                                        <div className="col-md-5">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU1 SALE' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU2 SALE' disabled />
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='TOTAL SALE' disabled />
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='STOCK' disabled />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" /> 
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""}
                    <button type="submit" className="btn btn-dark">Submit</button>
                </form>
                </div>
                </div>
            </div>
        </div>

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-5">
                            <label htmlFor="fromDate" className="form-label"><u>From Date</u></label>
                            <input type="date" className="form-control" name="fromDate" id="fromDate" value={searchCredentials.fromDate} onChange={onChange}/>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="toDate" className="form-label"><u>To Date</u></label>
                            <input type="date" className="form-control" name="toDate" id="toDate" value={searchCredentials.toDate} onChange={onChange}/>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="search"></label>
                            <input className="btn btn-outline-dark my-2" type="submit" value="Search" onClick={handleSearchSubmit}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                </div>
                <div className="col-md-4">
                </div>
            </div>
            <div className="table-responsive TH">
                <table className="table table-striped table-bordered border-dark my-4">
                    <thead>
                        <tr>
                        <th scope="col">S.no</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Density</th>
                        <th scope="col">Dip</th>
                        <th scope="col">Water Dip</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Opening Stock</th>
                        <th scope="col">Receipt</th>
                        <th scope="col">Total Stock</th>
                        <th scope="col">Closing Stock</th>
                        <th scope="col">Physical Stock</th>
                        <th scope="col">Stock (Loss/Gain)</th>
                        <th scope="col">Cumm (Loss/Gain)</th>
                        <th scope="col">Nozzle 1</th>
                        <th scope="col">Nozzle 2</th>
                        <th scope="col">Nozzle 1 Differences</th>
                        <th scope="col">Nozzle 2 Differences</th>
                        <th scope="col">Total Nozzle Sales</th>
                        <th scope="col">Testing</th>
                        <th scope="col">Actual Nozzle Sales</th>
                        <th scope="col">Cumm Nozzle Sales</th>
                        <th scope="col">Remark</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myDatas.length > 0 ? myDatas.map((myData, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{myData.Date}</td>
                                    <td>{myData.Time}</td>
                                    <td>{myData.Density}</td>
                                    <td>{myData.Dip}</td>
                                    <td>{myData.WaterDip}</td>
                                    <td>{myData.Stock}</td>
                                    <td>{myData.OpeningStock}</td>
                                    <td>{myData.Receipt}</td>
                                    <td>{myData.TotalStock}</td>
                                    <td>{myData.ClosingStock}</td>
                                    <td>{myData.PhysicalStock}</td>
                                    <td>{myData.StockLossGain}</td>
                                    <td>{myData.CummLossGain}</td>
                                    <td>{myData.Nozzle1}</td>
                                    <td>{myData.Nozzle2}</td>
                                    <td>{myData.Nozzle1Diff}</td>
                                    <td>{myData.Nozzle2Diff}</td>
                                    <td>{myData.TotalNozzleSales}</td>
                                    <td>{myData.Testing}</td>
                                    <td>{myData.ActualNozzleSales}</td>
                                    <td>{myData.CummNozzleSales}</td>
                                    <td>{myData.Remark}</td>
                                    <td>
                                        <button type="button" className="btn btn-outline-dark mx-1" data-bs-toggle="modal" title='Edit' onClick={() => handleEditData(myData.id)} data-bs-target="#editModal">
                                        <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <div key={myData.id} className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-xl">
                                                <div className="modal-content text-white" style={{ backgroundColor: "navy" }}>
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Daily MS Entry</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                <form className='text-start' onSubmit={handleEditSubmit}>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label htmlFor="Date" className="form-label">Date</label>
                                                                <input type="date" className="form-control" name="Date" id="Date" value={editDatas?.Date} onChange={onChange} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="Time" className="form-label">Time</label>
                                                                <input type="time" className="form-control" name="Time" id="Time" value={editDatas?.Time} onChange={onChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label htmlFor="Density" className="form-label">Density</label>
                                                                <input type="text" className="form-control" name="Density" id="Density" value={editDatas?.Density} onChange={onChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <label htmlFor="Dip" className="form-label">Dip</label>
                                                                <input type="text" className="form-control" name="Dip" id="Dip" value={editDatas?.Dip} onChange={onChange} />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label htmlFor="WaterDip" className="form-label">Water Dip</label>
                                                                <input type="text" className="form-control" name="WaterDip" id="WaterDip" value={editDatas?.WaterDip} onChange={onChange} />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label htmlFor="Stock" className="form-label">Stock</label>
                                                                <input type="text" className="form-control" name="Stock" id="Stock" value={editDatas?.Stock} onChange={onChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label htmlFor="Receipt" className="form-label">Receipt</label>
                                                                <input type="text" className="form-control" name="Receipt" id="Receipt" value={editDatas?.Receipt} onChange={onChange} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="Testing" className="form-label">Testing</label>
                                                                <input type="text" className="form-control" name="Testing" id="Testing" value={editDatas?.Testing} onChange={onChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label htmlFor="Nozzle1" className="form-label">Nozzle 1</label>
                                                                <input type="text" className="form-control" name="Nozzle1" id="Nozzle1" value={editDatas?.Nozzle1} onChange={onChange} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="Nozzle2" className="form-label">Nozzle 2</label>
                                                                <input type="text" className="form-control" name="Nozzle2" id="Nozzle2" value={editDatas?.Nozzle2} onChange={onChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="Remark" className="form-label">Remark</label>
                                                        <input type="text" className="form-control" name="Remark" id="Remark" value={editDatas?.Remark} onChange={onChange} />
                                                    </div>
                                                    <button type="submit" className="btn btn-dark">Submit</button>
                                                </form>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-outline-dark" title='Delete' onClick={() => handleDelete(myData.id)}><i className="bi bi-trash3-fill"></i></button>
                                    </td>
                                </tr>
                            )
                        }) : 
                        <tr>
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div> : ""
  )
}

export default MeterReadingDiesel
