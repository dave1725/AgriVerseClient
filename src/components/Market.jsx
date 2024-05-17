import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import turmeric from "../assets/turmeric.jpeg";
import white from "../assets/whitepumpkin.jpeg";
import tomato from "../assets/tomato.jpeg";
import sweet from "../assets/sweetpotato.jpeg";
import sugarcane from "../assets/sugarcane.jpg";
import sugar from "../assets/sugar.jpeg";
import grapes from "../assets/grapes.jpeg";

//link for api : https://data.gov.in/apis?page=3

const Market = () => {
    const [crops, setCrops] = useState([]);
    const images = [turmeric,white,tomato,sweet,sugarcane,sugar,grapes];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    axios.get("https://api.data.gov.in/resource/adf1a9ed-5032-4631-a527-a45ad898d9bd?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json"),
                    axios.get("https://api.data.gov.in/resource/85aa3278-7cf0-447c-af99-76752069f3e9?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json"),
                    axios.get("https://api.data.gov.in/resource/a31be25c-b4fa-4503-acb5-8b7590863546?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json"),
                    axios.get("https://api.data.gov.in/resource/b847ae60-9c6e-4070-820a-51542e0516d9?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json"),
                    axios.get("https://api.data.gov.in/resource/e1b78bc3-274f-4d84-b804-6aca52f6efbc?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json"),
                    axios.get("https://api.data.gov.in/resource/cec274e8-8f62-4db9-a21a-3ad86cbd5bb5?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json"),
                    axios.get("https://api.data.gov.in/resource/ef33ae01-af39-44b5-900e-0a3f5d481c3f?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json"),
                    
                ]);
    
                const allRecords = responses.flatMap(response => response.data.records[1]);
                if(allRecords.length > 0) {
                    setCrops(allRecords);
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
    }, []); 

    return (
        <>
        <Navbar />
        <h2 className="market-title">Current Market Trends!</h2>
        <div className='underline'></div>
        <div className="market-section">
            {crops.map((crop,index) => (
                <div className="crop-card" key={index}>
                    <img src={images[index]} alt={crop.name} />
                    <h3>{crop.commodity}</h3>
                    <p>Min Price: {crop.min_price} per Quintal</p>
                    <p>Max Price: {crop.max_price} per Quintal</p>
                    <p>Modal Price: {crop.modal_price} per Quintal</p>
                </div>
            ))}
        </div>
        </>
    );
};

export default Market;
