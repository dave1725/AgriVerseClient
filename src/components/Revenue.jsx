import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import ApexCharts from "apexcharts";
import { PieChart } from '@mui/x-charts/PieChart';

import {
  ResponsiveContainer,
  Pie,
  Cell,
  BarChart,
  LineChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Sector,
  Line,
  Label,
} from "recharts";

// Link for rechards doc : https://dev.to/salehmubashar/charts-in-react-js-a-complete-guide-570g


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Revenue() {

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const [produces, setProduces] = useState([]);
  const [stakes, setStakes] = useState([]);
  const [revenue,setRevenue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const farmer = localStorage.getItem("user");

  useEffect(() => {
    axios.post('https://agriverse-4.onrender.com/getOrders', { farmer })
      .then(response => {
        console.log(response.data);
        // Format order_date values
        const formattedProduces = response.data.map(produce => ({
          ...produce,
          order_date: new Date(new Date(produce.order_date).getTime() + 24 * 60 * 60 * 1000)
          .toISOString().split('T')[0]
        }));
        setProduces(formattedProduces);
        setIsLoading(false); // Set loading state to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set loading state to false if an error occurs
      });

      axios.post('https://agriverse-4.onrender.com/getStakes', {farmer})
      .then((res)=>{
        if(res){
          console.log(res);
          setStakes(res.data);
          setIsLoading(false);
          console.log(stakes)
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      })

      axios.post("https://agriverse-4.onrender.com/getRevenue",{farmer})
      .then((res)=>{
        if(res){
          console.log(res);
          setRevenue(res.data);
          setIsLoading(false);
          console.log(revenue);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
    }, [farmer]);

  const transformedData = revenue.map(entry => ({
    "label": entry.crop_name,
    "value": entry.revenue,
  }));

  console.log(transformedData);

  return (
    <>
      <Navbar />
      <div className="farm-dashboard">
        <Sidebar type="4" />
        <div className="farm-content">
          <div className="farm-outer">
            <div className="farm-inner">
              <div className="farm-header">
                <h1>Your Dashboard!</h1>
                <p>One-stop analysis to manage your revenue</p>
                <br /><hr />
              </div>
              <div className="charts-container">
                {/* Line Chart */}
                <div className="line-chart">
                  <h3>Cummulative Sales traffic</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={produces}>
                      {/* <Bar dataKey="crops_sold" fill="#8884d8" /> */}
                      <XAxis dataKey="order_date" />
                      <YAxis />
                      <Line dataKey="crops_sold" />
                      <Legend />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div><br></br>
                {/* Pie Chart */}
                <div className="pie-chart">
                  <h3>Revenue Distribution</h3>
                  <ResponsiveContainer width="100%" height={200}>
                  
                    <PieChart
                    
                    series={[
                      {
                        data: transformedData,
                      },
                    ]}
                      width={400}
                      height={200}
                    >
                    
                    </PieChart>

                  </ResponsiveContainer>
                  {/*Bar Chart*/}
                  <div className="line-chart">
                    <h3>Stakeholder Investment Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={stakes}>
                        <Bar dataKey="sales" fill="#8884d8" /> 
                        <XAxis dataKey="stakeholder_name" />
                        <YAxis />
                        <Legend />
                        <Tooltip />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}