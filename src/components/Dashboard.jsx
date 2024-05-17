import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Dashboard = () => {
    return (
        <>
            <Navbar/>
            <div className="dashboard">
                <Sidebar />
                <div className="dashboard-content">
                    <div className="dashboard-outer">
                        <div className="dashboard-inner">
                            <h1>Welcome Farmer!</h1>
                            <p>Your Farm is waiting!</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;
