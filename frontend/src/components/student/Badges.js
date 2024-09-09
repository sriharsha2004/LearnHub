import React, { useEffect } from 'react';
import Navbar from './navbar';

import "../stylesheets/student/badges.css"
import useFetchGet from "../../hooks/useFetchGet"

const Badges = () => {    

    const [getrequest,data,ispending,error] = useFetchGet();

    useEffect(()=>{
        getrequest(`${process.env.REACT_APP_BACKEND_URL}/badge/all`)
        console.log(data);
    },[])

    return (
        <div>
            <Navbar/>
            <br />
            {ispending && <div>Failed to Fetch Badges</div>}
            {error && <div>Failed to Fetch Badges</div>}
            <div className="badges-content">
                <h2>Your Earned Badges</h2>
                {ispending && <div className="status-message">Loading...</div>}
                {error && <div className="status-message">Failed to Fetch Badges</div>}
                {data === null && !ispending && !error && <div className="status-message">No Badges Earned</div>}
                {data && data.length > 0 && data.map((module, index) => (
                    <div key={index} className="badge-card">
                        <h3 className="badge-title">{module.title}</h3>
                        <span className="horizontal-rotating-batch"> </span>
                        {/* 👑🏆 */}
                    </div>
                ))}
            </div>
            {data === null && !ispending && !error && <div className="status-message">No Badges Earned</div>}
        </div>
    );
}

export default Badges;
