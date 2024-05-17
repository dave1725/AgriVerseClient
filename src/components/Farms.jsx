import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import farmimg from "../assets/farm.jpg";
import { MdHeight, MdOutlineCancel } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Farms = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [farmName, setfarmName] = useState();
    const [farmID, setfarmID] = useState();
    const [farmSize,setfarmSize] = useState();
    const [location, setLocation] = useState();
    const [farms,setFarms] = useState([]);
    const [farmCost, setFarmValues] = useState([]);

    const farmerID = localStorage.getItem("user");

    useEffect(() => {
        axios.post('https://agriverse-4.onrender.com/getFarmID', { farmerID })
          .then(response => {
            console.log(response.data);
            setfarmID(response.data);
            //console.log(farmID[0].farm_id);
            const fetchedFarms = [];

            const farmRequests = response.data.map(async farm => {
                const fID = farm.farm_id;
                try {
                    const res = await axios.post('https://agriverse-4.onrender.com/getFarms', { fID });
                    return res.data.data;
                } catch (error) {
                    console.error('Error fetching farm details:', error);
                    return null;
                }
            });

            const farmValues = response.data.map(async farm => {
                const fID = farm.farm_id;
                try{
                    const res = await axios.post('https://agriverse-4.onrender.com/getValue',{fID});
                    console.log(res.data);
                    return res.data;
                }
                catch(error){
                    console.error("error : " + error);
                    return null;
                }
            })

            // Wait for all requests to finish
            Promise.all(farmRequests)
                .then(fetchedFarms => {
                    console.log(fetchedFarms);
                    setFarms(fetchedFarms.filter(farm => farm !== null));
                })
                .catch((error) => {
                    console.error('Error fetching farm details:', error);
                });

            Promise.all(farmValues)
            .then(fValues => {
                console.log(fValues);
                setFarmValues(fValues.filter(farmCost => farmCost !== null));
            })
            .catch((error) => {
                console.error(error);
            })
           })

    
          .catch(error => {
            console.error('Error fetching data:', error);
          });

    }, [farmerID,showModal]);

   

    const handleAddBlock = () => {
            setLocation("");
            setfarmID("");
            setfarmSize("");
            setfarmName("");
            setShowModal(false); 

            axios.post("https://agriverse-4.onrender.com/addFarm",{farmName,farmID,farmSize,location,farmerID})
            .then((res)=>{
                alert("New Farm created!! Please refresh the page!");
                navigate('/farms');
                console.log(res);
            })
            .catch((err)=>{
                console.log("error:"+err);
                throw new Error;
            })
    };

    const handleDelete = (fID) => {
        try {
            axios.post("https://agriverse-4.onrender.com/deleteFarm",{fID})
            .then((res)=>{
                if(res.data === 'deleted'){
                    alert("farm deleted! refresh the page");
                }
                if(res.data === "failed"){
                    alert("failed to delete the farm");
                }
            })
            .catch((err)=>{
                console.log(err);
                throw new Error;
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="farm-dashboard">
                <Sidebar type="1"/>
                <div className="farm-content">
                
                    <div className="farm-outer">
                        <div className="farm-inner">
                            <div className="farm-header">
                                <h1>Welcome Farmer!</h1>
                                <p>Explore your multiverse of farms!</p>
                                <div className="add-block" onClick={() => setShowModal(true)}>
                                    Add Farm +
                                </div><br></br><hr></hr>
                            </div>
                            
                            {farms.map((farm, index) => (
                                <div key={index} className="card">
                                <div className="card-image"></div>
                                <div className="card-text">
                                  <span className="date">4 days ago</span>
                                  <h2>{farm[0].farm_name}</h2>
                                  <p>{farm[0].location}</p>
                                </div>
                                <div className="card-stats">
                                    {/* <button onClick={()=>handleEdit(farm[0].farm_id)} className="button-stats"><MdEdit size={20}/></button> */}
                                    <button onClick={()=>handleEdit(farm[0].farm_id)} className="button-stats"><strong>REMOVE</strong></button>
                                    <button onClick={()=>handleDelete(farm[0].farm_id)} className="button-stats"><MdDelete size={20}/></button><br></br>
                                  <div className="stat">
                                    <div className="value">{farm[0].farm_id}</div>
                                    <div className="type">Farm ID</div>
                                  </div>
                                  <div className="stat border">
                                    <div className="value">{farm[0].size}</div>
                                    <div className="type">Size</div>
                                  </div>
                                  <div className="stat">
                                    <div className="value">{farmCost[index]?.totalValue}</div>
                                    <div className="type">Value</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Farm</h2>
                        <p>Tip:keep your farm names as meaningfull as possible</p>
                        <input
                            type="text"
                            value={farmName}
                            onChange={(e) => setfarmName(e.target.value)}
                            placeholder="Farm Name"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={farmID}
                            onChange={(e) => setfarmID(e.target.value)}
                            placeholder="Farm ID"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={farmSize}
                            onChange={(e) => setfarmSize(e.target.value)}
                            placeholder="Farm Size"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="location"
                        /><br></br><br></br>
                        <button onClick={handleAddBlock}>ADD FARM</button>
                        <button onClick={() => setShowModal(false)}>CANCEL</button>
                    </div>
                </div>
            )}

            <Footer/>
        </>
    );
}

export default Farms;
