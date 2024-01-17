import { useState, useEffect } from "react";
import SwitchComponent from "./switch-toggle";
import DashboardElectionTable from "./tables/dashboard-election-table";


const DashboardElection = (prop) => {
  const [filter, setFilter] = useState("all")

    return (
      <div className="dashboard-election-base shadow mt-1 bg-body rounded">
        <div className="dashboard-election-header">
          <div className="dashboard-election-title">Elections</div>
          <SwitchComponent filter={filter} setFilter={setFilter}/>
        </div>
        <DashboardElectionTable filter={filter}/>
      </div>
    );
  }
  
export default DashboardElection;