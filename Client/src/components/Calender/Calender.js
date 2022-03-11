import React from "react";
import "./calender.css";

const Calender = () => {
    return (
        <div className="calender">
            <div className="calenderContainer">
                <div className="Start">
                    <span className="startSpan">Start Date</span>
                    <input type="date" />
                </div>

                <div className="End">
                    <span className="endSpan">End Date</span>
                    <input type="date" />
                </div>

                <div className="total">
                    <div>
                        <span style={{ fontSize: "1.5rem" }}>Total :</span>
                    </div>
                    <div  >
                        <span style={{ marginTop: "30px", }} className="price">Rs:10000   </span>
                            
                    </div>

                    <div>
                        <span style={{ fontSize: "1.5rem" }} className="Days"  >Days:</span>
                    </div>
                    <div  >
                        <span style={{ marginTop: "30px", }} className="daysNo">10 </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Calender;
