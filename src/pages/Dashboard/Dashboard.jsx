import React from "react";
import Button from "../../components/CircleButton/CircleButton";

const Dashboard = () => {
  return (
    <div className="mono">
      <h2 className="text-4xl font-bold mt-10 mono">
        Admin Dashboard <span className="fancy border-b-2 text-red-600">Activated</span>
      </h2>

      <div className="flex  flex-col items-center justify-center">
        <Button></Button>
      </div>
    </div>
  );
};

export default Dashboard;
