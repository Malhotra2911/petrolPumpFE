import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { backendApiUrl } from '../config/config';
import { Link } from 'react-router-dom';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

const ShiftEntry = () => {
    const data = {
        inDate : "",
        inTime : "",
        outDate : "",
        outTime : "",
        name : "",
        stockOpenMS : "",
        stockCloseMS : "",
        testingMS : "",
        densityMS : "",
        du1OpenMS : "",
        du1CloseMS : "",
        du2OpenMS : "",
        du2CloseMS : "",
        du1DiffMS : "",
        du2DiffMS : "",
        meterRateMS : "",
        readingCashMS : "",
        stockOpenHSD : "",
        stockCloseHSD : "",
        testingHSD : "",
        densityHSD : "",
        du1OpenHSD : "",
        du1CloseHSD : "",
        du2OpenHSD : "",
        du2CloseHSD : "",
        du1DiffHSD : "",
        du2DiffHSD : "",
        meterRateHSD : "",
        readingCashHSD : "",
        phonePe : "",
        pos : "",
        totalCash : "",
        readingCash : "",
        totalShiftCollection : "",
        grandTotal : "",
        remark : "",
        shiftEntryList : [
            {
                oldCredit : "",
                oldCollectionName : "",
                oldDate : "",
                newCredit : "",
                borrowerName : "",
                borrowerMobileNo : ""
            }
        ]
    };

    const searchData = {
        fromDate : "",
        toDate : ""
    }

    const [credentials, setCredentials] = useState(data);
    const [isError, setIsError] = useState([]);
    const [myDatas, setMyDatas] = useState([]);
    const [searchCredentials, setSearchCredentials] = useState([searchData]);
    const [editDatas, setEditDatas] = useState([]);
    const [tab1, setTab1] = useState("nav-link bg-secondary text-white");
    const [tab2, setTab2] = useState("nav-link bg-light text-dark");

    const onChange = (e, index) => {
        // setCredentials({...credentials, [e.target.name] : e.target.value});
        const { name, value } = e.target;

        if (index !== undefined) {
            // If index is defined, it means we are dealing with fields inside shiftEntryList
            setCredentials((prevCredentials) => {
                const updatedShiftEntryList = [...prevCredentials.shiftEntryList];
                updatedShiftEntryList[index] = {
                    ...updatedShiftEntryList[index],
                    [name]: value,
                };
    
                return {
                    ...prevCredentials,
                    shiftEntryList: updatedShiftEntryList,
                };
            });
        } else {
            // If index is undefined, it means we are dealing with fields outside shiftEntryList
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [name]: value,
            }));
        }

        setSearchCredentials({...searchCredentials, [name] : value});
    }

    const onEditChange = (e, index) => {
        if (index !== undefined) {
            // If index is defined, it means we are dealing with fields inside shiftEntryList
            setEditDatas((prevCredentials) => {
                const updatedShiftEntryList = [...prevCredentials.shiftEntryList];
                updatedShiftEntryList[index] = {
                    ...updatedShiftEntryList[index],
                    [name]: value,
                };
                return {
                    ...prevCredentials,
                    shiftEntryList: updatedShiftEntryList,
                };
            });
        } else {
            // If index is undefined, it means we are dealing with fields outside shiftEntryList
            setEditDatas((prevCredentials) => ({
                ...prevCredentials,
                [name]: value,
            }));
        }
    }

    function calculateResult(multiplier, cashId, totalCashId) {
        // Get the input value
        let inputValue = document.getElementById(cashId).value;
        // Perform the multiplication
        let result = multiplier * inputValue;
        
        // Display the result in the disabled input field
        document.getElementById(totalCashId).value = result;
        calculateTotalCash();
    }

    function calculateTotalCash() {
        let totalCash2000 = document.getElementById("totalCash2000").value;
        let totalCash500 = document.getElementById("totalCash500").value;
        let totalCash200 = document.getElementById("totalCash200").value;
        let totalCash100 = document.getElementById("totalCash100").value;
        let totalCash50 = document.getElementById("totalCash50").value;
        let totalCash20 = document.getElementById("totalCash20").value;
        let totalCash10 = document.getElementById("totalCash10").value;
        let totalCash5 = document.getElementById("totalCash5").value;
        let totalCash2 = document.getElementById("totalCash2").value;
        let totalCash1 = document.getElementById("totalCash1").value;

        let result = Number(totalCash2000) + Number(totalCash500) + Number(totalCash200) + Number(totalCash100) + Number(totalCash50) + Number(totalCash20) + Number(totalCash10) + Number(totalCash5) + Number(totalCash2) + Number(totalCash1);
        credentials["totalCash"] = parseFloat(result) || 0;
        setCredentials({...credentials, ["totalCash"] : result})
    }

    function calculateDiffMSHSD(duOpenId, duCloseId, duResultId) {
        let duOpen = document.getElementById(duOpenId).value;
        let duClose = document.getElementById(duCloseId).value;
        
        let result = duClose - duOpen;
        credentials[duResultId] = parseFloat(result) || 0;
        setCredentials({...credentials, [duResultId] : result})
    }

    function calculateReadingCash(du1DiffId, du2DiffId, testingId, meterRateId, resultId) {
        let du1Diff = document.getElementById(du1DiffId).value;
        let du2Diff = document.getElementById(du2DiffId).value;
        let testing = document.getElementById(testingId).value;
        let meterRate = document.getElementById(meterRateId).value;

        let result = ((Number(du1Diff) + Number(du2Diff)) - Number(testing)) * Number(meterRate);
        credentials[resultId] = parseFloat(result) || 0;
        setCredentials({...credentials, [resultId] : result});
    }

    function calculateTotalReadingCash(readingCashMSId, readingCashHSDId, resultId) {
        let readingCashMS = parseFloat(credentials[readingCashMSId]) || 0;
        let readingCashHSD = parseFloat(credentials[readingCashHSDId]) || 0;

        let result = Number(readingCashMS) + Number(readingCashHSD);
        credentials[resultId] = parseFloat(result) || 0;
        setCredentials({...credentials, [resultId] : result});
    }

    function calculateStockClose(stockOpenId, testingId, du1Id, du2Id, resultId) {
        let stockOpen = parseFloat(credentials[stockOpenId]) || 0;
        let testing = parseFloat(credentials[testingId]) || 0;
        let du1 = parseFloat(credentials[du1Id]) || 0;
        let du2 = parseFloat(credentials[du2Id]) || 0;

        let result = Number(stockOpen) - (Number(du1) + Number(du2) + Number(testing));
        credentials[resultId] = parseFloat(result) || 0;
        setCredentials({...credentials, [resultId] : result});
    }

    function calculateTotalShiftCollection() {
        let totalPhonepe = document.getElementById("phonePe").value;
        let totalpos = document.getElementById("pos").value;
        let totalCash2000 = document.getElementById("totalCash2000").value;
        let totalCash500 = document.getElementById("totalCash500").value;
        let totalCash200 = document.getElementById("totalCash200").value;
        let totalCash100 = document.getElementById("totalCash100").value;
        let totalCash50 = document.getElementById("totalCash50").value;
        let totalCash20 = document.getElementById("totalCash20").value;
        let totalCash10 = document.getElementById("totalCash10").value;
        let totalCash5 = document.getElementById("totalCash5").value;
        let totalCash2 = document.getElementById("totalCash2").value;
        let totalCash1 = document.getElementById("totalCash1").value;
        let newCreditElements = document.querySelectorAll("#newCredit")
        let newCreditSum = Array.from(newCreditElements).reduce((sum, element) => {
            return sum + Number(element.value || 0);
        }, 0);

        let result = Number(totalPhonepe) + Number(totalpos) + Number(totalCash2000) + Number(totalCash500) + Number(totalCash200) + Number(totalCash100) + Number(totalCash50) + Number(totalCash20) + Number(totalCash10) + Number(totalCash5) + Number(totalCash2) + Number(totalCash1) + Number(newCreditSum);
        credentials["totalShiftCollection"] = parseFloat(result) || 0;
        setCredentials({...credentials, ["totalShiftCollection"] : result});
    }

    function calculateGrandTotal() {
        let totalPhonepe = document.getElementById("phonePe").value;
        let totalpos = document.getElementById("pos").value;
        let totalCash2000 = document.getElementById("totalCash2000").value;
        let totalCash500 = document.getElementById("totalCash500").value;
        let totalCash200 = document.getElementById("totalCash200").value;
        let totalCash100 = document.getElementById("totalCash100").value;
        let totalCash50 = document.getElementById("totalCash50").value;
        let totalCash20 = document.getElementById("totalCash20").value;
        let totalCash10 = document.getElementById("totalCash10").value;
        let totalCash5 = document.getElementById("totalCash5").value;
        let totalCash2 = document.getElementById("totalCash2").value;
        let totalCash1 = document.getElementById("totalCash1").value;
        let newCreditElements = document.querySelectorAll("#newCredit")
        let newCreditSum = Array.from(newCreditElements).reduce((sum, element) => {
            return sum + Number(element.value || 0);
        }, 0);
        let oldCreditElements = document.querySelectorAll("#oldCredit")
        let odlCreditSum = Array.from(oldCreditElements).reduce((sum, element) => {
            return sum + Number(element.value || 0);
        }, 0);

        let result = Number(totalPhonepe) + Number(totalpos) + Number(totalCash2000) + Number(totalCash500) + Number(totalCash200) + Number(totalCash100) + Number(totalCash50) + Number(totalCash20) + Number(totalCash10) + Number(totalCash5) + Number(totalCash2) + Number(totalCash1) + Number(newCreditSum) + Number(odlCreditSum);
        credentials["grandTotal"] = parseFloat(result) || 0;
        setCredentials({...credentials, ["grandTotal"] : result});
    }

    const [oldRows, setOldRows] = useState([{}]);
    const [newRows, setNewRows] = useState([{}]);

    const addOldRow = (e) => {
        e.preventDefault();
        setOldRows([...oldRows, {}]);
    }

    const deleteOldRow = (index) => {
        const updatedRows = [...oldRows];
        updatedRows.splice(index, 1);
        setOldRows(updatedRows);
    }

    const addNewRow = (e) => {
        e.preventDefault();
        setNewRows([...newRows, {}]);
    }

    const deleteNewRow = (index) => {
        const updatedRows = [...newRows];
        updatedRows.splice(index, 1);
        setNewRows(updatedRows);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${backendApiUrl}shiftEntry/add-shiftEntry`, credentials, {
            headers : {
                'auth-token' : sessionStorage.getItem('token')
            }
        });
        if(response.data) {
            alert("Added Successfully...");
            window.location.reload();
        }
        console.log(response.data);
    }

    const handleSearchSubmit = async (e) => {
        axios.get(`${backendApiUrl}shiftEntry/get-shiftEntry?fromDate=${searchCredentials.fromDate}&toDate=${searchCredentials.toDate}`)
        .then((res) => {
            setMyDatas(res.data.data);
        })
        .catch((error) => {
            setIsError(error.message);
        })
    }

    const handleEditData = async (e) => {
        axios.get(`${backendApiUrl}shiftEntry/get-shiftEntry?id=${e}`)
        .then((res) => {
            setEditDatas(res.data.data[0]);
        })
        .catch((error) => {
            setIsError(error.message);
        })
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        axios.put(`${backendApiUrl}shiftEntry/edit-shiftEntry`, editDatas);
        alert("Updated Successfully...");
        window.location.reload();
    }

    const handleDelete = async (e) => {
        axios.delete(`${backendApiUrl}shiftEntry/delete-shiftEntry?id=${e}`)
        .then(() => {
            axios.get(`${backendApiUrl}shiftEntry/get-shiftEntry`)
            .then((res) => {
              setMyDatas(res.data.data);
            })
            .catch((error) => {
              setIsError(error.message);
            })
        })
    }

    const handleTabs = async (e) => {
        if (e == "shiftEntry") {
            setTab1("nav-link bg-secondary text-white");
            setTab2("nav-link bg-light text-dark");
        } else if (e == "reports") {
            setTab2("nav-link bg-secondary text-white");
            setTab1("nav-link bg-light text-dark");
        }
    }

    const printComponent = useRef();
    const handlePrint = useReactToPrint({
        content: () => printComponent.current,
    });

    useEffect(() => {
      axios.get(`${backendApiUrl}shiftEntry/get-shiftEntry`)
      .then((res) => {
        setMyDatas(res.data.data);
      })
      .catch((error) => {
        setIsError(error.message);
      })
    }, [])
    
  return (
    sessionStorage.getItem('token') ? 
    <div className='MeterReading'>
        <h2 className="text-start mx-4"><u>Shift Entry</u></h2>
        <div className="container-fluid">
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className={tab1} onClick={()=> handleTabs("shiftEntry")} aria-current="page" to="/shiftEntry"><h3>Shift Entry</h3></Link>
                </li>
                <li className="nav-item">
                    <Link className={tab2} to="/shiftEntry" onClick={()=> handleTabs("reports")}><h3>Reports</h3></Link>
                </li>
            </ul>
        </div>
        { tab1 == "nav-link bg-secondary text-white" ? <div>
            <button type="button" className="btn btn-dark my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Shift Entry</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form className="text-start" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="inDate" className="form-label">In Date*</label>
                                        <input type="date" className="form-control" name="inDate" id="inDate" value={credentials.inDate} onChange={onChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="inTime" className="form-label">In Time*</label>
                                        <input type="time" className="form-control" name="inTime" id="inTime" value={credentials.inTime} onChange={onChange} required/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="outDate" className="form-label">Out Date*</label>
                                        <input type="date" className="form-control" name="outDate" id="outDate" value={credentials.outDate} onChange={onChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="outTime" className="form-label">Out Time*</label>
                                        <input type="time" className="form-control" name="outTime" id="outTime" value={credentials.outTime} onChange={onChange} required/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name*</label>
                                <input type="text" className="form-control" name="name" id="name" value={credentials.name} onChange={onChange} required/>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-6" style={{backgroundColor: "whitesmoke"}}>
                            <h4 className='text-center'>MS</h4>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="stockOpenMS" className="form-label">Stock Open*</label>
                                        <input type="text" className="form-control" name="stockOpenMS" id="stockOpenMS" value={credentials.stockOpenMS} onChange={onChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="stockCloseMS" className="form-label">Stock Close</label>
                                        <input type="text" className="form-control" name="stockCloseMS" id="stockCloseMS" value={credentials.stockCloseMS} onChange={onChange} disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="testingMS" className="form-label">Testing</label>
                                        <input type="text" className="form-control" name="testingMS" id="testingMS" value={credentials.testingMS} onChange={onChange} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="densityMS" className="form-label">Density</label>
                                        <input type="text" className="form-control" name="densityMS" id="densityMS" value={credentials.densityMS} onChange={onChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="du1OpenMS" className="form-label">DU 1 Open*</label>
                                        <input type="text" className="form-control" name="du1OpenMS" id="du1OpenMS" value={credentials.du1OpenMS} onChange={onChange} onInput={() => {calculateDiffMSHSD("du1OpenMS", "du1CloseMS", "du1DiffMS"), calculateStockClose("stockOpenMS", "testingMS", "du1DiffMS", "du2DiffMS", "stockCloseMS")}} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="du1CloseMS" className="form-label">DU 1 Close*</label>
                                        <input type="text" className="form-control" name="du1CloseMS" id="du1CloseMS" value={credentials.du1CloseMS} onChange={onChange} onInput={() => {calculateDiffMSHSD("du1OpenMS", "du1CloseMS", "du1DiffMS"), calculateStockClose("stockOpenMS", "testingMS", "du1DiffMS", "du2DiffMS", "stockCloseMS")}} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="du2OpenMS" className="form-label">DU 2 Open*</label>
                                        <input type="text" className="form-control" name="du2OpenMS" id="du2OpenMS" value={credentials.du2OpenMS} onChange={onChange} onInput={() => {calculateDiffMSHSD("du2OpenMS", "du2CloseMS", "du2DiffMS"), calculateStockClose("stockOpenMS", "testingMS", "du1DiffMS", "du2DiffMS", "stockCloseMS")}} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="du2CloseMS" className="form-label">DU 2 Close*</label>
                                        <input type="text" className="form-control" name="du2CloseMS" id="du2CloseMS" value={credentials.du2CloseMS} onChange={onChange} onInput={() => {calculateDiffMSHSD("du2OpenMS", "du2CloseMS", "du2DiffMS"), calculateStockClose("stockOpenMS", "testingMS", "du1DiffMS", "du2DiffMS", "stockCloseMS")}} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="du1DiffMS" className="form-label">DU 1 Diff.</label>
                                        <input type="text" className="form-control" name="du1DiffMS" id="du1DiffMS" value={credentials.du1DiffMS} onChange={onChange} disabled/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="du2DiffMS" className="form-label">DU 2 Diff.</label>
                                        <input type="text" className="form-control" name="du2DiffMS" id="du2DiffMS" value={credentials.du2DiffMS} onChange={onChange} disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="meterRateMS" className="form-label">Meter Rate*</label>
                                        <input type="text" className="form-control" name="meterRateMS" id="meterRateMS" value={credentials.meterRateMS} onChange={onChange} onInput={() => {calculateReadingCash("du1DiffMS", "du2DiffMS", "testingMS", "meterRateMS", "readingCashMS"); calculateTotalReadingCash("readingCashMS", "readingCashHSD", "readingCash")}} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="readingCashMS" className="form-label">MS Reading Cash</label>
                                        <input type="text" className="form-control" name="readingCashMS" id="readingCashMS" value={credentials.readingCashMS} onChange={onChange} disabled/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" style={{backgroundColor: "lightgrey"}}>
                            <h4 className='text-center'>HSD</h4>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="stockOpenHSD" className="form-label">Stock Open*</label>
                                        <input type="text" className="form-control" name="stockOpenHSD" id="stockOpenHSD" value={credentials.stockOpenHSD} onChange={onChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="stockCloseHSD" className="form-label">Stock Close</label>
                                        <input type="text" className="form-control" name="stockCloseHSD" id="stockCloseHSD" value={credentials.stockCloseHSD} onChange={onChange} disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="testingHSD" className="form-label">Testing</label>
                                        <input type="text" className="form-control" name="testingHSD" id="testingHSD" value={credentials.testingHSD} onChange={onChange} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="densityHSD" className="form-label">Density</label>
                                        <input type="text" className="form-control" name="densityHSD" id="densityHSD" value={credentials.densityHSD} onChange={onChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="du1OpenHSD" className="form-label">DU 1 Open*</label>
                                        <input type="text" className="form-control" name="du1OpenHSD" id="du1OpenHSD" value={credentials.du1OpenHSD} onChange={onChange} onInput={() => {calculateDiffMSHSD("du1OpenHSD", "du1CloseHSD", "du1DiffHSD"), calculateStockClose("stockOpenHSD", "testingHSD", "du1DiffHSD", "du2DiffHSD", "stockCloseHSD")}} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="du1CloseHSD" className="form-label">DU 1 Close*</label>
                                        <input type="text" className="form-control" name="du1CloseHSD" id="du1CloseHSD" value={credentials.du1CloseHSD} onChange={onChange} onInput={() => {calculateDiffMSHSD("du1OpenHSD", "du1CloseHSD", "du1DiffHSD"), calculateStockClose("stockOpenHSD", "testingHSD", "du1DiffHSD", "du2DiffHSD", "stockCloseHSD")}} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="du2OpenHSD" className="form-label">DU 2 Open*</label>
                                        <input type="text" className="form-control" name="du2OpenHSD" id="du2OpenHSD" value={credentials.du2OpenHSD} onChange={onChange} onInput={() => {calculateDiffMSHSD("du2OpenHSD", "du2CloseHSD", "du2DiffHSD"), calculateStockClose("stockOpenHSD", "testingHSD", "du1DiffHSD", "du2DiffHSD", "stockCloseHSD")}} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="du2CloseHSD" className="form-label">DU 2 Close*</label>
                                        <input type="text" className="form-control" name="du2CloseHSD" id="du2CloseHSD" value={credentials.du2CloseHSD} onChange={onChange} onInput={() => {calculateDiffMSHSD("du2OpenHSD", "du2CloseHSD", "du2DiffHSD"), calculateStockClose("stockOpenHSD", "testingHSD", "du1DiffHSD", "du2DiffHSD", "stockCloseHSD")}} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="du1DiffHSD" className="form-label">DU 1 Diff.</label>
                                        <input type="text" className="form-control" name="du1DiffHSD" id="du1DiffHSD" value={credentials.du1DiffHSD} onChange={onChange} disabled/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="du2DiffHSD" className="form-label">DU 2 Diff.</label>
                                        <input type="text" className="form-control" name="du2DiffHSD" id="du2DiffHSD" value={credentials.du2DiffHSD} onChange={onChange} disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="meterRateHSD" className="form-label">Meter Rate*</label>
                                        <input type="text" className="form-control" name="meterRateHSD" id="meterRateHSD" value={credentials.meterRateHSD} onChange={onChange} onInput={() => {calculateReadingCash("du1DiffHSD", "du2DiffHSD", "testingHSD", "meterRateHSD", "readingCashHSD"); calculateTotalReadingCash("readingCashMS", "readingCashHSD", "readingCash")}} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="readingCashHSD" className="form-label">HSD Reading Cash</label>
                                        <input type="text" className="form-control" name="readingCashHSD" id="readingCashHSD" value={credentials.readingCashHSD} onChange={onChange} disabled/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="phonePe" className="form-label">Phonepe</label>
                                <input type="text" className="form-control" name="phonePe" id="phonePe" value={credentials.phonePe} onChange={onChange} onInput={() => {calculateTotalShiftCollection(), calculateGrandTotal()}} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pos" className="form-label">POS</label>
                                <input type="text" className="form-control" name="pos" id="pos" value={credentials.pos} onChange={onChange} onInput={() => {calculateTotalShiftCollection(), calculateGrandTotal()}}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="remark" className="form-label">Remark</label>
                                <input type="text" className="form-control" name="remark" id="remark" value={credentials.remark} onChange={onChange} />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="mb-3">
                                <label htmlFor="cash" className="form-label">Cash</label> <br />
                                2000 * <input type="number" className='my-1' name="cash2000" id="cash2000" onInput={() => {calculateResult(2000, "cash2000", "totalCash2000"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash2000" id="totalCash2000" disabled /> <br />
                                500 &nbsp; * <input type="number" className='my-1' name="cash500" id="cash500" onInput={() => {calculateResult(500, "cash500", "totalCash500"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash500" id="totalCash500" disabled /> <br />
                                200 &nbsp; * <input type="number" className='my-1' name="cash200" id="cash200" onInput={() => {calculateResult(200, "cash200", "totalCash200"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash200" id="totalCash200" disabled /> <br />
                                100 &nbsp; * <input type="number" className='my-1' name="cash100" id="cash100" onInput={() => {calculateResult(100, "cash100", "totalCash100"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash100" id="totalCash100" disabled /> <br />
                                50 &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash50" id="cash50" onInput={() => {calculateResult(50, "cash50", "totalCash50"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash50" id="totalCash50" disabled /> <br />
                                20 &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash20" id="cash20" onInput={() => {calculateResult(20, "cash20", "totalCash20"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash20" id="totalCash20" disabled /> <br />
                                10 &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash10" id="cash10" onInput={() => {calculateResult(10, "cash10", "totalCash10"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash10" id="totalCash10" disabled /> <br />
                                5 &nbsp; &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash5" id="cash5" onInput={() => {calculateResult(5, "cash5", "totalCash5"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash5" id="totalCash5" disabled /> <br />
                                2 &nbsp; &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash2" id="cash2" onInput={() => {calculateResult(2, "cash2", "totalCash2"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash2" id="totalCash2" disabled /> <br />
                                1 &nbsp; &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash1" id="cash1" onInput={() => {calculateResult(1, "cash1", "totalCash1"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash1" id="totalCash1" disabled /> <br />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="totalCash" className="form-label">Total Cash</label>
                                <input type="text" className="form-control" name="totalCash" id="totalCash" value={credentials.totalCash} onChange={onChange} disabled/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="readingCash" className="form-label">Total Reading Cash</label>
                                <input type="text" className="form-control" name="readingCash" id="readingCash" value={credentials.readingCash} onChange={onChange} disabled/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="totalShiftCollection" className="form-label">Total Shift Collection</label>
                                <input type="text" className="form-control" name="totalShiftCollection" id="totalShiftCollection" value={credentials.totalShiftCollection} onChange={onChange} disabled/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="grandTotal" className="form-label">Grand Total</label>
                                <input type="text" className="form-control" name="grandTotal" id="grandTotal" value={credentials.grandTotal} onChange={onChange} disabled/>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                    <button onClick={addOldRow} className='btn btn-outline-dark my-2'>Old Collection <i className="bi bi-plus-square"></i></button>
                    {oldRows.map((row, index) => (
                        <div key={index} className="input-group my-2">
                        <span className="input-group-text">Old Collection</span>
                        <input type="text" placeholder="Old Credit/Loan Amount" className="form-control" name="oldCredit" id="oldCredit" value={credentials.shiftEntryList[index]?.oldCredit || ''} onChange={(e) => onChange(e, index)} onInput={()=> calculateGrandTotal()} />
                        <input type="text" placeholder="Old Cash Collection Name" className="form-control" name="oldCollectionName" id="oldCollectionName" value={credentials.shiftEntryList[index]?.oldCollectionName || ''} onChange={(e) => onChange(e, index)} />
                        <input type="date" placeholder="Old Cash Collection Date" className="form-control" name="oldDate" id="oldDate" value={credentials.shiftEntryList[index]?.oldDate || ''} onChange={(e) => onChange(e, index)} />
                        <button onClick={() => deleteOldRow(index)} className='btn btn-outline-dark'><i className="bi bi-x"></i></button>
                        </div>
                    ))}
                    </div>
                    <div>
                    <button onClick={addNewRow} className="btn btn-outline-dark my-2">New Credit <i className="bi bi-plus-square"></i></button>
                    {newRows.map((row, index) => (
                        <div key={index} className="input-group my-2">
                            <span className="input-group-text">New Credit</span>
                            <input type="text" placeholder="Today's Credit/Loan Amount" className="form-control" name="newCredit" id="newCredit" value={credentials.shiftEntryList[index]?.newCredit || ''} onChange={(e) => onChange(e, index)} onInput={()=> {calculateTotalShiftCollection(), calculateGrandTotal()}} />
                            <input type="text" placeholder="Borrower's Name" className="form-control" name="borrowerName" id="borrowerName" value={credentials.shiftEntryList[index]?.borrowerName || ''} onChange={(e) => onChange(e, index)} />
                            <input type="text" placeholder="Borrower's Mobile No." className="form-control" name="borrowerMobileNo" id="borrowerMobileNo" value={credentials.shiftEntryList[index]?.borrowerMobileNo || ''} onChange={(e) => onChange(e, index)} />
                            <button onClick={() => deleteNewRow(index)} className='btn btn-outline-dark'><i className="bi bi-x"></i></button>
                        </div>
                    ))}
                    </div>
                    <button type="submit" className="btn btn-dark text-center my-4">Submit</button>
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
                            <th scope="col">S.no</th>
                            <th scope="col">In Date/Time</th>
                            <th scope="col">Out Date/Time</th>
                            <th scope="col">Name</th>
                            <th scope="col">Stock Open (MS)</th>
                            <th scope="col">Stock Close (MS)</th>
                            <th scope="col">DU1 Open (MS)</th>
                            <th scope="col">DU1 Close (MS)</th>
                            <th scope="col">DU2 Open (MS)</th>
                            <th scope="col">DU2 Close (MS)</th>
                            <th scope="col">Testing (MS)</th>
                            <th scope="col">MS Reading Cash</th>
                            <th scope="col">Stock Open (HSD)</th>
                            <th scope="col">Stock Close (HSD)</th>
                            <th scope="col">DU1 Open (HSD)</th>
                            <th scope="col">DU1 Close (HSD)</th>
                            <th scope="col">DU2 Open (HSD)</th>
                            <th scope="col">DU2 Close (HSD)</th>
                            <th scope="col">Testing (HSD)</th>
                            <th scope="col">HSD Reading Cash</th>
                            <th scope="col">Total Reading Cash</th>
                            <th scope="col">Total Shift Collection</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myDatas.length > 0 ? myDatas.map((myData, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{myData.inDate} / {myData.inTime}</td>
                                        <td>{myData.outDate} / {myData.outTime}</td>
                                        <td>{myData.name}</td>
                                        <td>{myData.stockOpenMS}</td>
                                        <td>{myData.stockCloseMS}</td>
                                        <td>{myData.du1OpenMS}</td>
                                        <td>{myData.du1CloseMS}</td>
                                        <td>{myData.du2OpenMS}</td>
                                        <td>{myData.du2CloseMS}</td>
                                        <td>{myData.testingMS}</td>
                                        <td>{myData.readingCashMS}</td>
                                        <td>{myData.stockOpenHSD}</td>
                                        <td>{myData.stockCloseHSD}</td>
                                        <td>{myData.du1OpenHSD}</td>
                                        <td>{myData.du1CloseHSD}</td>
                                        <td>{myData.du2OpenHSD}</td>
                                        <td>{myData.du2CloseHSD}</td>
                                        <td>{myData.testingHSD}</td>
                                        <td>{myData.readingCashHSD}</td>
                                        <td>{myData.readingCash}</td>
                                        <td>{myData.totalShiftCollection}</td>
                                        <td>
                                        <button type="button" className="btn btn-outline-dark my-1" data-bs-toggle="modal" data-bs-target="#viewModal" title='View' onClick={() => handleEditData(myData.id)}>
                                            <i className="bi bi-eye-fill"></i>
                                        </button>
                                        <div key={myData.id} className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-xl">
                                                <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Shift Entry</h1>
                                                    <button type="button" className="btn btn-outline-dark mx-2" title="Print"><i className="bi bi-printer" onClick={() => handlePrint()}></i></button>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body" ref={printComponent}>
                                                <form className="text-start">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="inDate" className="form-label">In Date*</label>
                                                                        <input type="date" className="form-control" name="inDate" id="inDate" defaultValue={editDatas.inDate} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="inTime" className="form-label">In Time*</label>
                                                                        <input type="time" className="form-control" name="inTime" id="inTime" defaultValue={editDatas.inTime} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="outDate" className="form-label">Out Date*</label>
                                                                        <input type="date" className="form-control" name="outDate" id="outDate" defaultValue={editDatas.outDate} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="outTime" className="form-label">Out Time*</label>
                                                                        <input type="time" className="form-control" name="outTime" id="outTime" defaultValue={editDatas.outTime} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="mb-3">
                                                                <label htmlFor="name" className="form-label">Name*</label>
                                                                <input type="text" className="form-control" name="name" id="name" defaultValue={editDatas.name} readOnly/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-6" style={{backgroundColor: "whitesmoke"}}>
                                                            <h4 className='text-center'>MS</h4>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="stockOpenMS" className="form-label">Stock Open*</label>
                                                                        <input type="text" className="form-control" name="stockOpenMS" id="stockOpenMS" defaultValue={editDatas.stockOpenMS} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="stockCloseMS" className="form-label">Stock Close</label>
                                                                        <input type="text" className="form-control" name="stockCloseMS" id="stockCloseMS" defaultValue={editDatas.stockCloseMS} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="testingMS" className="form-label">Testing</label>
                                                                        <input type="text" className="form-control" name="testingMS" id="testingMS" defaultValue={editDatas.testingMS} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="densityMS" className="form-label">Density</label>
                                                                        <input type="text" className="form-control" name="densityMS" id="densityMS" defaultValue={editDatas.densityMS} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du1OpenMS" className="form-label">DU 1 Open*</label>
                                                                        <input type="text" className="form-control" name="du1OpenMS" id="du1OpenMS" defaultValue={editDatas.du1OpenMS} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du1CloseMS" className="form-label">DU 1 Close*</label>
                                                                        <input type="text" className="form-control" name="du1CloseMS" id="du1CloseMS" defaultValue={editDatas.du1CloseMS} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du2OpenMS" className="form-label">DU 2 Open*</label>
                                                                        <input type="text" className="form-control" name="du2OpenMS" id="du2OpenMS" defaultValue={editDatas.du2OpenMS} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du2CloseMS" className="form-label">DU 2 Close*</label>
                                                                        <input type="text" className="form-control" name="du2CloseMS" id="du2CloseMS" defaultValue={editDatas.du2CloseMS} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du1DiffMS" className="form-label">DU 1 Diff.</label>
                                                                        <input type="text" className="form-control" name="du1DiffMS" id="du1DiffMS" defaultValue={editDatas.du1DiffMS} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du2DiffMS" className="form-label">DU 2 Diff.</label>
                                                                        <input type="text" className="form-control" name="du2DiffMS" id="du2DiffMS" defaultValue={editDatas.du2DiffMS} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="meterRateMS" className="form-label">Meter Rate*</label>
                                                                        <input type="text" className="form-control" name="meterRateMS" id="meterRateMS" defaultValue={editDatas.meterRateMS} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="readingCashMS" className="form-label">MS Reading Cash</label>
                                                                        <input type="text" className="form-control" name="readingCashMS" id="readingCashMS" defaultValue={editDatas.readingCashMS} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6" style={{backgroundColor: "lightgrey"}}>
                                                            <h4 className='text-center'>HSD</h4>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="stockOpenHSD" className="form-label">Stock Open*</label>
                                                                        <input type="text" className="form-control" name="stockOpenHSD" id="stockOpenHSD" defaultValue={editDatas.stockOpenHSD} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="stockCloseHSD" className="form-label">Stock Close</label>
                                                                        <input type="text" className="form-control" name="stockCloseHSD" id="stockCloseHSD" defaultValue={editDatas.stockCloseHSD} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="testingHSD" className="form-label">Testing</label>
                                                                        <input type="text" className="form-control" name="testingHSD" id="testingHSD" defaultValue={editDatas.testingHSD} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="densityHSD" className="form-label">Density</label>
                                                                        <input type="text" className="form-control" name="densityHSD" id="densityHSD" defaultValue={editDatas.densityHSD} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du1OpenHSD" className="form-label">DU 1 Open*</label>
                                                                        <input type="text" className="form-control" name="du1OpenHSD" id="du1OpenHSD" defaultValue={editDatas.du1OpenHSD} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du1CloseHSD" className="form-label">DU 1 Close*</label>
                                                                        <input type="text" className="form-control" name="du1CloseHSD" id="du1CloseHSD" defaultValue={editDatas.du1CloseHSD} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du2OpenHSD" className="form-label">DU 2 Open*</label>
                                                                        <input type="text" className="form-control" name="du2OpenHSD" id="du2OpenHSD" defaultValue={editDatas.du2OpenHSD} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du2CloseHSD" className="form-label">DU 2 Close*</label>
                                                                        <input type="text" className="form-control" name="du2CloseHSD" id="du2CloseHSD" defaultValue={editDatas.du2CloseHSD} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du1DiffHSD" className="form-label">DU 1 Diff.</label>
                                                                        <input type="text" className="form-control" name="du1DiffHSD" id="du1DiffHSD" defaultValue={editDatas.du1DiffHSD} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du2DiffHSD" className="form-label">DU 2 Diff.</label>
                                                                        <input type="text" className="form-control" name="du2DiffHSD" id="du2DiffHSD" defaultValue={editDatas.du2DiffHSD} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="meterRateHSD" className="form-label">Meter Rate*</label>
                                                                        <input type="text" className="form-control" name="meterRateHSD" id="meterRateHSD" defaultValue={editDatas.meterRateHSD} readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="readingCashHSD" className="form-label">HSD Reading Cash</label>
                                                                        <input type="text" className="form-control" name="readingCashHSD" id="readingCashHSD" defaultValue={editDatas.readingCashHSD} readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="mb-3">
                                                                <label htmlFor="phonePe" className="form-label">Phonepe</label>
                                                                <input type="text" className="form-control" name="phonePe" id="phonePe" defaultValue={editDatas.phonePe} readOnly/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="pos" className="form-label">POS</label>
                                                                <input type="text" className="form-control" name="pos" id="pos" defaultValue={editDatas.pos} readOnly/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="remark" className="form-label">Remark</label>
                                                                <input type="text" className="form-control" name="remark" id="remark" defaultValue={editDatas.remark} readOnly/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="mb-3">
                                                                <label htmlFor="cash" className="form-label">Cash</label> <br />
                                                                2000 * <input type="number" className='my-1' name="cash2000" id="cash2000"  readOnly/> = <input type="text" name="totalCash2000" id="totalCash2000" disabled /> <br />
                                                                500 &nbsp; * <input type="number" className='my-1' name="cash500" id="cash500"  readOnly/> = <input type="text" name="totalCash500" id="totalCash500" disabled /> <br />
                                                                200 &nbsp; * <input type="number" className='my-1' name="cash200" id="cash200"  readOnly/> = <input type="text" name="totalCash200" id="totalCash200" disabled /> <br />
                                                                100 &nbsp; * <input type="number" className='my-1' name="cash100" id="cash100"  readOnly/> = <input type="text" name="totalCash100" id="totalCash100" disabled /> <br />
                                                                50 &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash50" id="cash50"  readOnly/> = <input type="text" name="totalCash50" id="totalCash50" disabled /> <br />
                                                                20 &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash20" id="cash20"  readOnly/> = <input type="text" name="totalCash20" id="totalCash20" disabled /> <br />
                                                                10 &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash10" id="cash10"  readOnly/> = <input type="text" name="totalCash10" id="totalCash10" disabled /> <br />
                                                                5 &nbsp; &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash5" id="cash5"  readOnly/> = <input type="text" name="totalCash5" id="totalCash5" disabled /> <br />
                                                                2 &nbsp; &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash2" id="cash2"  readOnly/> = <input type="text" name="totalCash2" id="totalCash2" disabled /> <br />
                                                                1 &nbsp; &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash1" id="cash1"  readOnly/> = <input type="text" name="totalCash1" id="totalCash1" disabled /> <br />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label htmlFor="totalCash" className="form-label">Total Cash</label>
                                                                <input type="text" className="form-control" name="totalCash" id="totalCash" defaultValue={editDatas.totalCash} readOnly/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="readingCash" className="form-label">Total Reading Cash</label>
                                                                <input type="text" className="form-control" name="readingCash" id="readingCash" defaultValue={editDatas.readingCash} readOnly/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="totalShiftCollection" className="form-label">Total Shift Collection</label>
                                                                <input type="text" className="form-control" name="totalShiftCollection" id="totalShiftCollection" defaultValue={editDatas.totalShiftCollection} readOnly/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="grandTotal" className="form-label">Grand Total</label>
                                                                <input type="text" className="form-control" name="grandTotal" id="grandTotal" defaultValue={editDatas.grandTotal} readOnly/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div>
                                                    <button onClick={addOldRow} className='btn btn-outline-dark my-2' disabled>Old Collection <i className="bi bi-plus-square"></i></button>
                                                    {oldRows.map((row, index) => (
                                                        <div key={index} className="input-group my-2">
                                                        <span className="input-group-text">Old Collection</span>
                                                        <input type="text" placeholder="Old Credit/Loan Amount" className="form-control" name="oldCredit" id="oldCredit" defaultValue={editDatas?.shiftEntryList?.[index]?.oldCredit || ''} readOnly/>
                                                        <input type="text" placeholder="Old Cash Collection Name" className="form-control" name="oldCollectionName" id="oldCollectionName" defaultValue={editDatas?.shiftEntryList?.[index]?.oldCollectionName || ''} readOnly/>
                                                        <input type="date" placeholder="Old Cash Collection Date" className="form-control" name="oldDate" id="oldDate" defaultValue={editDatas?.shiftEntryList?.[index]?.oldDate == '0000-00-00' ? "" : editDatas?.shiftEntryList?.[index]?.oldDate} readOnly/>
                                                        <button onClick={() => deleteOldRow(index)} className='btn btn-outline-dark' disabled><i className="bi bi-x"></i></button>
                                                        </div>
                                                    ))}
                                                    </div>
                                                    <div>
                                                    <button onClick={addNewRow} className="btn btn-outline-dark my-2" disabled>New Credit <i className="bi bi-plus-square"></i></button>
                                                    {newRows.map((row, index) => (
                                                        <div key={index} className="input-group my-2">
                                                            <span className="input-group-text">New Credit</span>
                                                            <input type="text" placeholder="Today's Credit/Loan Amount" className="form-control" name="newCredit" id="newCredit" defaultValue={editDatas?.shiftEntryList?.[index]?.newCredit || ''} readOnly/>
                                                            <input type="text" placeholder="Borrower's Name" className="form-control" name="borrowerName" id="borrowerName" defaultValue={editDatas?.shiftEntryList?.[index]?.borrowerName || ''} readOnly/>
                                                            <input type="text" placeholder="Borrower's Mobile No." className="form-control" name="borrowerMobileNo" id="borrowerMobileNo" defaultValue={editDatas?.shiftEntryList?.[index]?.borrowerMobileNo || ''} readOnly/>
                                                            <button onClick={() => deleteNewRow(index)} className='btn btn-outline-dark' disabled><i className="bi bi-x"></i></button>
                                                        </div>
                                                    ))}
                                                    </div>
                                                </form>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-outline-dark mx-1" data-bs-toggle="modal" data-bs-target="#editModal" title='Edit' onClick={() => handleEditData(myData.id)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <div key={myData.id} className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-xl">
                                                <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Shift Entry</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                <form className="text-start" onSubmit={handleEditSubmit}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="inDate" className="form-label">In Date*</label>
                                                                        <input type="date" className="form-control" name="inDate" id="inDate" value={editDatas.inDate} onChange={onEditChange} required/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="inTime" className="form-label">In Time*</label>
                                                                        <input type="time" className="form-control" name="inTime" id="inTime" value={editDatas.inTime} onChange={onEditChange} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="outDate" className="form-label">Out Date*</label>
                                                                        <input type="date" className="form-control" name="outDate" id="outDate" value={editDatas.outDate} onChange={onEditChange} required/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="outTime" className="form-label">Out Time*</label>
                                                                        <input type="time" className="form-control" name="outTime" id="outTime" value={editDatas.outTime} onChange={onEditChange} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="mb-3">
                                                                <label htmlFor="name" className="form-label">Name*</label>
                                                                <input type="text" className="form-control" name="name" id="name" value={editDatas.name} onChange={onEditChange} required/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-6" style={{backgroundColor: "whitesmoke"}}>
                                                            <h4 className='text-center'>MS</h4>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="stockOpenMS" className="form-label">Stock Open*</label>
                                                                        <input type="text" className="form-control" name="stockOpenMS" id="stockOpenMS" value={editDatas.stockOpenMS} onChange={onEditChange} required/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="stockCloseMS" className="form-label">Stock Close</label>
                                                                        <input type="text" className="form-control" name="stockCloseMS" id="stockCloseMS" value={editDatas.stockCloseMS} onChange={onEditChange} disabled/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="testingMS" className="form-label">Testing</label>
                                                                        <input type="text" className="form-control" name="testingMS" id="testingMS" value={editDatas.testingMS} onChange={onEditChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="densityMS" className="form-label">Density</label>
                                                                        <input type="text" className="form-control" name="densityMS" id="densityMS" value={editDatas.densityMS} onChange={onEditChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du1OpenMS" className="form-label">DU 1 Open*</label>
                                                                        <input type="text" className="form-control" name="du1OpenMS" id="du1OpenMS" value={editDatas.du1OpenMS} onChange={onEditChange} onInput={() => {calculateDiffMSHSD("du1OpenMS", "du1CloseMS", "du1DiffMS"), calculateStockClose("stockOpenMS", "testingMS", "du1DiffMS", "du2DiffMS", "stockCloseMS")}} required/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du1CloseMS" className="form-label">DU 1 Close*</label>
                                                                        <input type="text" className="form-control" name="du1CloseMS" id="du1CloseMS" value={editDatas.du1CloseMS} onChange={onEditChange} onInput={() => {calculateDiffMSHSD("du1OpenMS", "du1CloseMS", "du1DiffMS"), calculateStockClose("stockOpenMS", "testingMS", "du1DiffMS", "du2DiffMS", "stockCloseMS")}} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du2OpenMS" className="form-label">DU 2 Open*</label>
                                                                        <input type="text" className="form-control" name="du2OpenMS" id="du2OpenMS" value={editDatas.du2OpenMS} onChange={onEditChange} onInput={() => {calculateDiffMSHSD("du2OpenMS", "du2CloseMS", "du2DiffMS"), calculateStockClose("stockOpenMS", "testingMS", "du1DiffMS", "du2DiffMS", "stockCloseMS")}} required/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du2CloseMS" className="form-label">DU 2 Close*</label>
                                                                        <input type="text" className="form-control" name="du2CloseMS" id="du2CloseMS" value={editDatas.du2CloseMS} onChange={onEditChange} onInput={() => {calculateDiffMSHSD("du2OpenMS", "du2CloseMS", "du2DiffMS"), calculateStockClose("stockOpenMS", "testingMS", "du1DiffMS", "du2DiffMS", "stockCloseMS")}} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du1DiffMS" className="form-label">DU 1 Diff.</label>
                                                                        <input type="text" className="form-control" name="du1DiffMS" id="du1DiffMS" value={editDatas.du1DiffMS} onChange={onEditChange} disabled/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du2DiffMS" className="form-label">DU 2 Diff.</label>
                                                                        <input type="text" className="form-control" name="du2DiffMS" id="du2DiffMS" value={editDatas.du2DiffMS} onChange={onEditChange} disabled/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="meterRateMS" className="form-label">Meter Rate*</label>
                                                                        <input type="text" className="form-control" name="meterRateMS" id="meterRateMS" value={editDatas.meterRateMS} onChange={onEditChange} onInput={() => {calculateReadingCash("du1DiffMS", "du2DiffMS", "testingMS", "meterRateMS", "readingCashMS"); calculateTotalReadingCash("readingCashMS", "readingCashHSD", "readingCash")}} required/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="readingCashMS" className="form-label">MS Reading Cash</label>
                                                                        <input type="text" className="form-control" name="readingCashMS" id="readingCashMS" value={editDatas.readingCashMS} onChange={onEditChange} disabled/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6" style={{backgroundColor: "lightgrey"}}>
                                                            <h4 className='text-center'>HSD</h4>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="stockOpenHSD" className="form-label">Stock Open*</label>
                                                                        <input type="text" className="form-control" name="stockOpenHSD" id="stockOpenHSD" value={editDatas.stockOpenHSD} onChange={onEditChange} required/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="stockCloseHSD" className="form-label">Stock Close</label>
                                                                        <input type="text" className="form-control" name="stockCloseHSD" id="stockCloseHSD" value={editDatas.stockCloseHSD} onChange={onEditChange} disabled/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="testingHSD" className="form-label">Testing</label>
                                                                        <input type="text" className="form-control" name="testingHSD" id="testingHSD" value={editDatas.testingHSD} onChange={onEditChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="densityHSD" className="form-label">Density</label>
                                                                        <input type="text" className="form-control" name="densityHSD" id="densityHSD" value={editDatas.densityHSD} onChange={onEditChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du1OpenHSD" className="form-label">DU 1 Open*</label>
                                                                        <input type="text" className="form-control" name="du1OpenHSD" id="du1OpenHSD" value={editDatas.du1OpenHSD} onChange={onEditChange} onInput={() => {calculateDiffMSHSD("du1OpenHSD", "du1CloseHSD", "du1DiffHSD"), calculateStockClose("stockOpenHSD", "testingHSD", "du1DiffHSD", "du2DiffHSD", "stockCloseHSD")}} required/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du1CloseHSD" className="form-label">DU 1 Close*</label>
                                                                        <input type="text" className="form-control" name="du1CloseHSD" id="du1CloseHSD" value={editDatas.du1CloseHSD} onChange={onEditChange} onInput={() => {calculateDiffMSHSD("du1OpenHSD", "du1CloseHSD", "du1DiffHSD"), calculateStockClose("stockOpenHSD", "testingHSD", "du1DiffHSD", "du2DiffHSD", "stockCloseHSD")}} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du2OpenHSD" className="form-label">DU 2 Open*</label>
                                                                        <input type="text" className="form-control" name="du2OpenHSD" id="du2OpenHSD" value={editDatas.du2OpenHSD} onChange={onEditChange} onInput={() => {calculateDiffMSHSD("du2OpenHSD", "du2CloseHSD", "du2DiffHSD"), calculateStockClose("stockOpenHSD", "testingHSD", "du1DiffHSD", "du2DiffHSD", "stockCloseHSD")}} required/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du2CloseHSD" className="form-label">DU 2 Close*</label>
                                                                        <input type="text" className="form-control" name="du2CloseHSD" id="du2CloseHSD" value={editDatas.du2CloseHSD} onChange={onEditChange} onInput={() => {calculateDiffMSHSD("du2OpenHSD", "du2CloseHSD", "du2DiffHSD"), calculateStockClose("stockOpenHSD", "testingHSD", "du1DiffHSD", "du2DiffHSD", "stockCloseHSD")}} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du1DiffHSD" className="form-label">DU 1 Diff.</label>
                                                                        <input type="text" className="form-control" name="du1DiffHSD" id="du1DiffHSD" value={editDatas.du1DiffHSD} onChange={onEditChange} disabled/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="du2DiffHSD" className="form-label">DU 2 Diff.</label>
                                                                        <input type="text" className="form-control" name="du2DiffHSD" id="du2DiffHSD" value={editDatas.du2DiffHSD} onChange={onEditChange} disabled/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="meterRateHSD" className="form-label">Meter Rate*</label>
                                                                        <input type="text" className="form-control" name="meterRateHSD" id="meterRateHSD" value={editDatas.meterRateHSD} onChange={onEditChange} onInput={() => {calculateReadingCash("du1DiffHSD", "du2DiffHSD", "testingHSD", "meterRateHSD", "readingCashHSD"); calculateTotalReadingCash("readingCashMS", "readingCashHSD", "readingCash")}} required/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="readingCashHSD" className="form-label">HSD Reading Cash</label>
                                                                        <input type="text" className="form-control" name="readingCashHSD" id="readingCashHSD" value={editDatas.readingCashHSD} onChange={onEditChange} disabled/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="mb-3">
                                                                <label htmlFor="phonePe" className="form-label">Phonepe</label>
                                                                <input type="text" className="form-control" name="phonePe" id="phonePe" value={editDatas.phonePe} onChange={onEditChange} onInput={() => {calculateTotalShiftCollection(), calculateGrandTotal()}} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="pos" className="form-label">POS</label>
                                                                <input type="text" className="form-control" name="pos" id="pos" value={editDatas.pos} onChange={onEditChange} onInput={() => {calculateTotalShiftCollection(), calculateGrandTotal()}}/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="remark" className="form-label">Remark</label>
                                                                <input type="text" className="form-control" name="remark" id="remark" value={editDatas.remark} onChange={onEditChange} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="mb-3">
                                                                <label htmlFor="cash" className="form-label">Cash</label> <br />
                                                                2000 * <input type="number" className='my-1' name="cash2000" id="cash2000" onInput={() => {calculateResult(2000, "cash2000", "totalCash2000"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash2000" id="totalCash2000" disabled /> <br />
                                                                500 &nbsp; * <input type="number" className='my-1' name="cash500" id="cash500" onInput={() => {calculateResult(500, "cash500", "totalCash500"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash500" id="totalCash500" disabled /> <br />
                                                                200 &nbsp; * <input type="number" className='my-1' name="cash200" id="cash200" onInput={() => {calculateResult(200, "cash200", "totalCash200"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash200" id="totalCash200" disabled /> <br />
                                                                100 &nbsp; * <input type="number" className='my-1' name="cash100" id="cash100" onInput={() => {calculateResult(100, "cash100", "totalCash100"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash100" id="totalCash100" disabled /> <br />
                                                                50 &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash50" id="cash50" onInput={() => {calculateResult(50, "cash50", "totalCash50"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash50" id="totalCash50" disabled /> <br />
                                                                20 &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash20" id="cash20" onInput={() => {calculateResult(20, "cash20", "totalCash20"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash20" id="totalCash20" disabled /> <br />
                                                                10 &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash10" id="cash10" onInput={() => {calculateResult(10, "cash10", "totalCash10"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash10" id="totalCash10" disabled /> <br />
                                                                5 &nbsp; &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash5" id="cash5" onInput={() => {calculateResult(5, "cash5", "totalCash5"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash5" id="totalCash5" disabled /> <br />
                                                                2 &nbsp; &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash2" id="cash2" onInput={() => {calculateResult(2, "cash2", "totalCash2"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash2" id="totalCash2" disabled /> <br />
                                                                1 &nbsp; &nbsp; &nbsp;  * <input type="number" className='my-1' name="cash1" id="cash1" onInput={() => {calculateResult(1, "cash1", "totalCash1"), calculateTotalShiftCollection(), calculateGrandTotal()}} /> = <input type="text" name="totalCash1" id="totalCash1" disabled /> <br />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label htmlFor="totalCash" className="form-label">Total Cash</label>
                                                                <input type="text" className="form-control" name="totalCash" id="totalCash" value={editDatas.totalCash} onChange={onEditChange} disabled/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="readingCash" className="form-label">Total Reading Cash</label>
                                                                <input type="text" className="form-control" name="readingCash" id="readingCash" value={editDatas.readingCash} onChange={onEditChange} disabled/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="totalShiftCollection" className="form-label">Total Shift Collection</label>
                                                                <input type="text" className="form-control" name="totalShiftCollection" id="totalShiftCollection" value={editDatas.totalShiftCollection} onChange={onEditChange} disabled/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="grandTotal" className="form-label">Grand Total</label>
                                                                <input type="text" className="form-control" name="grandTotal" id="grandTotal" value={editDatas.grandTotal} onChange={onEditChange} disabled/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div>
                                                    <button onClick={addOldRow} className='btn btn-outline-dark my-2'>Old Collection <i className="bi bi-plus-square"></i></button>
                                                    {oldRows.map((row, index) => (
                                                        <div key={index} className="input-group my-2">
                                                        <span className="input-group-text">Old Collection</span>
                                                        <input type="text" placeholder="Old Credit/Loan Amount" className="form-control" name="oldCredit" id="oldCredit" value={editDatas?.shiftEntryList?.[index]?.oldCredit || ''} onChange={(e) => onEditChange(e, index)} />
                                                        <input type="text" placeholder="Old Cash Collection Name" className="form-control" name="oldCollectionName" id="oldCollectionName" value={editDatas?.shiftEntryList?.[index]?.oldCollectionName || ''} onChange={(e) => onEditChange(e, index)} onInput={() => calculateGrandTotal()} />
                                                        <input type="date" placeholder="Old Cash Collection Date" className="form-control" name="oldDate" id="oldDate" value={editDatas?.shiftEntryList?.[index]?.oldDate == '0000-00-00' ? "" : editDatas?.shiftEntryList?.[index]?.oldDate} onChange={(e) => onEditChange(e, index)} />
                                                        <button onClick={() => deleteOldRow(index)} className='btn btn-outline-dark'><i className="bi bi-x"></i></button>
                                                        </div>
                                                    ))}
                                                    </div>
                                                    <div>
                                                    <button onClick={addNewRow} className="btn btn-outline-dark my-2">New Credit <i className="bi bi-plus-square"></i></button>
                                                    {newRows.map((row, index) => (
                                                        <div key={index} className="input-group my-2">
                                                            <span className="input-group-text">New Credit</span>
                                                            <input type="text" placeholder="Today's Credit/Loan Amount" className="form-control" name="newCredit" id="newCredit" value={editDatas?.shiftEntryList?.[index]?.newCredit || ''} onChange={(e) => onEditChange(e, index)} onInput={()=> {calculateTotalShiftCollection(), calculateGrandTotal()}} />
                                                            <input type="text" placeholder="Borrower's Name" className="form-control" name="borrowerName" id="borrowerName" value={editDatas?.shiftEntryList?.[index]?.borrowerName || ''} onChange={(e) => onEditChange(e, index)} />
                                                            <input type="text" placeholder="Borrower's Mobile No." className="form-control" name="borrowerMobileNo" id="borrowerMobileNo" value={editDatas?.shiftEntryList?.[index]?.borrowerMobileNo || ''} onChange={(e) => onEditChange(e, index)} />
                                                            <button onClick={() => deleteNewRow(index)} className='btn btn-outline-dark'><i className="bi bi-x"></i></button>
                                                        </div>
                                                    ))}
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
                            </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div> : "" }
    </div> : ""


  )
}

export default ShiftEntry
