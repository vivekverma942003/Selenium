import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
    const [data, setData] = useState(null);

    const handleClick = async () => {
        const response = await axios.get('http://localhost:5000/api/scrape');
        setData(response.data);
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Twitter Trending Topics</h1>
            <button className="fetch-button" onClick={handleClick}>Fetch Trends</button>
            {data && (
                <div className="trending-container">
                    <p className="timestamp">As of {new Date(data.timestamp).toLocaleString()}</p>
                    <ul className="trends-list">
                        <li className="trend-item">Topic 1   {data.trend1}</li>
                        <li className="trend-item"> Topic 2   {data.trend2}</li>
                        <li className="trend-item">{data.trend3}</li>
                        <li className="trend-item">{data.trend4}</li>
                        <li className="trend-item">{data.trend5}</li>
                    </ul>
                    <p className="ip-address">IP Address: {data.ipAddress}</p>
                </div>
            )}
        </div>
    );
}

export default App;
