import React, { useState } from "react";
import SubNav from "./SubNav";
import Sidebar from "../components/farmer/Sidebar";
import "../css/bootstrap.css";
import LeftTimelineCard from "./LeftTimelineCard";
import RightTimelineCard from "./RightTimelineCard";
import Payment from "../../src/artifacts/contracts/Payment.sol/Payment.json";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import '../css/trackstatus.css'
import axios from "axios";

function TrackStatus() {
  const [id, setId] = useState("");
  const paymentAddress = useSelector((state) => state.db.address);
  const [results, setResults] = useState([]);

  const lotId = async (e) => {
    setId(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(id);

    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(
        paymentAddress,
        Payment.abi,
        provider
      );
      try {
        const data = await contract.getStatus(id);
        const no = parseInt(data._hex, 16);
        console.log(no);
        setId("");
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  };

  async function loadData() {
    let res = [];
    await axios.get(`http://localhost:3001/getData/${id}`)
      .then(async (response) => {
        setResults(await getArray(response.data));
        console.log(response.data);
      });
  }

  async function getArray(arr) {
    let res = [];
    for (const obj of arr) {
      for (const jso of obj) {
        res.push(jso);
      }
    }

    return res;
  }

  let i = 0;

  const list = results.map((d) => {
    if (i % 2 === 0) {
      i++;
      return (
        <LeftTimelineCard
          public_key={d.public_key}
          name={d.name}
          role={d.role}
          contact={d.contact}
          address={d.address}
        ></LeftTimelineCard>
      );
    }
    i++;
    return (
      <RightTimelineCard
        public_key={d.public_key}
        name={d.name}
        role={d.role}
        contact={d.contact}
        address={d.address}
      ></RightTimelineCard>
    );
  });

  return (
    <div className="home-body">
      <div className="left-body">
        <Sidebar status="1"></Sidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Track Status"></SubNav>
        <div className="broadcast-body">
          <h3>Batch Report</h3>
          <form onSubmit={submitHandler} className='lot-form'>
            <div className="input-group input-group-outline mb-3 mr-4 lot-field">
              <input type="number" required value={id} onChange={lotId} className="form-control" placeholder='Enter lotID' />
            </div>
            <div>
              <div className="text-center">
                <button type="submit" name="broadcastCrop"
                  className="btn btn-m bg-gradient-info mb-0">Predict Crop</button>
              </div>
            </div>
          </form>
          {list}
        </div>
      </div>
    </div>
  );
}

export default TrackStatus;
