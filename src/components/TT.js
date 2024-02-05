import React, { useEffect, useState } from 'react'
import { backendApiUrl } from '../config/config'
import axios from 'axios';

const TT = (props) => {

    const searchData = {
        fromDate : "",
        toDate : ""
    }

    const [myDatas, setMyDatas] = useState([]);
    const [isError, setIsError] = useState([]);
    const [editDatas, setEditDatas] = useState([]);
    const [searchCredentials, setSearchCredentials] = useState([searchData]);

    const onChange = (e) => {
        setEditDatas({...editDatas, [e.target.name] : e.target.value});
        setSearchCredentials({...searchCredentials, [e.target.name] : e.target.value});
    }

    const handleEditData = async (e) => {
        axios.get(`${backendApiUrl}tt/get-TT?id=${e}`)
        .then((res) => {
            setEditDatas(res.data.data[0]);
        }).catch((error) => {
            setIsError(error.message);
        })
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const ttLoadMSAsFloat = parseFloat(editDatas.ttLoadMS)
        const ttLoadHSDAsFloat = parseFloat(editDatas.ttLoadHSD)
        const MPBAsFloat = parseFloat(editDatas.MPB)
        const MOBAsFloat = parseFloat(editDatas.MOB)
        const invoiceMSAsFloat = parseFloat(editDatas.invoiceMS)
        const invoiceHSDAsFloat = parseFloat(editDatas.invoiceHSD)
        const sampleMSHydroAsFloat = parseFloat(editDatas.sampleMSHydro)
        const sampleMSTempAsFloat = parseFloat(editDatas.sampleMSTemp)
        const sampleMSAsFloat = parseFloat(editDatas.sampleMS)
        const sampleHSDHydroAsFloat = parseFloat(editDatas.sampleHSDHydro)
        const sampleHSDTempAsFloat = parseFloat(editDatas.sampleHSDTemp)
        const sampleHSDAsFloat = parseFloat(editDatas.sampleHSD)
        const tlbrMSDipAsFloat = parseFloat(editDatas.tlbrMSDip)
        const tlbrMSStockAsFloat = parseFloat(editDatas.tlbrMSStock)
        const tlbrMSDU1AsFloat = parseFloat(editDatas.tlbrMSDU1)
        const tlbrMSDU2AsFloat = parseFloat(editDatas.tlbrMSDU2)
        const tlbrHSDDipAsFloat = parseFloat(editDatas.tlbrHSDDip)
        const tlbrHSDStockAsFloat = parseFloat(editDatas.tlbrHSDStock)
        const tlbrHSDDU1AsFloat = parseFloat(editDatas.tlbrHSDDU1)
        const tlbrHSDDU2AsFloat = parseFloat(editDatas.tlbrHSDDU2)
        const tlarMSDipAsFloat = parseFloat(editDatas.tlarMSDip)
        const tlarMSStockAsFloat = parseFloat(editDatas.tlarMSStock)
        const tlarMSDU1AsFloat = parseFloat(editDatas.tlarMSDU1)
        const tlarMSDU2AsFloat = parseFloat(editDatas.tlarMSDU2)
        const tlarHSDDipAsFloat = parseFloat(editDatas.tlarHSDDip)
        const tlarHSDStockAsFloat = parseFloat(editDatas.tlarHSDStock)
        const tlarHSDDU1AsFloat = parseFloat(editDatas.tlarHSDDU1)
        const tlarHSDDU2AsFloat = parseFloat(editDatas.tlarHSDDU2)
        const ptlarMSStockAsFloat = parseFloat(editDatas.ptlarMSStock)
        const ptlarMSDU1AsFloat = parseFloat(editDatas.ptlarMSDU1)
        const ptlarMSDU2AsFloat = parseFloat(editDatas.ptlarMSDU2)
        const ptlarHSDStockAsFloat = parseFloat(editDatas.ptlarHSDStock)
        const ptlarHSDDU1AsFloat = parseFloat(editDatas.ptlarHSDDU1)
        const ptlarHSDDU2AsFloat = parseFloat(editDatas.ptlarHSDDU2)
        const saleTestingMSAsFloat = parseFloat(editDatas.saleTestingMS)
        const saleTestingHSDAsFloat = parseFloat(editDatas.saleTestingHSD)
        const resultDensityMSAsFloat = parseFloat(editDatas.resultDensityMS)
        const resultDensityHSDAsFloat = parseFloat(editDatas.resultDensityHSD)
        const resultStockMSAsFloat = parseFloat(editDatas.resultStockMS)
        const resultStockHSDAsFloat = parseFloat(editDatas.resultStockHSD)
        const ttSalesMSDU1SaleAsFloat = parseFloat(editDatas.ttSalesMSDU1Sale)
        const ttSalesHSDDU1SaleAsFloat = parseFloat(editDatas.ttSalesHSDDU1Sale)
        const ttSalesMSDU2SaleAsFloat = parseFloat(editDatas.ttSalesMSDU2Sale)
        const ttSalesHSDDU2SaleAsFloat = parseFloat(editDatas.ttSalesHSDDU2Sale)
        const ttSalesMStotalSaleAsFloat = parseFloat(editDatas.ttSalesMStotalSale)
        const ttSalesHSDtotalSaleAsFloat = parseFloat(editDatas.ttSalesHSDtotalSale)
        const ttSalesMSSaleAsFloat = parseFloat(editDatas.ttSalesMSSale)
        const ttSalesHSDSaleAsFloat = parseFloat(editDatas.ttSalesHSDSale)
        const ttSalesMSStockAsFloat = parseFloat(editDatas.ttSalesMSStock)
        const ttSalesHSDStockAsFloat = parseFloat(editDatas.ttSalesHSDStock)
        const updatedTTCredentials = {...editDatas, ttLoadMS: ttLoadMSAsFloat, ttLoadHSD: ttLoadHSDAsFloat, MPB: MPBAsFloat, MOB: MOBAsFloat, invoiceMS: invoiceMSAsFloat, invoiceHSD: invoiceHSDAsFloat, sampleMSHydro: sampleMSHydroAsFloat, sampleMSTemp: sampleMSTempAsFloat, sampleMS: sampleMSAsFloat, sampleHSDHydro: sampleHSDHydroAsFloat, sampleHSDTemp: sampleHSDTempAsFloat, sampleHSD: sampleHSDAsFloat, tlbrMSDip: tlbrMSDipAsFloat, tlbrMSStock: tlbrMSStockAsFloat, tlbrMSDU1: tlbrMSDU1AsFloat, tlbrMSDU2: tlbrMSDU2AsFloat, tlbrHSDDip: tlbrHSDDipAsFloat, tlbrHSDStock: tlbrHSDStockAsFloat, tlbrHSDDU1: tlbrHSDDU1AsFloat, tlbrHSDDU2: tlbrHSDDU2AsFloat, tlarMSDip: tlarMSDipAsFloat, tlarMSStock: tlarMSStockAsFloat, tlarMSDU1: tlarMSDU1AsFloat, tlarMSDU2: tlarMSDU2AsFloat, tlarHSDDip: tlarHSDDipAsFloat, tlarHSDStock: tlarHSDStockAsFloat, tlarHSDDU1: tlarHSDDU1AsFloat, tlarHSDDU2: tlarHSDDU2AsFloat, ptlarMSStock: ptlarMSStockAsFloat, ptlarMSDU1: ptlarMSDU1AsFloat, ptlarMSDU2: ptlarMSDU2AsFloat, ptlarHSDStock: ptlarHSDStockAsFloat, ptlarHSDDU1: ptlarHSDDU1AsFloat, ptlarHSDDU2: ptlarHSDDU2AsFloat, saleTestingMS: saleTestingMSAsFloat, saleTestingHSD: saleTestingHSDAsFloat, resultDensityMS: resultDensityMSAsFloat, resultDensityHSD: resultDensityHSDAsFloat, resultStockMS: resultStockMSAsFloat, resultStockHSD: resultStockHSDAsFloat, ttSalesMSDU1Sale: ttSalesMSDU1SaleAsFloat, ttSalesHSDDU1Sale: ttSalesHSDDU1SaleAsFloat, ttSalesMSDU2Sale: ttSalesMSDU2SaleAsFloat, ttSalesHSDDU2Sale: ttSalesHSDDU2SaleAsFloat, ttSalesMStotalSale: ttSalesMStotalSaleAsFloat, ttSalesHSDtotalSale: ttSalesHSDtotalSaleAsFloat, ttSalesMSSale: ttSalesMSSaleAsFloat, ttSalesHSDSale: ttSalesHSDSaleAsFloat, ttSalesMSStock: ttSalesMSStockAsFloat, ttSalesHSDStock: ttSalesHSDStockAsFloat}
        const response = await axios.put(`${backendApiUrl}tt/edit-tt`, updatedTTCredentials);
        if(response.data) {
            alert("Updated Successfully...");
            window.location.reload();
            props.showAlert("Updated Successfully...", "success");
        }
    }

    const handleDelete = async (e) => {
        axios.delete(`${backendApiUrl}tt/delete-tt?id=${e}`)
        .then(() => {
            axios.get(`${backendApiUrl}tt/get-tt`)
            .then((res)=> {
                setMyDatas(res.data.data);
            })
            .catch((error)=> {
                setIsError(error.message);
            })
        })
        props.showAlert("Deleted Successfully...", "success");
    }

    const handleSearchSubmit = async (e) => {
        axios.get(`${backendApiUrl}tt/get-tt?fromDate=${searchCredentials.fromDate}&toDate=${searchCredentials.toDate}`)
        .then((res) => {
            setMyDatas(res.data.data);
        }).catch((error) => {
            setIsError(error.message);
        })
    }

    useEffect(() => {
        axios.get(`${backendApiUrl}tt/get-tt`)
        .then((res) => {
            setMyDatas(res.data.data);
        })
        .catch((error) => {
            setIsError(error.message);
        })
    }, []);

    function calculateResultDensity(sampleDensityId, invoiceDensityId, resultId) {
        let sampleDensity = document.getElementById(sampleDensityId).value;
        let invoiceDensity = document.getElementById(invoiceDensityId).value;

        let result = Number(sampleDensity) - Number(invoiceDensity);
        editDatas[resultId] = parseFloat(result) || 0;
        setEditDatas({...editDatas, [resultId] : result})
    }

    function calculateResultStock(tlarStockId, tlbrStockId, ttLoadId, resultId) {
        let tlarStock = document.getElementById(tlarStockId).value; 
        let tlbrStock = document.getElementById(tlbrStockId).value;
        let ttLoad = document.getElementById(ttLoadId).value;

        let result = (Number(tlarStock) - (Number(tlbrStock) + Number(ttLoad)));
        editDatas[resultId] = parseFloat(result) || 0;
        setEditDatas({...editDatas, [resultId] : result})
    }

    function calculateDUSale(tlarDUId, ptlarDUId, resultId) {
        let tlarDU = document.getElementById(tlarDUId).value;
        let ptlarDU = document.getElementById(ptlarDUId).value;

        let result = Number(tlarDU) - Number(ptlarDU);
        editDatas[resultId] = parseFloat(result) || 0;
        setEditDatas({...editDatas, [resultId] : result})
    }

    function calculateTotalSale(du1Id, du2Id, resultId) {
        let du1 = parseFloat(editDatas[du1Id]) || 0;
        let du2 = parseFloat(editDatas[du2Id]) || 0;

        let result = Number(du1) + Number(du2);
        editDatas[resultId] = parseFloat(result) || 0;
        setEditDatas({...editDatas, [resultId] : result})
    }

    function calculateSale(totalSaleId, testingId, resultId) {
        let totalSale = parseFloat(editDatas[totalSaleId]) || 0;
        let testing = document.getElementById(testingId).value;

        let result = Number(totalSale) - Number(testing);
        editDatas[resultId] = parseFloat(result) || 0;
        setEditDatas({...editDatas, [resultId] : result})
    }

    function calculateStock(tlbrStockId, saleId, resultId) {
        let tlbrStock = document.getElementById(tlbrStockId).value;
        let sale = parseFloat(editDatas[saleId]) || 0;

        let result = Number(tlbrStock) + Number(sale);
        editDatas[resultId] = parseFloat(result) || 0;
        setEditDatas({...editDatas, [resultId] : result})
    }

  return (
    sessionStorage.getItem('token') ?
    <div className='MeterReading'>
        <h2 className='text-start mx-4'><u>TT Report</u></h2>

        <div className="container-fluid">
            <div className="row my-4">
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
                            <input className="btn btn-outline-dark my-2" type="submit" value="Search" onClick={handleSearchSubmit} />
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
                        <th scope="col" style={{color: "black"}}>S.no</th>
                        <th scope="col" style={{color: "black"}}>TT Date</th>
                        <th scope="col" style={{color: "black"}}>Invoice No.</th>
                        <th scope="col" style={{color: "black"}}>TT No.</th>
                        <th scope="col" style={{color: "black"}}>Transporter</th>
                        <th scope="col" style={{color: "black"}}>Driver Name</th>
                        <th scope="col" style={{color: "darkorange"}}>TT Load (MS)</th>
                        <th scope="col" style={{color: "navy"}}>TT Load (HSD)</th>
                        <th scope="col" style={{color: "black"}}>MPB</th>
                        <th scope="col" style={{color: "black"}}>MOB</th>
                        <th scope="col" style={{color: "black"}}>TT Loading Date / Time</th>
                        <th scope="col" style={{color: "black"}}>TT Unloading Date / Time</th>
                        <th scope="col" style={{color: "darkorange"}}>Invoice Density MS</th>
                        <th scope="col" style={{color: "navy"}}>Invoice Density HSD</th>
                        <th scope="col" style={{color: "darkorange"}}>Sample Density MS (Hydro.)</th>
                        <th scope="col" style={{color: "darkorange"}}>Sample Density MS (Temp.)</th>
                        <th scope="col" style={{color: "darkorange"}}>Sample Density MS (15c)</th>
                        <th scope="col" style={{color: "navy"}}>Sample Density HSD (Hydro.)</th>
                        <th scope="col" style={{color: "navy"}}>Sample Density HSD (Temp.)</th>
                        <th scope="col" style={{color: "navy"}}>Sample Density HSD (15c)</th>
                        <th scope="col" style={{color: "darkorange"}}>TLBR MS (Dip)</th>
                        <th scope="col" style={{color: "darkorange"}}>TLBR MS (Stock)</th>
                        <th scope="col" style={{color: "darkorange"}}>TLBR MS (DU1)</th>
                        <th scope="col" style={{color: "darkorange"}}>TLBR MS (DU2)</th>
                        <th scope="col" style={{color: "navy"}}>TLBR HSD (Dip)</th>
                        <th scope="col" style={{color: "navy"}}>TLBR HSD (Stock)</th>
                        <th scope="col" style={{color: "navy"}}>TLBR HSD (DU1)</th>
                        <th scope="col" style={{color: "navy"}}>TLBR HSD (DU2)</th>
                        <th scope="col" style={{color: "darkorange"}}>TLAR MS (Dip)</th>
                        <th scope="col" style={{color: "darkorange"}}>TLAR MS (Stock)</th>
                        <th scope="col" style={{color: "darkorange"}}>TLAR MS (DU1)</th>
                        <th scope="col" style={{color: "darkorange"}}>TLAR MS (DU2)</th>
                        <th scope="col" style={{color: "navy"}}>TLAR HSD (Dip)</th>
                        <th scope="col" style={{color: "navy"}}>TLAR HSD (Stock)</th>
                        <th scope="col" style={{color: "navy"}}>TLAR HSD (DU1)</th>
                        <th scope="col" style={{color: "navy"}}>TLAR HSD (DU2)</th>
                        <th scope="col" style={{color: "darkorange"}}>PTLAR MS (Stock)</th>
                        <th scope="col" style={{color: "darkorange"}}>PTLAR MS (DU1)</th>
                        <th scope="col" style={{color: "darkorange"}}>PTLAR MS (DU2)</th>
                        <th scope="col" style={{color: "navy"}}>PTLAR HSD (Stock)</th>
                        <th scope="col" style={{color: "navy"}}>PTLAR HSD (DU1)</th>
                        <th scope="col" style={{color: "navy"}}>PTLAR HSD (DU2)</th>
                        <th scope="col" style={{color: "darkorange"}}>Sale Testing MS</th>
                        <th scope="col" style={{color: "navy"}}>Sale Testing HSD</th>
                        <th scope="col" style={{color: "darkorange"}}>Gain/Loss Density MS</th>
                        <th scope="col" style={{color: "navy"}}>Gain/Loss Density HSD</th>
                        <th scope="col" style={{color: "darkorange"}}>Gain/Loss Stock MS</th>
                        <th scope="col" style={{color: "navy"}}>Gain/Loss Stock HSD</th>
                        <th scope="col" style={{color: "darkorange"}}>TTSR MS (DU1 Sale)</th>
                        <th scope="col" style={{color: "darkorange"}}>TTSR MS (DU2 Sale)</th>
                        <th scope="col" style={{color: "darkorange"}}>TTSR MS (Total Sale)</th>
                        <th scope="col" style={{color: "darkorange"}}>TTSR MS (Sale)</th>
                        <th scope="col" style={{color: "darkorange"}}>TTSR MS (Stock)</th>
                        <th scope="col" style={{color: "navy"}}>TTSR HSD (DU1 Sale)</th>
                        <th scope="col" style={{color: "navy"}}>TTSR HSD (DU2 Sale)</th>
                        <th scope="col" style={{color: "navy"}}>TTSR HSD (Total Sale)</th>
                        <th scope="col" style={{color: "navy"}}>TTSR HSD (Sale)</th>
                        <th scope="col" style={{color: "navy"}}>TTSR HSD (Stock)</th>
                        <th scope="col" style={{color: "black"}}>Remark</th>
                        <th scope="col" style={{color: "black"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myDatas.length > 0 ? myDatas.map((myData, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{myData.ttDate}</td>
                                    <td>{myData.invoiceNo}</td>
                                    <td>{myData.ttNo}</td>
                                    <td>{myData.transporter}</td>
                                    <td>{myData.driverName}</td>
                                    <td>{myData.ttLoadMS}</td>
                                    <td>{myData.ttLoadHSD}</td>
                                    <td>{myData.MPB}</td>
                                    <td>{myData.MOB}</td>
                                    <td>{myData.ttLoadingDate}<br />{myData.ttLoadingTime}</td>
                                    <td>{myData.ttUnloadingDate}<br />{myData.ttUnloadingTime}</td>
                                    <td>{myData.invoiceMS}<br />({myData.invoiceMSRemark})</td>
                                    <td>{myData.invoiceHSD}<br />({myData.invoiceHSDRemark})</td>
                                    <td>{myData.sampleMSHydro}</td>
                                    <td>{myData.sampleMSTemp}</td>
                                    <td>{myData.sampleMS}</td>
                                    <td>{myData.sampleHSDHydro}</td>
                                    <td>{myData.sampleHSDTemp}</td>
                                    <td>{myData.sampleHSD}</td>
                                    <td>{myData.tlbrMSDip}</td>
                                    <td>{myData.tlbrMSStock}</td>
                                    <td>{myData.tlbrMSDU1}</td>
                                    <td>{myData.tlbrMSDU2}</td>
                                    <td>{myData.tlbrHSDDip}</td>
                                    <td>{myData.tlbrHSDStock}</td>
                                    <td>{myData.tlbrHSDDU1}</td>
                                    <td>{myData.tlbrHSDDU2}</td>
                                    <td>{myData.tlarMSDip}</td>
                                    <td>{myData.tlarMSStock}</td>
                                    <td>{myData.tlarMSDU1}</td>
                                    <td>{myData.tlarMSDU2}</td>
                                    <td>{myData.tlarHSDDip}</td>
                                    <td>{myData.tlarHSDStock}</td>
                                    <td>{myData.tlarHSDDU1}</td>
                                    <td>{myData.tlarHSDDU2}</td>
                                    <td>{myData.ptlarMSStock}</td>
                                    <td>{myData.ptlarMSDU1}</td>
                                    <td>{myData.ptlarMSDU2}</td>
                                    <td>{myData.ptlarHSDStock}</td>
                                    <td>{myData.ptlarHSDDU1}</td>
                                    <td>{myData.ptlarHSDDU2}</td>
                                    <td>{myData.saleTestingMS}</td>
                                    <td>{myData.saleTestingHSD}</td>
                                    <td>{myData.resultDensityMS}</td>
                                    <td>{myData.resultDensityHSD}</td>
                                    <td>{myData.resultStockMS}</td>
                                    <td>{myData.resultStockHSD}</td>
                                    <td>{myData.ttSalesMSDU1Sale}</td>
                                    <td>{myData.ttSalesMSDU2Sale}</td>
                                    <td>{myData.ttSalesMStotalSale}</td>
                                    <td>{myData.ttSalesMSSale}</td>
                                    <td>{myData.ttSalesMSStock}</td>
                                    <td>{myData.ttSalesHSDDU1Sale}</td>
                                    <td>{myData.ttSalesHSDDU2Sale}</td>
                                    <td>{myData.ttSalesHSDtotalSale}</td>
                                    <td>{myData.ttSalesHSDSale}</td>
                                    <td>{myData.ttSalesHSDStock}</td>
                                    <td>{myData.remark}</td>
                                    <td>
                                        <button type="button" className="btn btn-outline-dark mx-1" data-bs-toggle="modal" data-bs-target="#editModal" title='Edit' onClick={() => handleEditData(myData.id)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <div key={myData.id} className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-xl">
                                                <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Tank Truck Loading</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                <form className="text-start" onSubmit={handleEditSubmit}>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label htmlFor="ttDate" className="form-label">TT Date</label>
                                                                <input type="date" className="form-control" name="ttDate" id="ttDate" value={editDatas?.ttDate} onChange={onChange} />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <label htmlFor="invoiceNo" className="form-label">Invoice No.</label>
                                                                <input type="text" className="form-control" name="invoiceNo" id="invoiceNo" value={editDatas?.invoiceNo} onChange={onChange} />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <label htmlFor="ttNo" className="form-label">TT No.</label>
                                                                <input type="text" className="form-control" name="ttNo" id="ttNo" value={editDatas?.ttNo} onChange={onChange} />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <label htmlFor="" className="form-label">TT Load (L)</label> <br />
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled />
                                                                    </div>
                                                                    <div className="col-md-7">
                                                                        <input type="text" className="form-control mx-2 my-2" name="ttLoadMS" id="ttLoadMS" value={editDatas?.ttLoadMS} onChange={onChange} onInput={() => calculateResultStock("tlarMSStock", "tlbrMSStock", "ttLoadMS", "resultStockMS")} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ttLoadHSD" id="ttLoadHSD" value={editDatas?.ttLoadHSD} onChange={onChange} onInput={() => calculateResultStock("tlarHSDStock", "tlbrHSDStock", "ttLoadHSD", "resultStockHSD")} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label htmlFor="transporter" className="form-label">Transporter</label>
                                                                <input type="text" className="form-control" name="transporter" id="transporter" value={editDatas?.transporter} onChange={onChange} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="driverName" className="form-label">Driver Name</label>
                                                                <input type="text" className="form-control" name="driverName" id="driverName" value={editDatas?.driverName} onChange={onChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label htmlFor="mpb" className="form-label">MPB</label>
                                                                <input type="text" className="form-control" name="MPB" id="MPB" value={editDatas?.MPB} onChange={onChange} />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <label htmlFor="MOB" className="form-label">MOB</label>
                                                                <input type="text" className="form-control" name="MOB" id="MOB" value={editDatas?.MOB} onChange={onChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label htmlFor="ttLoadingDate" className="form-label">TT Loading Date</label>
                                                                <input type="date" className="form-control" name="ttLoadingDate" id="ttLoadingDate" value={editDatas?.ttLoadingDate} onChange={onChange} />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <label htmlFor="ttLoadingTime" className="form-label">TT Loading Time</label>
                                                                <input type="time" className="form-control" name="ttLoadingTime" id="ttLoadingTime" value={editDatas?.ttLoadingTime} onChange={onChange} />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <label htmlFor="ttUnloadingDate" className="form-label">TT Unloading Date</label>
                                                                <input type="date" className="form-control" name="ttUnloadingDate" id="ttUnloadingDate" value={editDatas?.ttUnloadingDate} onChange={onChange} />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <label htmlFor="ttUnloadingTime" className="form-label">TT Unloading Time</label>
                                                                <input type="time" className="form-control" name="ttUnloadingTime" id="ttUnloadingTime" value={editDatas?.ttUnloadingTime} onChange={onChange} />
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
                                                                        <input type="text" className="form-control mx-2 my-2" name="invoiceMS" id="invoiceMS" placeholder='15c' value={editDatas?.invoiceMS} onChange={onChange} onInput={() => calculateResultDensity("sampleMS", "invoiceMS", "resultDensityMS")} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="invoiceHSD" id="invoiceHSD" placeholder='15c' value={editDatas?.invoiceHSD} onChange={onChange} onInput={() => calculateResultDensity("sampleHSD", "invoiceHSD", "resultDensityHSD")} />
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <input type="text" className="form-control mx-2 my-2" name="invoiceMSRemark" id="invoiceMSRemark" placeholder='Remark' value={editDatas?.invoiceMSRemark} onChange={onChange} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="invoiceHSDRemark" id="invoiceHSDRemark" placeholder='Remark' value={editDatas?.invoiceHSDRemark} onChange={onChange} /> 
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
                                                                        <input type="text" className="form-control mx-2 my-2" name="sampleMSHydro" id="sampleMSHydro" placeholder='Hydro.' value={editDatas?.sampleMSHydro} onChange={onChange} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="sampleHSDHydro" id="sampleHSDHydro" placeholder='Hydro.' value={editDatas?.sampleHSDHydro} onChange={onChange} />
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <input type="text" className="form-control mx-2 my-2" name="sampleMSTemp" id="sampleMSTemp" placeholder='Temp.' value={editDatas?.sampleMSTemp} onChange={onChange} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="sampleHSDTemp" id="sampleHSDTemp" placeholder='Temp.' value={editDatas?.sampleHSDTemp} onChange={onChange} /> 
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <input type="text" className="form-control mx-2 my-2" name="sampleMS" id="sampleMS" placeholder='15c' value={editDatas?.sampleMS} onChange={onChange} onInput={() => calculateResultDensity("sampleMS", "invoiceMS", "resultDensityMS")} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="sampleHSD" id="sampleHSD" placeholder='15c' value={editDatas?.sampleHSD} onChange={onChange} onInput={() => calculateResultDensity("sampleHSD", "invoiceHSD", "resultDensityHSD")} /> 
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
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlbrMSDip" id="tlbrMSDip" value={editDatas?.tlbrMSDip} onChange={onChange} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlbrHSDDip" id="tlbrHSDDip" value={editDatas?.tlbrHSDDip} onChange={onChange} />
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='STOCK' disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlbrMSStock" id="tlbrMSStock" value={editDatas?.tlbrMSStock} onChange={onChange} onInput={() => {calculateResultStock("tlarMSStock", "tlbrMSStock", "ttLoadMS", "resultStockMS"), calculateStock("tlbrMSStock", "ttSalesMSSale", "ttSalesMSStock")}} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlbrHSDStock" id="tlbrHSDStock" value={editDatas?.tlbrHSDStock} onChange={onChange} onInput={() => {calculateResultStock("tlarHSDStock", "tlbrHSDStock", "ttLoadHSD", "resultStockHSD"), calculateStock("tlbrHSDStock", "ttSalesHSDSale", "ttSalesHSDStock")}} /> 
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU1' disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlbrMSDU1" id="tlbrMSDU1" value={editDatas?.tlbrMSDU1} onChange={onChange} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlbrHSDDU1" id="tlbrHSDDU1" value={editDatas?.tlbrHSDDU1} onChange={onChange} /> 
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU2' disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlbrMSDU2" id="tlbrMSDU2" value={editDatas?.tlbrMSDU2} onChange={onChange} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlbrHSDDU2" id="tlbrHSDDU2" value={editDatas?.tlbrHSDDU2} onChange={onChange} /> 
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
                                                                        <input type="text" className="form-control mx-2 my-2" name="resultDensityMS" id="resultDensityMS" value={editDatas?.resultDensityMS} onChange={onChange} disabled/> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="resultDensityHSD" id="resultDensityHSD" value={editDatas?.resultDensityHSD} onChange={onChange} disabled/> 
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
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlarMSDip" id="tlarMSDip" value={editDatas?.tlarMSDip} onChange={onChange} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlarHSDDip" id="tlarHSDDip" value={editDatas?.tlarHSDDip} onChange={onChange} />
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='STOCK' disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlarMSStock" id="tlarMSStock" value={editDatas?.tlarMSStock} onChange={onChange} onInput={() => calculateResultStock("tlarMSStock", "tlbrMSStock", "ttLoadMS", "resultStockMS")} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlarHSDStock" id="tlarHSDStock" value={editDatas?.tlarHSDStock} onChange={onChange} onInput={() => calculateResultStock("tlarHSDStock", "tlbrHSDStock", "ttLoadHSD", "resultStockHSD")} /> 
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU1' disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlarMSDU1" id="tlarMSDU1" value={editDatas?.tlarMSDU1} onChange={onChange} onInput={() => {calculateDUSale("tlarMSDU1", "ptlarMSDU1", "ttSalesMSDU1Sale"), calculateTotalSale("ttSalesMSDU1Sale", "ttSalesMSDU2Sale", "ttSalesMStotalSale"), calculateSale("ttSalesMStotalSale", "saleTestingMS", "ttSalesMSSale"), calculateStock("tlbrMSStock", "ttSalesMSSale", "ttSalesMSStock")}} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlarHSDDU1" id="tlarHSDDU1" value={editDatas?.tlarHSDDU1} onChange={onChange} onInput={() => {calculateDUSale("tlarHSDDU1", "ptlarHSDDU1", "ttSalesHSDDU1Sale"), calculateTotalSale("ttSalesHSDDU1Sale", "ttSalesHSDDU2Sale", "ttSalesHSDtotalSale"), calculateSale("ttSalesHSDtotalSale", "saleTestingHSD", "ttSalesHSDSale"), calculateStock("tlbrHSDStock", "ttSalesHSDSale", "ttSalesHSDStock")}} /> 
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU2' disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlarMSDU2" id="tlarMSDU2" value={editDatas?.tlarMSDU2} onChange={onChange} onInput={() => {calculateDUSale("tlarMSDU2", "ptlarMSDU2", "ttSalesMSDU2Sale"), calculateTotalSale("ttSalesMSDU1Sale", "ttSalesMSDU2Sale", "ttSalesMStotalSale"), calculateSale("ttSalesMStotalSale", "saleTestingMS", "ttSalesMSSale"), calculateStock("tlbrMSStock", "ttSalesMSSale", "ttSalesMSStock")}} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="tlarHSDDU2" id="tlarHSDDU2" value={editDatas?.tlarHSDDU2} onChange={onChange} onInput={() => {calculateDUSale("tlarHSDDU2", "ptlarHSDDU2", "ttSalesHSDDU2Sale"), calculateTotalSale("ttSalesHSDDU1Sale", "ttSalesHSDDU2Sale", "ttSalesHSDtotalSale"), calculateSale("ttSalesHSDtotalSale", "saleTestingHSD", "ttSalesHSDSale"), calculateStock("tlbrHSDStock", "ttSalesHSDSale", "ttSalesHSDStock")}} /> 
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
                                                                        <input type="text" className="form-control mx-2 my-2" name="resultStockMS" id="resultStockMS" value={editDatas?.resultStockMS} onChange={onChange} disabled/> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="resultStockHSD" id="resultStockHSD" value={editDatas?.resultStockHSD} onChange={onChange} disabled/>
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
                                                                        <input type="text" className="form-control mx-2 my-2" name="ptlarMSStock" id="ptlarMSStock" value={editDatas?.ptlarMSStock} onChange={onChange} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ptlarHSDStock" id="ptlarHSDStock" value={editDatas?.ptlarHSDStock} onChange={onChange} /> 
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU1' disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ptlarMSDU1" id="ptlarMSDU1" value={editDatas?.ptlarMSDU1} onChange={onChange} onInput={() => {calculateDUSale("tlarMSDU1", "ptlarMSDU1", "ttSalesMSDU1Sale"), calculateTotalSale("ttSalesMSDU1Sale", "ttSalesMSDU2Sale", "ttSalesMStotalSale"), calculateSale("ttSalesMStotalSale", "saleTestingMS", "ttSalesMSSale"), calculateStock("tlbrMSStock", "ttSalesMSSale", "ttSalesMSStock")}} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ptlarHSDDU1" id="ptlarHSDDU1" value={editDatas?.ptlarHSDDU1} onChange={onChange} onInput={() => {calculateDUSale("tlarHSDDU1", "ptlarHSDDU1", "ttSalesHSDDU1Sale"), calculateTotalSale("ttSalesHSDDU1Sale", "ttSalesHSDDU2Sale", "ttSalesHSDtotalSale"), calculateSale("ttSalesHSDtotalSale", "saleTestingHSD", "ttSalesHSDSale"), calculateStock("tlbrHSDStock", "ttSalesHSDSale", "ttSalesHSDStock")}} /> 
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='DU2' disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ptlarMSDU2" id="ptlarMSDU2" value={editDatas?.ptlarMSDU2} onChange={onChange} onInput={() => {calculateDUSale("tlarMSDU2", "ptlarMSDU2", "ttSalesMSDU2Sale"), calculateTotalSale("ttSalesMSDU1Sale", "ttSalesMSDU2Sale", "ttSalesMStotalSale"), calculateSale("ttSalesMStotalSale", "saleTestingMS", "ttSalesMSSale"), calculateStock("tlbrMSStock", "ttSalesMSSale", "ttSalesMSStock")}} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ptlarHSDDU2" id="ptlarHSDDU2" value={editDatas?.ptlarHSDDU2} onChange={onChange} onInput={() => {calculateDUSale("tlarHSDDU2", "ptlarHSDDU2", "ttSalesHSDDU2Sale"), calculateTotalSale("ttSalesHSDDU1Sale", "ttSalesHSDDU2Sale", "ttSalesHSDtotalSale"), calculateSale("ttSalesHSDtotalSale", "saleTestingHSD", "ttSalesHSDSale"), calculateStock("tlbrHSDStock", "ttSalesHSDSale", "ttSalesHSDStock")}} /> 
                                                                    </div>
                                                                    <label htmlFor="" className="form-label"><u>SALE TESTING</u></label> <br />
                                                                    <div className="col-md-3">
                                                                        <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='MS' disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled />
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <input type="text" className="form-control mx-2 my-2" name="saleTestingMS" id="saleTestingMS" value={editDatas?.saleTestingMS} onChange={onChange} onInput={() => {calculateSale("ttSalesMStotalSale", "saleTestingMS", "ttSalesMSSale"), calculateStock("tlbrMSStock", "ttSalesMSSale", "ttSalesMSStock")}} /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="saleTestingHSD" id="saleTestingHSD" value={editDatas?.saleTestingHSD} onChange={onChange} onInput={() => {calculateSale("ttSalesHSDtotalSale", "saleTestingHSD", "ttSalesHSDSale"), calculateStock("tlbrHSDStock", "ttSalesHSDSale", "ttSalesHSDStock")}} />
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
                                                                        <input type="text" className="form-control mx-2 my-2" name="ttSalesMSDU1Sale" id="ttSalesMSDU1Sale" value={editDatas?.ttSalesMSDU1Sale} onChange={onChange} disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ttSalesMSDU2Sale" id="ttSalesMSDU2Sale" value={editDatas?.ttSalesMSDU2Sale} onChange={onChange} disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ttSalesMStotalSale" id="ttSalesMStotalSale" value={editDatas?.ttSalesMStotalSale} onChange={onChange} disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ttSalesMSSale" id="ttSalesMSSale" value={editDatas?.ttSalesMSSale} onChange={onChange} disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ttSalesMSStock" id="ttSalesMSStock" value={editDatas?.ttSalesMSStock} onChange={onChange} disabled /> 
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <input type="text" className="form-control mx-2 my-2" name="" id="" placeholder='HSD' disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ttSalesHSDDU1Sale" id="ttSalesHSDDU1Sale" value={editDatas?.ttSalesHSDDU1Sale} onChange={onChange} disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ttSalesHSDDU2Sale" id="ttSalesHSDDU2Sale" value={editDatas?.ttSalesHSDDU2Sale} onChange={onChange} disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ttSalesHSDtotalSale" id="ttSalesHSDtotalSale" value={editDatas?.ttSalesHSDtotalSale} onChange={onChange} disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ttSalesHSDSale" id="ttSalesHSDSale" value={editDatas?.ttSalesHSDSale} onChange={onChange} disabled /> 
                                                                        <input type="text" className="form-control mx-2 my-2" name="ttSalesHSDStock" id="ttSalesHSDStock" value={editDatas?.ttSalesHSDStock} onChange={onChange} disabled /> 
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
                                                                        <input type="text" className="form-control" name="remark" id="remark" value={editDatas?.remark} onChange={onChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                <button type="submit" className="btn btn-dark text-center my-4">Submit</button>
                                                </form>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-outline-dark" title='Delete' onClick={() => handleDelete(myData.id)}>
                                            <i className="bi bi-trash3-fill"></i>
                                        </button>
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

export default TT
