import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const Produces = () => {
    const [showModal, setShowModal] = useState(false);
    const [produces,setProduces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [stakeholderID,setStakeholderID] = useState("");
    const [stakeholderName,setStakeholderName] = useState("");
    const [Contact,setContact] = useState("");
    const [Order,setOrder] = useState("");
    const [CropID,setCropID] = useState("");
    const [Quantity,setQuantity] = useState();

    const farmer = localStorage.getItem("user");

    useEffect(() => {
        axios.post('https://agriverse-4.onrender.com/stakeholders', { farmer })
          .then(response => {
            console.log(response.data);
            setProduces(response.data);
            setIsLoading(false); // Set loading state to false after data is fetched
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setIsLoading(false); // Set loading state to false if an error occurs
          });
    }, [farmer,showModal]);

    const handleAddBlock = () => {
       setContact("");
       setCropID("");
       setOrder("");
       setQuantity("");
       setStakeholderID("");
       setStakeholderName("");

        if(stakeholderID === "" || stakeholderName === "" || Contact === "" || Order === ""){
            return alert("please fill all the fields");
        }
        if(Quantity === "" || CropID === ""){
            return alert("Please fill all the fields!!");
        }

        axios.post("https://agriverse-4.onrender.com/addStakeholder",{stakeholderID,stakeholderName,Contact,Order,Quantity,CropID,farmer})
        .then((res)=>{
            if(res.data === "added"){
                alert("Stakeholder added successfully!");
            }
            else{
                alert("Can't add stakeholder!!");
            }
        })
        .catch((err)=>{
            console.log(err);
            throw new Error;
        })
        setShowModal(false); // Hide the modal
    };

    const handleDeleteBlock = (index) => {
        alert("delete block");
    };

    const handleSell = (crop_id,qty,sID,sName) => {
        try {
            axios.post("https://agriverse-4.onrender.com/sellCrop",{crop_id,qty,sID,farmer,sName,Order})
            .then((res)=>{
                if(res.data === 'sold'){
                    return alert("Crop sold!!");
                }
                if(res.data === 'not enough'){
                    return alert("not enough crops");
                }
                else{
                    return alert("Unable to sell crop!!");
                }
            })
            .catch((err)=>{
                console.log(err);
                throw new Error;
            })
        } catch (error) {
            
        }
    }

    return (
        <>
            <Navbar />
            <div className="farm-dashboard">
                <Sidebar type="3"/>
                <div className="farm-content">
                    <div className="farm-outer">
                        <div className="farm-inner">
                        <div className="farm-header">
                            <h1>Your Stakeholders!</h1>
                            <p>Make sure to keep your stakeholders happy</p>
                            <div className="produces-add-block" onClick={() => setShowModal(true)}>
                                Add Stakeholder +
                            </div><br></br><hr></hr>
                        </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Stakeholder ID</th>
                                        <th>Stakeholder Name</th>
                                        <th>Contact</th>
                                        <th>Order</th>
                                        <th>Crop ID</th>
                                        <th>Quantity</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5">Loading...</td>
                                    </tr>
                                ) : (
                                    produces.map((crop, index) => (
                                        <tr key={index}> 
                                            <td>{crop.stakeholder_id}</td>
                                            <td>{crop.stakeholder_name}</td>
                                            <td>{crop.contact}</td>
                                            <td>{crop.order}</td>
                                            <td>{crop.crop_id}</td>
                                            <td>{crop.quantity}</td>
                                            <td onClick={() => handleSell(crop.crop_id,crop.quantity,crop.stakeholder_id,crop.stakeholder_name)} className="sell-button"><button>SELL</button></td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Adding your stakeholder!</h2>
                        <p>Tip: Make sure to check your produces in the warehouse</p>
                        <input
                            type="text"
                            value={stakeholderID}
                            onChange={(e) => setStakeholderID(e.target.value)}
                            placeholder="Stakeholder ID"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={stakeholderName}
                            onChange={(e) => setStakeholderName(e.target.value)}
                            placeholder="Stakeholder Name"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={Contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Contact"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={Order}
                            onChange={(e) => setOrder(e.target.value)}
                            placeholder="Order"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={CropID}
                            onChange={(e) => setCropID(e.target.value)}
                            placeholder="Crop ID"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={Quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Quantity"
                        /><br></br><br></br>
                        <button onClick={handleAddBlock}>ADD STAKE</button>
                        <button onClick={() => setShowModal(false)}>CANCEL</button>
                    </div>
                </div>
            )}
            <Footer/>
        </>
    );
}

export default Produces;
