import React, { useState } from "react";
import SubNav from "./SubNav";
import Sidebar from "../components/farmer/Sidebar";
import "../css/bootstrap.css";
import LeftTimelineCard from "./LeftTimelineCard";
import RightTimelineCard from "./RightTimelineCard";
import NALeftCard from "./NALeftCard";
import NARightCard from "./NARightCard";
import Payment from "../../src/artifacts/contracts/Payment.sol/Payment.json";
import { ethers } from "ethers";
import { Logger } from "ethers/lib/utils";
import { useSelector } from "react-redux";
import { dbActions } from "../store/dbSlice";
import '../css/trackstatus.css'
function TrackStatus() {
  const [id, setId] = useState("");
  const paymentAddress = useSelector((state) => state.db.address);
  const data = [
    {
      title: "Farm-Inspector",
      admin: "3314c3158152d0b40DE2",
      farm: "Nashik",
      farmer: "Mohit",
      exporter: "Sarvesh",
      transaction: "1234556",
    },
    {
      title: "Farm-Inspector",
      admin: "3314c3158152d0b40DE2",
      farm: "Nashik",
      farmer: "Mohit",
      exporter: "Sarvesh",
      transaction: "1234556",
    },
    {
      title: "Farm-Inspector",
      admin: "3314c3158152d0b40DE2",
      farm: "Nashik",
      farmer: "Mohit",
      exporter: "Sarvesh",
      transaction: "1234556",
    },
    {
      title: "Farm-Inspector",
      admin: "3314c3158152d0b40DE2",
      farm: "Nashik",
      farmer: "Mohit",
      exporter: "Sarvesh",
      transaction: "1234556",
    },
  ];

  let i = 0;

  const list = data.map((d) => {
    if (i % 2 === 0) {
      i++;
      return (
        <LeftTimelineCard
          admin={d.admin}
          title={d.title}
          transaction={d.transaction}
          farmer={d.farmer}
          farm={d.farm}
          exporter={d.exporter}
        ></LeftTimelineCard>
      );
    }
    i++;
    return (
      <RightTimelineCard
        admin={d.admin}
        title={d.title}
        transaction={d.transaction}
        farmer={d.farmer}
        farm={d.farm}
        exporter={d.exporter}
      ></RightTimelineCard>
    );
  });
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
  };
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
          <NALeftCard />
          <NARightCard />
        </div>
      </div>
    </div>
  );
}

export default TrackStatus;
