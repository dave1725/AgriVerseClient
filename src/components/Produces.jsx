import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Produces = () => {
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [produces,setProduces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [produceID,setProduceID] = useState("");
    const [produceName,setProduceName] = useState("");
    const [Quantity,setQuantity] = useState("");
    const [Price,setPrice] = useState("");
    const [Category,setCategory] = useState("");
    const [farmID,setfarmID] = useState();

    const farmer = localStorage.getItem("user");

    useEffect(() => {
        axios.post('https://agriverse-4.onrender.com/produces', { farmer })
          .then(response => {
            console.log(response.data);
            setProduces(response.data.data);
            setIsLoading(false); // Set loading state to false after data is fetched
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setIsLoading(false); // Set loading state to false if an error occurs
          });
    }, [farmer,showModal,editModal]);

    const handleAddBlock = () => {
        setPrice("");
        setProduceID("");
        setCategory("");
        setProduceName("");
        setfarmID("");
        setQuantity("");

        if(produceID === "" || produceName === "" || Category === "" || Price === ""){
            return alert("please fill all the fields");
        }
        if(Quantity === "" || farmID === ""){
            return alert("Please fill all the fields!!");
        }

        axios.post("https://agriverse-4.onrender.com/addCrop",{produceID,produceName,Category,Price,Quantity,farmID,farmer})
        .then((res)=>{
            if(res.data === "added"){
                alert("Crop added successfully!");
            }
            else{
                alert("Can't add Crop : Make sure the farm exists!");
            }
        })
        .catch((err)=>{
            console.log(err);
            throw new Error;
        })
        setShowModal(false); // Hide the modal
    };

    const handleEditCrop = () => {
        setPrice("");
        setProduceID("");
        setCategory("");
        setProduceName("");
        setfarmID("");
        setQuantity("");

        if(produceID === "" || produceName === "" || Category === "" || Price === ""){
            return alert("please fill all the fields");
        }
        if(Quantity === "" || farmID === ""){
            return alert("Please fill all the fields!!");
        }
        const cID = localStorage.getItem("cropID");
    
        axios.post("https://agriverse-4.onrender.com/editCrop",{cID,produceID,produceName,Category,farmID,Price,Quantity})
        .then((res)=>{
            console.log(res);
            if(res.data === "failed"){
                setEditModal(false);
                return alert("Check if farm exist!!");
            }
            if(res){
                setEditModal(false);
                return alert("edit successfull! Please refresh!");
            }
        })
        .catch((err)=>{
            alert("Can't react Server!!");
        })
    }

    const handleEdit = (crop_id) => {
        setEditModal(true);
        localStorage.setItem("cropID",crop_id);
    }

    const handleDeleteBlock = (crop_id) => {
        try {
            axios.post("https://agriverse-4.onrender.com/deleteCrop",{crop_id})
            .then((res) => {
                if(res.data === "deleted"){
                    return alert("Crop removed successfully!");
                }
                else{
                    return alert("Something went wrong!");
                }
            })
        } catch (error) {
            console.log(error);
            throw new Error;
        }
    };

    return (
        <>
            <Navbar />
            <div className="farm-dashboard">
                <Sidebar type="2"/>
                <div className="farm-content">
                    <div className="farm-outer">
                        <div className="farm-inner">
                        <div className="farm-header">
                            <h1>Your Produces!</h1>
                            <p>Manage your Produces accross your farms!</p>
                            <div className="produces-add-block" onClick={() => setShowModal(true)}>
                                Add Crops +
                            </div><br></br><hr></hr>
                        </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Produce ID</th>
                                        <th>Farm ID</th>
                                        <th>Produce Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th></th>
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
                                            <td>{crop.crop_id}</td>
                                            <td>{crop.farm_id}</td>
                                            <td>{crop.crop_name}</td>
                                            <td>{crop.category}</td>
                                            <td>{crop.price_per_unit}</td>
                                            <td>{crop.quantity}</td>
                                            <td className="sell-button"><button onClick={()=>handleEdit(crop.crop_id)}><MdEdit /></button></td>
                                            <td className="sell-button"><button onClick={()=>handleDeleteBlock(crop.crop_id)}><MdDelete /></button></td>
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
                        <h2>Let's add your crop!</h2>
                        <p>Tip: Make sure you have created your farm</p>
                        <input
                            type="text"
                            value={produceID}
                            onChange={(e) => setProduceID(e.target.value)}
                            placeholder="Produce ID"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={farmID}
                            onChange={(e) => setfarmID(e.target.value)}
                            placeholder="Farm ID"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={produceName}
                            onChange={(e) => setProduceName(e.target.value)}
                            placeholder="Crop Name"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={Category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Crop Category"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={Price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={Quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Quantity"
                        /><br></br><br></br>
                        <button onClick={handleAddBlock}>ADD CROP</button>
                        <button onClick={() => setShowModal(false)}>CANCEL</button>
                    </div>
                </div>
            )}

            {editModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Produce Data</h2>
                        <p>Tip: Make sure the farmID exists!</p>
                        <input
                            type="text"
                            value={produceID}
                            onChange={(e) => setProduceID(e.target.value)}
                            placeholder="Produce ID"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={farmID}
                            onChange={(e) => setfarmID(e.target.value)}
                            placeholder="Farm ID"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={produceName}
                            onChange={(e) => setProduceName(e.target.value)}
                            placeholder="Crop Name"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={Category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Crop Category"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={Price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                        /><br></br><br></br>
                        <input
                            type="text"
                            value={Quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Quantity"
                        /><br></br><br></br>
                        <button onClick={handleEditCrop}>EDIT CROP</button>
                        <button onClick={() => setEditModal(false)}>CANCEL</button>
                    </div>
                </div>
            )}
            <Footer/>
        </>
    );
}

export default Produces;
