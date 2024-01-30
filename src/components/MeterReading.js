import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { backendApiUrl } from '../config/config';

const MeterReading = (props) => {

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

  const ttData = {
    ttDate : "",
    invoiceNo : "",
    ttNo : "",
    ttLoadMS : "",
    ttLoadHSD : "",
    transporter : "",
    driverName : "",
    MPB : "",
    MOB : "",
    ttLoadingDate : "",
    ttLoadingTime : "",
    ttUnloadingDate : "",
    ttUnloadingTime : "",
    invoiceMS : "",
    invoiceMSRemark : "",
    invoiceHSD : "",
    invoiceHSDRemark : "",
    sampleMSHydro : "",
    sampleMSTemp : "",
    sampleMS : "", 
    sampleHSDHydro : "",
    sampleHSDTemp : "",
    sampleHSD : "",
    tlbrMSDip : "",
    tlbrMSStock : "",
    tlbrMSDU1 : "",
    tlbrMSDU2 : "",
    tlbrHSDDip : "",
    tlbrHSDStock : "",
    tlbrHSDDU1 : "",
    tlbrHSDDU2 : "",
    tlarMSDip : "",
    tlarMSStock : "",
    tlarMSDU1 : "",
    tlarMSDU2 : "",
    tlarHSDDip : "",
    tlarHSDStock : "",
    tlarHSDDU1 : "",
    tlarHSDDU2 : "",
    ptlarMSStock : "",
    ptlarMSDU1 : "",
    ptlarMSDU2 : "",
    ptlarHSDStock : "",
    ptlarHSDDU1 : "",
    ptlarHSDDU2 : "",
    saleTestingMS : "",
    saleTestingHSD : "",
    resultDensityMS : "",
    resultDensityHSD : "",
    resultStockMS : "",
    resultStockHSD : "",
    ttSalesMSDU1Sale : "",
    ttSalesHSDDU1Sale : "",
    ttSalesMSDU2Sale : "",
    ttSalesHSDDU2Sale : "",
    ttSalesMStotalSale : "",
    ttSalesHSDtotalSale : "",
    ttSalesMSSale : "",
    ttSalesHSDSale : "",
    ttSalesMSStock : "",
    ttSalesHSDStock : "",
    remark : "",
  }

  const [credentials, setCredentials] = useState([data]);
  const [myDatas, setMyDatas] = useState([]);
  const [isError, setIsError] = useState([]);
  const [searchCredentials, setSearchCredentials] = useState([searchData]);
  const [editDatas, setEditDatas] = useState([]);
  const [radio, setRadio] = useState([]);
  const [ttCredentials, setTTCredentials] = useState([ttData]);

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value});
    setSearchCredentials({...searchCredentials, [e.target.name] : e.target.value});
    setEditDatas({...editDatas, [e.target.name] : e.target.value});
    setTTCredentials({...ttCredentials, [e.target.name] : e.target.value});
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
    const response1 = await axios.post(`${backendApiUrl}meter/add-meterReading`, updatedCredentials, {
        headers : {
            'auth-token' : sessionStorage.getItem('token')
        }
    });
    const ttLoadMSAsFloat = parseFloat(ttCredentials.ttLoadMS)
    const ttLoadHSDAsFloat = parseFloat(ttCredentials.ttLoadHSD)
    const MPBAsFloat = parseFloat(ttCredentials.MPB)
    const MOBAsFloat = parseFloat(ttCredentials.MOB)
    const invoiceMSAsFloat = parseFloat(ttCredentials.invoiceMS)
    const invoiceHSDAsFloat = parseFloat(ttCredentials.invoiceHSD)
    const sampleMSHydroAsFloat = parseFloat(ttCredentials.sampleMSHydro)
    const sampleMSTempAsFloat = parseFloat(ttCredentials.sampleMSTemp)
    const sampleMSAsFloat = parseFloat(ttCredentials.sampleMS)
    const sampleHSDHydroAsFloat = parseFloat(ttCredentials.sampleHSDHydro)
    const sampleHSDTempAsFloat = parseFloat(ttCredentials.sampleHSDTemp)
    const sampleHSDAsFloat = parseFloat(ttCredentials.sampleHSD)
    const tlbrMSDipAsFloat = parseFloat(ttCredentials.tlbrMSDip)
    const tlbrMSStockAsFloat = parseFloat(ttCredentials.tlbrMSStock)
    const tlbrMSDU1AsFloat = parseFloat(ttCredentials.tlbrMSDU1)
    const tlbrMSDU2AsFloat = parseFloat(ttCredentials.tlbrMSDU2)
    const tlbrHSDDipAsFloat = parseFloat(ttCredentials.tlbrHSDDip)
    const tlbrHSDStockAsFloat = parseFloat(ttCredentials.tlbrHSDStock)
    const tlbrHSDDU1AsFloat = parseFloat(ttCredentials.tlbrHSDDU1)
    const tlbrHSDDU2AsFloat = parseFloat(ttCredentials.tlbrHSDDU2)
    const tlarMSDipAsFloat = parseFloat(ttCredentials.tlarMSDip)
    const tlarMSStockAsFloat = parseFloat(ttCredentials.tlarMSStock)
    const tlarMSDU1AsFloat = parseFloat(ttCredentials.tlarMSDU1)
    const tlarMSDU2AsFloat = parseFloat(ttCredentials.tlarMSDU2)
    const tlarHSDDipAsFloat = parseFloat(ttCredentials.tlarHSDDip)
    const tlarHSDStockAsFloat = parseFloat(ttCredentials.tlarHSDStock)
    const tlarHSDDU1AsFloat = parseFloat(ttCredentials.tlarHSDDU1)
    const tlarHSDDU2AsFloat = parseFloat(ttCredentials.tlarHSDDU2)
    const ptlarMSStockAsFloat = parseFloat(ttCredentials.ptlarMSStock)
    const ptlarMSDU1AsFloat = parseFloat(ttCredentials.ptlarMSDU1)
    const ptlarMSDU2AsFloat = parseFloat(ttCredentials.ptlarMSDU2)
    const ptlarHSDStockAsFloat = parseFloat(ttCredentials.ptlarHSDStock)
    const ptlarHSDDU1AsFloat = parseFloat(ttCredentials.ptlarHSDDU1)
    const ptlarHSDDU2AsFloat = parseFloat(ttCredentials.ptlarHSDDU2)
    const saleTestingMSAsFloat = parseFloat(ttCredentials.saleTestingMS)
    const saleTestingHSDAsFloat = parseFloat(ttCredentials.saleTestingHSD)
    const resultDensityMSAsFloat = parseFloat(ttCredentials.resultDensityMS)
    const resultDensityHSDAsFloat = parseFloat(ttCredentials.resultDensityHSD)
    const resultStockMSAsFloat = parseFloat(ttCredentials.resultStockMS)
    const resultStockHSDAsFloat = parseFloat(ttCredentials.resultStockHSD)
    const ttSalesMSDU1SaleAsFloat = parseFloat(ttCredentials.ttSalesMSDU1Sale)
    const ttSalesHSDDU1SaleAsFloat = parseFloat(ttCredentials.ttSalesHSDDU1Sale)
    const ttSalesMSDU2SaleAsFloat = parseFloat(ttCredentials.ttSalesMSDU2Sale)
    const ttSalesHSDDU2SaleAsFloat = parseFloat(ttCredentials.ttSalesHSDDU2Sale)
    const ttSalesMStotalSaleAsFloat = parseFloat(ttCredentials.ttSalesMStotalSale)
    const ttSalesHSDtotalSaleAsFloat = parseFloat(ttCredentials.ttSalesHSDtotalSale)
    const ttSalesMSSaleAsFloat = parseFloat(ttCredentials.ttSalesMSSale)
    const ttSalesHSDSaleAsFloat = parseFloat(ttCredentials.ttSalesHSDSale)
    const ttSalesMSStockAsFloat = parseFloat(ttCredentials.ttSalesMSStock)
    const ttSalesHSDStockAsFloat = parseFloat(ttCredentials.ttSalesHSDStock)
    const updatedTTCredentials = {...ttCredentials, ttLoadMS: ttLoadMSAsFloat, ttLoadHSD: ttLoadHSDAsFloat, MPB: MPBAsFloat, MOB: MOBAsFloat, invoiceMS: invoiceMSAsFloat, invoiceHSD: invoiceHSDAsFloat, sampleMSHydro: sampleMSHydroAsFloat, sampleMSTemp: sampleMSTempAsFloat, sampleMS: sampleMSAsFloat, sampleHSDHydro: sampleHSDHydroAsFloat, sampleHSDTemp: sampleHSDTempAsFloat, sampleHSD: sampleHSDAsFloat, tlbrMSDip: tlbrMSDipAsFloat, tlbrMSStock: tlbrMSStockAsFloat, tlbrMSDU1: tlbrMSDU1AsFloat, tlbrMSDU2: tlbrMSDU2AsFloat, tlbrHSDDip: tlbrHSDDipAsFloat, tlbrHSDStock: tlbrHSDStockAsFloat, tlbrHSDDU1: tlbrHSDDU1AsFloat, tlbrHSDDU2: tlbrHSDDU2AsFloat, tlarMSDip: tlarMSDipAsFloat, tlarMSStock: tlarMSStockAsFloat, tlarMSDU1: tlarMSDU1AsFloat, tlarMSDU2: tlarMSDU2AsFloat, tlarHSDDip: tlarHSDDipAsFloat, tlarHSDStock: tlarHSDStockAsFloat, tlarHSDDU1: tlarHSDDU1AsFloat, tlarHSDDU2: tlarHSDDU2AsFloat, ptlarMSStock: ptlarMSStockAsFloat, ptlarMSDU1: ptlarMSDU1AsFloat, ptlarMSDU2: ptlarMSDU2AsFloat, ptlarHSDStock: ptlarHSDStockAsFloat, ptlarHSDDU1: ptlarHSDDU1AsFloat, ptlarHSDDU2: ptlarHSDDU2AsFloat, saleTestingMS: saleTestingMSAsFloat, saleTestingHSD: saleTestingHSDAsFloat, resultDensityMS: resultDensityMSAsFloat, resultDensityHSD: resultDensityHSDAsFloat, resultStockMS: resultStockMSAsFloat, resultStockHSD: resultStockHSDAsFloat, ttSalesMSDU1Sale: ttSalesMSDU1SaleAsFloat, ttSalesHSDDU1Sale: ttSalesHSDDU1SaleAsFloat, ttSalesMSDU2Sale: ttSalesMSDU2SaleAsFloat, ttSalesHSDDU2Sale: ttSalesHSDDU2SaleAsFloat, ttSalesMStotalSale: ttSalesMStotalSaleAsFloat, ttSalesHSDtotalSale: ttSalesHSDtotalSaleAsFloat, ttSalesMSSale: ttSalesMSSaleAsFloat, ttSalesHSDSale: ttSalesHSDSaleAsFloat, ttSalesMSStock: ttSalesMSStockAsFloat, ttSalesHSDStock: ttSalesHSDStockAsFloat}
    if(radio == 'Yes') {
        const response2 = await axios.post(`${backendApiUrl}tt/add-tt`, updatedTTCredentials, {
            headers : {
                'auth-token' : sessionStorage.getItem('token')
            }
        });
        if(response1.data && response2.data) {
            alert("Added Successfully...");
            window.location.reload();
            props.showAlert("Added Successfully...", "success");
        }
        console.log(response1.data);
        console.log(response2.data);
    }
    if(radio != 'Yes'){
        if(response1.data) {
            alert("Added Successfully...");
            window.location.reload();
            props.showAlert("Added Successfully...", "success");
        }
        console.log(response1.data);
    }
  }
  
  const handleSearchSubmit = async (e) => {
    axios.get(`${backendApiUrl}meter/get-meterReading?fromDate=${searchCredentials.fromDate}&toDate=${searchCredentials.toDate}`)
    .then((res) => {
        setMyDatas(res.data.data);
    }).catch((error) => {
        setIsError(error.message);
    })
  }

  const handleEditData = async (e) => {
    axios.get(`${backendApiUrl}meter/get-meterReading?id=${e}`)
    .then((res) => {
        setEditDatas(res.data.data[0]);
    }).catch((error) => {
        setIsError(error.message);
    })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const DensityAsFloat = parseFloat(editDatas.Density)
    const DipAsFloat = parseFloat(editDatas.Dip)
    const WaterDipAsFloat = parseFloat(editDatas.WaterDip)
    const StockAsFloat = parseFloat(editDatas.Stock)
    const ReceiptAsFloat = parseFloat(editDatas.Receipt)
    const TestingAsFloat = parseFloat(editDatas.Testing)
    const Nozzle1AsFloat = parseFloat(editDatas.Nozzle1)
    const Nozzle2AsFloat = parseFloat(editDatas.Nozzle2)
    const updatedCredentials = {...editDatas, Density: DensityAsFloat, Dip: DipAsFloat, WaterDip: WaterDipAsFloat, Stock: StockAsFloat, Receipt: ReceiptAsFloat, Testing: TestingAsFloat, Nozzle1: Nozzle1AsFloat, Nozzle2: Nozzle2AsFloat}
    const response = await axios.put(`${backendApiUrl}meter/edit-meterReading`, updatedCredentials);
    if(response.data) {
        alert("Updated Successfully...");
        window.location.reload();
        props.showAlert("Updated Successfully...", "success");
    }
  }

  const handleDelete = async (e) => {
    axios.delete(`${backendApiUrl}meter/delete-meterReading?id=${e}`)
    .then(() => {
        axios.get(`${backendApiUrl}meter/get-meterReading`)
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
    let Dip = document.getElementById("Dip").value;
    axios.get(`${backendApiUrl}meter/get-stockFromDip?dip=${Dip}`)
    .then((res) => {
        // document.getElementById("Stock").value = res?.data?.data?.Stock
        let result = res?.data?.data?.Stock;
        credentials["Stock"] = parseFloat(result) || 0;
        credentials["Dip"] = parseFloat(Dip) || 0;
        setCredentials({...credentials, ["Stock"] : result, ["Dip"] : Dip})
    })
    .catch((error) => {
        setIsError(error.message);
    })
  }

  useEffect(() => {
    axios.get(`${backendApiUrl}meter/get-meterReading`)
    .then((res)=> {
        setMyDatas(res.data.data);
    })
    .catch((error)=> {
        setIsError(error.message);
    })
  }, [])

  function calculateResultDensity(sampleDensityId, invoiceDensityId, resultId) {
    let sampleDensity = document.getElementById(sampleDensityId).value;
    let invoiceDensity = document.getElementById(invoiceDensityId).value;

    let result = Number(sampleDensity) - Number(invoiceDensity);
    ttCredentials[resultId] = parseFloat(result) || 0;
    setTTCredentials({...ttCredentials, [resultId] : result})
  }

  function calculateResultStock(tlarStockId, tlbrStockId, ttLoadId, resultId) {
    let tlarStock = document.getElementById(tlarStockId).value; 
    let tlbrStock = document.getElementById(tlbrStockId).value;
    let ttLoad = document.getElementById(ttLoadId).value;

    let result = (Number(tlarStock) - (Number(tlbrStock) + Number(ttLoad)));
    ttCredentials[resultId] = parseFloat(result) || 0;
    setTTCredentials({...ttCredentials, [resultId] : result})
  }

  function calculateDUSale(tlarDUId, ptlarDUId, resultId) {
    let tlarDU = document.getElementById(tlarDUId).value;
    let ptlarDU = document.getElementById(ptlarDUId).value;

    let result = Number(tlarDU) - Number(ptlarDU);
    ttCredentials[resultId] = parseFloat(result) || 0;
    setTTCredentials({...ttCredentials, [resultId] : result})
  }

  function calculateTotalSale(du1Id, du2Id, resultId) {
    let du1 = parseFloat(ttCredentials[du1Id]) || 0;
    let du2 = parseFloat(ttCredentials[du2Id]) || 0;

    let result = Number(du1) + Number(du2);
    ttCredentials[resultId] = parseFloat(result) || 0;
    setTTCredentials({...ttCredentials, [resultId] : result})
  }

  function calculateSale(totalSaleId, testingId, resultId) {
    let totalSale = parseFloat(ttCredentials[totalSaleId]) || 0;
    let testing = document.getElementById(testingId).value;

    let result = Number(totalSale) - Number(testing);
    ttCredentials[resultId] = parseFloat(result) || 0;
    setTTCredentials({...ttCredentials, [resultId] : result})
  }

  function calculateStock(tlbrStockId, saleId, resultId) {
    let tlbrStock = document.getElementById(tlbrStockId).value;
    let sale = parseFloat(ttCredentials[saleId]) || 0;

    let result = Number(tlbrStock) + Number(sale);
    ttCredentials[resultId] = parseFloat(result) || 0;
    setTTCredentials({...ttCredentials, [resultId] : result})
  }

  return (
    sessionStorage.getItem('token') ? 
    <div className='MeterReading'>
        <h2 className='text-start mx-4'><u>MS</u></h2>
        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content" style={{ backgroundColor: "darkorange" }}>
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Daily MS Entry</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form className='text-start' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="Date" className="form-label">Date</label>
                                <input type="date" className="form-control" name="Date" id="Date" value={credentials.Date} onChange={onChange} required/>
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
                                <input type="text" className="form-control" name="Dip" id="Dip" value={credentials.Dip} onChange={onChange} onInput={() => {handleInput(), calculateTankSale()}}/>
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
                                    <input type="date" className="form-control" name="ttDate" id="ttDate" value={ttCredentials.ttDate} onChange={onChange} />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="invoiceNo" className="form-label">Invoice No.</label>
                                    <input type="text" className="form-control" name="invoiceNo" id="invoiceNo" value={ttCredentials.invoiceNo} onChange={onChange} />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="ttNo" className="form-label">TT No.</label>
                                    <input type="text" className="form-control" name="ttNo" id="ttNo" value={ttCredentials.ttNo} onChange={onChange} />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="" className="form-label">TT Load (L)</label> <br />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled />
                                        </div>
                                        <div className="col-md-7">
                                            <input type="text" className="form-control mx-2 my-2" name="ttLoadMS" id="ttLoadMS" value={ttCredentials.ttLoadMS} onChange={onChange} onInput={() => calculateResultStock("tlarMSStock", "tlbrMSStock", "ttLoadMS", "resultStockMS")} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ttLoadHSD" id="ttLoadHSD" value={ttCredentials.ttLoadHSD} onChange={onChange} onInput={() => calculateResultStock("tlarHSDStock", "tlbrHSDStock", "ttLoadHSD", "resultStockHSD")} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="transporter" className="form-label">Transporter</label>
                                    <input type="text" className="form-control" name="transporter" id="transporter" value={ttCredentials.transporter} onChange={onChange} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="driverName" className="form-label">Driver Name</label>
                                    <input type="text" className="form-control" name="driverName" id="driverName" value={ttCredentials.driverName} onChange={onChange} />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <label htmlFor="mpb" className="form-label">MPB</label>
                                    <input type="text" className="form-control" name="MPB" id="MPB" value={ttCredentials.MPB} onChange={onChange} />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="MOB" className="form-label">MOB</label>
                                    <input type="text" className="form-control" name="MOB" id="MOB" value={ttCredentials.MOB} onChange={onChange} />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <label htmlFor="ttLoadingDate" className="form-label">TT Loading Date</label>
                                    <input type="date" className="form-control" name="ttLoadingDate" id="ttLoadingDate" value={ttCredentials.ttLoadingDate} onChange={onChange} />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="ttLoadingTime" className="form-label">TT Loading Time</label>
                                    <input type="time" className="form-control" name="ttLoadingTime" id="ttLoadingTime" value={ttCredentials.ttLoadingTime} onChange={onChange} />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="ttUnloadingDate" className="form-label">TT Unloading Date</label>
                                    <input type="date" className="form-control" name="ttUnloadingDate" id="ttUnloadingDate" value={ttCredentials.ttUnloadingDate} onChange={onChange} />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="ttUnloadingTime" className="form-label">TT Unloading Time</label>
                                    <input type="time" className="form-control" name="ttUnloadingTime" id="ttUnloadingTime" value={ttCredentials.ttUnloadingTime} onChange={onChange} />
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
                                            <input type="text" className="form-control mx-2 my-2" name="invoiceMS" id="invoiceMS" placeholder='15c' value={ttCredentials.invoiceMS} onChange={onChange} onInput={() => calculateResultDensity("sampleMS", "invoiceMS", "resultDensityMS")} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="invoiceHSD" id="invoiceHSD" placeholder='15c' value={ttCredentials.invoiceHSD} onChange={onChange} onInput={() => calculateResultDensity("sampleHSD", "invoiceHSD", "resultDensityHSD")} />
                                        </div>
                                        <div className="col-md-4">
                                            <input type="text" className="form-control mx-2 my-2" name="invoiceMSRemark" id="invoiceMSRemark" placeholder='Remark' value={ttCredentials.invoiceMSRemark} onChange={onChange} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="invoiceHSDRemark" id="invoiceHSDRemark" placeholder='Remark' value={ttCredentials.invoiceHSDRemark} onChange={onChange} /> 
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
                                            <input type="text" className="form-control mx-2 my-2" name="sampleMSHydro" id="sampleMSHydro" placeholder='Hydro.' value={ttCredentials.sampleMSHydro} onChange={onChange} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="sampleHSDHydro" id="sampleHSDHydro" placeholder='Hydro.' value={ttCredentials.sampleHSDHydro} onChange={onChange} />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="sampleMSTemp" id="sampleMSTemp" placeholder='Temp.' value={ttCredentials.sampleMSTemp} onChange={onChange} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="sampleHSDTemp" id="sampleHSDTemp" placeholder='Temp.' value={ttCredentials.sampleHSDTemp} onChange={onChange} /> 
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="sampleMS" id="sampleMS" placeholder='15c' value={ttCredentials.sampleMS} onChange={onChange} onInput={() => calculateResultDensity("sampleMS", "invoiceMS", "resultDensityMS")} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="sampleHSD" id="sampleHSD" placeholder='15c' value={ttCredentials.sampleHSD} onChange={onChange} onInput={() => calculateResultDensity("sampleHSD", "invoiceHSD", "resultDensityHSD")} /> 
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
                                            <input type="text" className="form-control mx-2 my-2" name="tlbrMSDip" id="tlbrMSDip" value={ttCredentials.tlbrMSDip} onChange={onChange} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlbrHSDDip" id="tlbrHSDDip" value={ttCredentials.tlbrHSDDip} onChange={onChange} />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='STOCK' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlbrMSStock" id="tlbrMSStock" value={ttCredentials.tlbrMSStock} onChange={onChange} onInput={() => {calculateResultStock("tlarMSStock", "tlbrMSStock", "ttLoadMS", "resultStockMS"), calculateStock("tlbrMSStock", "ttSalesMSSale", "ttSalesMSStock")}} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlbrHSDStock" id="tlbrHSDStock" value={ttCredentials.tlbrHSDStock} onChange={onChange} onInput={() => {calculateResultStock("tlarHSDStock", "tlbrHSDStock", "ttLoadHSD", "resultStockHSD"), calculateStock("tlbrHSDStock", "ttSalesHSDSale", "ttSalesHSDStock")}} /> 
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU1' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlbrMSDU1" id="tlbrMSDU1" value={ttCredentials.tlbrMSDU1} onChange={onChange} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlbrHSDDU1" id="tlbrHSDDU1" value={ttCredentials.tlbrHSDDU1} onChange={onChange} /> 
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU2' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlbrMSDU2" id="tlbrMSDU2" value={ttCredentials.tlbrMSDU2} onChange={onChange} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlbrHSDDU2" id="tlbrHSDDU2" value={ttCredentials.tlbrHSDDU2} onChange={onChange} /> 
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
                                            <input type="text" className="form-control mx-2 my-2" name="resultDensityMS" id="resultDensityMS" value={ttCredentials.resultDensityMS} onChange={onChange} disabled/> 
                                            <input type="text" className="form-control mx-2 my-2" name="resultDensityHSD" id="resultDensityHSD" value={ttCredentials.resultDensityHSD} onChange={onChange} disabled/> 
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
                                            <input type="text" className="form-control mx-2 my-2" name="tlarMSDip" id="tlarMSDip" value={ttCredentials.tlarMSDip} onChange={onChange} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlarHSDDip" id="tlarHSDDip" value={ttCredentials.tlarHSDDip} onChange={onChange} />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='STOCK' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlarMSStock" id="tlarMSStock" value={ttCredentials.tlarMSStock} onChange={onChange} onInput={() => calculateResultStock("tlarMSStock", "tlbrMSStock", "ttLoadMS", "resultStockMS")} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlarHSDStock" id="tlarHSDStock" value={ttCredentials.tlarHSDStock} onChange={onChange} onInput={() => calculateResultStock("tlarHSDStock", "tlbrHSDStock", "ttLoadHSD", "resultStockHSD")} /> 
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU1' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlarMSDU1" id="tlarMSDU1" value={ttCredentials.tlarMSDU1} onChange={onChange} onInput={() => {calculateDUSale("tlarMSDU1", "ptlarMSDU1", "ttSalesMSDU1Sale"), calculateTotalSale("ttSalesMSDU1Sale", "ttSalesMSDU2Sale", "ttSalesMStotalSale"), calculateSale("ttSalesMStotalSale", "saleTestingMS", "ttSalesMSSale"), calculateStock("tlbrMSStock", "ttSalesMSSale", "ttSalesMSStock")}} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlarHSDDU1" id="tlarHSDDU1" value={ttCredentials.tlarHSDDU1} onChange={onChange} onInput={() => {calculateDUSale("tlarHSDDU1", "ptlarHSDDU1", "ttSalesHSDDU1Sale"), calculateTotalSale("ttSalesHSDDU1Sale", "ttSalesHSDDU2Sale", "ttSalesHSDtotalSale"), calculateSale("ttSalesHSDtotalSale", "saleTestingHSD", "ttSalesHSDSale"), calculateStock("tlbrHSDStock", "ttSalesHSDSale", "ttSalesHSDStock")}} /> 
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU2' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlarMSDU2" id="tlarMSDU2" value={ttCredentials.tlarMSDU2} onChange={onChange} onInput={() => {calculateDUSale("tlarMSDU2", "ptlarMSDU2", "ttSalesMSDU2Sale"), calculateTotalSale("ttSalesMSDU1Sale", "ttSalesMSDU2Sale", "ttSalesMStotalSale"), calculateSale("ttSalesMStotalSale", "saleTestingMS", "ttSalesMSSale"), calculateStock("tlbrMSStock", "ttSalesMSSale", "ttSalesMSStock")}} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="tlarHSDDU2" id="tlarHSDDU2" value={ttCredentials.tlarHSDDU2} onChange={onChange} onInput={() => {calculateDUSale("tlarHSDDU2", "ptlarHSDDU2", "ttSalesHSDDU2Sale"), calculateTotalSale("ttSalesHSDDU1Sale", "ttSalesHSDDU2Sale", "ttSalesHSDtotalSale"), calculateSale("ttSalesHSDtotalSale", "saleTestingHSD", "ttSalesHSDSale"), calculateStock("tlbrHSDStock", "ttSalesHSDSale", "ttSalesHSDStock")}} /> 
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
                                            <input type="text" className="form-control mx-2 my-2" name="resultStockMS" id="resultStockMS" value={ttCredentials.resultStockMS} onChange={onChange} disabled/> 
                                            <input type="text" className="form-control mx-2 my-2" name="resultStockHSD" id="resultStockHSD" value={ttCredentials.resultStockHSD} onChange={onChange} disabled/>
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
                                            <input type="text" className="form-control mx-2 my-2" name="ptlarMSStock" id="ptlarMSStock" value={ttCredentials.ptlarMSStock} onChange={onChange} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ptlarHSDStock" id="ptlarHSDStock" value={ttCredentials.ptlarHSDStock} onChange={onChange} /> 
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU1' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ptlarMSDU1" id="ptlarMSDU1" value={ttCredentials.ptlarMSDU1} onChange={onChange} onInput={() => {calculateDUSale("tlarMSDU1", "ptlarMSDU1", "ttSalesMSDU1Sale"), calculateTotalSale("ttSalesMSDU1Sale", "ttSalesMSDU2Sale", "ttSalesMStotalSale"), calculateSale("ttSalesMStotalSale", "saleTestingMS", "ttSalesMSSale"), calculateStock("tlbrMSStock", "ttSalesMSSale", "ttSalesMSStock")}} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ptlarHSDDU1" id="ptlarHSDDU1" value={ttCredentials.ptlarHSDDU1} onChange={onChange} onInput={() => {calculateDUSale("tlarHSDDU1", "ptlarHSDDU1", "ttSalesHSDDU1Sale"), calculateTotalSale("ttSalesHSDDU1Sale", "ttSalesHSDDU2Sale", "ttSalesHSDtotalSale"), calculateSale("ttSalesHSDtotalSale", "saleTestingHSD", "ttSalesHSDSale"), calculateStock("tlbrHSDStock", "ttSalesHSDSale", "ttSalesHSDStock")}} /> 
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU2' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ptlarMSDU2" id="ptlarMSDU2" value={ttCredentials.ptlarMSDU2} onChange={onChange} onInput={() => {calculateDUSale("tlarMSDU2", "ptlarMSDU2", "ttSalesMSDU2Sale"), calculateTotalSale("ttSalesMSDU1Sale", "ttSalesMSDU2Sale", "ttSalesMStotalSale"), calculateSale("ttSalesMStotalSale", "saleTestingMS", "ttSalesMSSale"), calculateStock("tlbrMSStock", "ttSalesMSSale", "ttSalesMSStock")}} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ptlarHSDDU2" id="ptlarHSDDU2" value={ttCredentials.ptlarHSDDU2} onChange={onChange} onInput={() => {calculateDUSale("tlarHSDDU2", "ptlarHSDDU2", "ttSalesHSDDU2Sale"), calculateTotalSale("ttSalesHSDDU1Sale", "ttSalesHSDDU2Sale", "ttSalesHSDtotalSale"), calculateSale("ttSalesHSDtotalSale", "saleTestingHSD", "ttSalesHSDSale"), calculateStock("tlbrHSDStock", "ttSalesHSDSale", "ttSalesHSDStock")}} /> 
                                        </div>
                                        <label htmlFor="" className="form-label"><u>SALE TESTING</u></label> <br />
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="saleTestingMS" id="saleTestingMS" value={ttCredentials.saleTestingMS} onChange={onChange} onInput={() => {calculateSale("ttSalesMStotalSale", "saleTestingMS", "ttSalesMSSale"), calculateStock("tlbrMSStock", "ttSalesMSSale", "ttSalesMSStock")}} /> 
                                            <input type="text" className="form-control mx-2 my-2" name="saleTestingHSD" id="saleTestingHSD" value={ttCredentials.saleTestingHSD} onChange={onChange} onInput={() => {calculateSale("ttSalesHSDtotalSale", "saleTestingHSD", "ttSalesHSDSale"), calculateStock("tlbrHSDStock", "ttSalesHSDSale", "ttSalesHSDStock")}} />
                                        </div>
                                    </div>                                    
                                </div>
                                <div className="col-md-1">
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="" className="form-label"><u>TT SALES REPORT</u></label> <br />
                                    <div className="row">
                                        <div className="col-md-5">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='PRODUCT' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU1 SALE' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU2 SALE' disabled />
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='TOTAL SALE' disabled />
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='SALE' disabled />
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='STOCK' disabled />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ttSalesMSDU1Sale" id="ttSalesMSDU1Sale" value={ttCredentials.ttSalesMSDU1Sale} onChange={onChange} disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ttSalesMSDU2Sale" id="ttSalesMSDU2Sale" value={ttCredentials.ttSalesMSDU2Sale} onChange={onChange} disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ttSalesMStotalSale" id="ttSalesMStotalSale" value={ttCredentials.ttSalesMStotalSale} onChange={onChange} disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ttSalesMSSale" id="ttSalesMSSale" value={ttCredentials.ttSalesMSSale} onChange={onChange} disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ttSalesMSStock" id="ttSalesMSStock" value={ttCredentials.ttSalesMSStock} onChange={onChange} disabled /> 
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ttSalesHSDDU1Sale" id="ttSalesHSDDU1Sale" value={ttCredentials.ttSalesHSDDU1Sale} onChange={onChange} disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ttSalesHSDDU2Sale" id="ttSalesHSDDU2Sale" value={ttCredentials.ttSalesHSDDU2Sale} onChange={onChange} disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ttSalesHSDtotalSale" id="ttSalesHSDtotalSale" value={ttCredentials.ttSalesHSDtotalSale} onChange={onChange} disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ttSalesHSDSale" id="ttSalesHSDSale" value={ttCredentials.ttSalesHSDSale} onChange={onChange} disabled /> 
                                            <input type="text" className="form-control mx-2 my-2" name="ttSalesHSDStock" id="ttSalesHSDStock" value={ttCredentials.ttSalesHSDStock} onChange={onChange} disabled /> 
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <label htmlFor="" className="form-label">Remark</label>
                                            <input type="text" className="form-control" name="remark" id="remark" value={ttCredentials.remark} onChange={onChange} />
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
                            <input type="date" className="form-control" name="fromDate" id="fromDate" value={searchCredentials.fromDate} onChange={onChange} />
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="toDate" className="form-label"><u>To Date</u></label>
                            <input type="date" className="form-control" name="toDate" id="toDate" value={searchCredentials.toDate} onChange={onChange} />
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
                                                <div className="modal-content" style={{ backgroundColor: "darkorange" }}>
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

export default MeterReading
