import React, { useEffect, useState } from "react";
import "../../css/bootstrap.css";
import "../../css/admin.css";
import qr from "../../images/qr.png";
import block from "../../images/logo-ct.png";
import { useDispatch, useSelector } from "react-redux";
import Verification from "./Verification";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import Payment from '../../../src/artifacts/contracts/Payment.sol/Payment.json';

function Admin() {

  const [count, setCount] = useState(0);
  const paymentAddress = useSelector((state) => state.db.address);
  const [result, setResult] = useState([]);
  const [test, setTest] = useState([]);
  let track = 0;
  useEffect(() => {
    axios.get(`http://localhost:3001/countofusers`)
      .then((response) => {
        setCount(response.data[0].count);
      })
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/getAllCrops`)
      .then((response) => {
        setResult(response.data);
        getTrackingStatus()
      })
  })

  const getTrackingStatus = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      paymentAddress,
      Payment.abi,
      provider
    );
    let arr = []
    for (let i in result) {
      // console.log(i);
      const data = await contract.getStatus(result[i].id);
      const num = parseInt(data._hex, 16);
      arr.push({
        id: result[i].id,
        val: num
      });
    }
    setTest(arr);
  }


  const list = test.map((ele) => {
    let a = ele.id;
    let b = ele.val;
    return (
      <tr>
        <td className="text-center">{a}</td>
        <td className="text-center">
          <span className={b === 0 ? 'badge bg-warning' : 'badge bg-success'}>
            {b === 0 ? 'Processing' : 'Completed'}
          </span>
        </td>
        <td className="text-center">
          <span className={b === 1 ? 'badge bg-warning' : b < 1 ? 'badge bg-danger' : 'badge bg-success'}>
            {b === 1 ? 'Processing' : b < 1 ? 'Not Available' : 'Completed'}
          </span>
        </td>
        <td className="text-center">
          <span className={b === 2 ? 'badge bg-warning' : b < 2 ? 'badge bg-danger' : 'badge bg-success'}>
            {b === 2 ? 'Processing' : b < 2 ? 'Not Available' : 'Completed'}
          </span>
        </td>
        <td className="text-center">
          <span className={b === 3 ? 'badge bg-warning' : b < 3 ? 'badge bg-danger' : 'badge bg-success'}>
            {b === 3 ? 'Processing' : b < 3 ? 'Not Available' : 'Completed'}
          </span>
        </td>
        <td className="text-center">
          <span className={b === 4 ? 'badge bg-success' : 'badge bg-danger'}>
            {b === 4 ? 'Sold' : 'Not Sold'}
          </span>
        </td>
        <td className="text-center">
          <a
            href="#"
            className="btn btn-simple btn-info btn-icon like"
          >
            <i className="material-icons">visibility</i>
          </a>
        </td>
      </tr >
    );
  });

  return (
    <div>
      {/* navbar to display admin dashboard */}
      <nav className="navbar navbar-expand-lg navbar-danger bg-danger">
        <img
          src={block}
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />
        &nbsp;&nbsp;
        <a className="navbar-brand" href="/admin">
          <h5>Admin panel</h5>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/admin/verification">
                <h1>Verification</h1>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* navbar ends */}

      {/* 3 cards in a row to display total users, total roles and total batches */}
      <div className="container-fluid spaci">
        <div className="row">
          <div className="col-md-4">
            <div className="card card-track choti">
              <div className="card-header moti" data-background-color="orange">
                <h2 className="category">Total Users</h2>
                <hr />
              </div>
              <div className="card-content">
                <div className="row">
                  <div className="col-md-4 badal">
                    <i className="material-icons badal icon-blue">person</i>
                  </div>
                  <div className="col-md-6 text-right bajul">
                    <h1 className="title">{count}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-track choti">
              <div className="card-header moti" data-background-color="green">
                <h2 className="category">Total Roles</h2>
                <hr />
              </div>
              <div className="card-content">
                <div className="row">
                  <div className="col-md-4 badal">
                    <i className="material-icons badal icon-green">school</i>
                  </div>
                  <div className="col-md-6 text-right bajul">
                    <h1 className="title">6</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-track choti">
              <div className="card-header moti" data-background-color="red">
                <h2 className="category">Total Batches</h2>
                <hr />
              </div>
              <div className="card-content">
                <div className="row">
                  <div className="col-md-4 badal">
                    <i className="material-icons badal icon-purple">
                      description
                    </i>
                  </div>
                  <div className="col-md-6 text-right bajul">
                    <h1 className="title">1</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid tabla">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div
                className="card-header card-header-icon koti"
                data-background-color="rose"
              >
                <h2>Products OVERVIEW</h2>
              </div>
              <div className="card-content">
                <div className="material-datatables">
                  <table
                    id="datatables"
                    className="table table-striped table-no-bordered table-hover"
                    cellSpacing="0"
                    width="100%"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th className="text-center">Product Id</th>
                        <th className="text-center">Broadcast</th>
                        <th className="text-center">Farm Inspection</th>
                        <th className="text-center">Processor</th>
                        <th className="text-center">Retailer</th>
                        <th className="text-center">Consumer</th>
                        <th className="disabled-sorting text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {list}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container-fluid">
                <div className="row bg-title">
                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 className="page-title">Dashboard</h4>
                    </div>
                    <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-info" id="divOngoingTransaction" style="display: none">Ongoing Transaction: <span id="linkOngoingTransaction">None</span> </div>
                    </div>    
                </div>

                <div className="row">
                    <div className="col-lg-4 col-sm-6 ">
                        <div className="white-box">
                            <h3 className="box-title">Users</h3>
                            <ul className="list-inline two-part">
                                <li><i className="icon-user text-info"></i></li>
                                <li className="text-right"><span className="counter text-info" id="totalUsers">0</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 ">
                        <div className="white-box">
                            <h3 className="box-title">Total Roles</h3>
                            <ul className="list-inline two-part">
                                <li><i className="icon-graduation text-purple"></i></li>
                                <li className="text-right "><span className="counter text-purple">5</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 ">
                        <div className="white-box">
                            <h3 className="box-title">Total Batches</h3>
                            <ul className="list-inline two-part">
                                <li><i className="icon-doc text-success"></i></li>
                                <li className="text-right"><span className="counter text-success" id="totalBatch">0</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <div className="white-box">
                             <a href="javascript:void(0);" className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" onclick="javascript:$('#batchFormModel').modal();">Create Batch</a>
                            <h3 className="box-title">Batches Overview</h3> 
                            <div className="table-responsive">
                                <table className="table product-overview" id="adminCultivationTable">
                                    <thead>
                                        <tr>
                                            <th>Batch ID</th>
                                            <th>QR-Code</th>
                                            <th>Farm Inspector</th>
                                            <th>Harvester</th>
                                            <th>Exporter</th>
                                            <th>Importer</th>
                                            <th>Processor</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                         <tr>
                                             <td colspan="7" align="center">No Data Available</td>
                                         </tr>   
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <div className="white-box">
                            <h3 className="box-title">Your Address <i className="fa fa-qrcode fa-2x text-success"></i></h3>
                            <ul className="list-inline two-part">
                                <li className="text-right" id="currentUserAddress">0x0000000000000000000000000000000000000000</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <div className="white-box">
                           <h3 className="box-title">Storage Contract Address <i className="fa fa-qrcode fa-2x text-danger"></i></h3>
                            <ul className="list-inline two-part">
                                <li className="text-right" id="storageContractAddress">0x0000000000000000000000000000000000000000</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <div className="white-box">
                            <h3 className="box-title">Coffee Supplychain Contract Address <i className="fa fa-qrcode fa-2x text-info"></i></h3>
                            <ul className="list-inline two-part">
                                <li className="text-right" id="coffeeSupplychainContractAddress">0x0000000000000000000000000000000000000000</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <div className="white-box">
                           <h3 className="box-title">User Contract Address <i className="fa fa-qrcode fa-2x text-info"></i></h3>
                            <ul className="list-inline two-part">
                                <li className="text-right" id="userContractAddress">0x0000000000000000000000000000000000000000</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 col-lg-4 col-sm-12">
                        <div className="white-box">
                            <h3 className="box-title">User Roles</h3> 
                            <div className="table-responsive">
                                <table className="table product-overview">
                                    <thead>
                                        <tr>
                                            <th>Role Name</th>
                                            <th>Role Slug</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Farm Inspection</td>
                                            <td><span className="label label-info font-weight-100">FARM_INSPECTION</span></td>
                                        </tr>
                                         <tr>
                                            <td>Harvester</td>
                                            <td><span className="label label-success font-weight-100">HARVESTER</span></td>
                                        </tr>
                                        <tr>
                                            <td>Exporter</td>
                                            <td><span className="label label-warning font-weight-100">EXPORTER</span></td>
                                        </tr>
                                        <tr>
                                            <td>Importer</td>
                                            <td><span className="label label-danger font-weight-100">IMPORTER</span></td>
                                        </tr>
                                        <tr>
                                            <td>Processor</td>
                                            <td><span className="label label-primary font-weight-100">PROCESSOR</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-8 col-sm-12">
                        <div className="white-box">
                             <a href="javascript:void(0);" id="userFormClick" className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light">Create User</a>
                            <h3 className="box-title">Users</h3> 
                            <div className="table-responsive">
                                <table className="table product-overview table-responsive" id="tblUser">
                                    <thead>
                                        <tr>
                                            <th>User Address</th>
                                            <th>Name</th>
                                            <th>Contact No.</th>
                                            <th>Role</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
  
            </div> */}

      {/* <div id="batchFormModel" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none; padding-top: 170px;">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h2 className="modal-title">Add Batch</h2>
                        </div>
                        <form id="batchForm" onsubmit="return false;">
                            <div className="modal-body">
                                <fieldset style="border:0;">
                                    <div className="form-group">
                                        <label className="control-label" for="farmerRegistrationNo">Farmer Registration No <i className="red">*</i></label>
                                        <input type="text" className="form-control" id="farmerRegistrationNo" name="farmerRegistrationNo" placeholder="Registration No" data-parsley-required="true"/>
                                    </div> 
                                    <div className="form-group">
                                        <label className="control-label" for="farmerName">Farmer Name <i className="red">*</i></label>
                                        <input type="text" className="form-control" id="farmerName" name="farmerName" placeholder="Farmer Name" data-parsley-required="true"/>
                                    </div>                              
                                    <div className="form-group">
                                        <label className="control-label" for="farmerAddress">Farmer Address <i className="red">*</i></label>
                                        <textarea className="form-control" id="farmerAddress" name="farmerAddress" placeholder="Farmer Address" data-parsley-required="true"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label" for="exporterName">Exporter Name <i className="red">*</i></label>
                                        <input type="text" className="form-control" id="exporterName" name="exporterName" placeholder="Exporter Name" data-parsley-required="true"/>
                                    </div> 
                                    <div className="form-group">
                                        <label className="control-label" for="importerName">Importer Name <i className="red">*</i></label>
                                        <input type="text" className="form-control" id="importerName" name="importerName" placeholder="Importer Name" data-parsley-required="true"/>
                                    </div> 
                                </fieldset>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" onclick="addCultivationBatch();" className="fcbtn btn btn-primary btn-outline btn-1f">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="userFormModel" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none; padding-top: 170px;">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h2 className="modal-title" id="userModelTitle">Add User</h2>
                        </div>
                        <form id="userForm" onsubmit="return false;">
                            <div className="modal-body">  
                                    <fieldset style="border:0;">
                                        <div className="form-group">
                                            <label className="control-label" for="userWalletAddress">User Wallet Address <i className="red">*</i></label>
                                            <input type="text" className="form-control" id="userWalletAddress" name="userWalletAddress" placeholder="Wallet Address" data-parsley-required="true" minlength="42" maxlength="42"/>
                                        </div> 
                                        <div className="form-group">
                                            <label className="control-label" for="userName">User Name <i className="red">*</i></label>
                                            <input type="text" className="form-control" id="userName" name="userName" placeholder="Name" data-parsley-required="true"/>
                                        </div>                              
                                        <div className="form-group">
                                            <label className="control-label" for="userContactNo">User Contact <i className="red">*</i></label>
                                            <input type="text" className="form-control" id="userContactNo" name="userContactNo" placeholder="Contact No." data-parsley-required="true" data-parsley-type="digits" data-parsley-length="[10, 15]" maxlength="15"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label" for="userRoles">User Role <i className="red">*</i></label>
                                            <select className="form-control" id="userRoles" name="userRoles" data-parsley-required="true">
                                                <option value="">Select Role</option>
                                                <option value="FARM_INSPECTION">Farm Inspection</option>
                                                <option value="HARVESTER">Harvester</option>
                                                <option value="EXPORTER">Exporter</option>
                                                <option value="IMPORTER">Importer</option>
                                                <option value="PROCESSOR">Processor</option>
                                            </select>    
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label" for="isActive">User Status</label>
                                            <input type="checkbox" className="js-switch" data-color="#99d683" data-secondary-color="#f96262" id="isActive" name="isActive" data-size="small"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label" for="userProfileHash">Profile Image <i className="red">*</i></label>
                                            <input type="file" className="form-control" onchange="handleFileUpload(event);" />
                                            <input type="hidden" className="form-control" id="userProfileHash" name="userProfileHash" placeholder="User Profile Hash" data-parsley-required="true" />
                                            <span id="imageHash"></span>
                                        </div>
                                    </fieldset>
                                
                            </div>
                            <div className="modal-footer">
                                <i style="display: none;" className="fa fa-spinner fa-spin"></i>
                                <button type="submit" onclick="userFormSubmit();" className="fcbtn btn btn-primary btn-outline btn-1f" id="userFormBtn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> */}
    </div>
  );
}

export default Admin;
