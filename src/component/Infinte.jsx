import React from "react";

const Infinte = () => {
  return (
    <div className=" carousel w-[90%] m-[100px] flex border   border-red-200 overflow-x-auto no-scrollbar">
      <div className="flex gap-10 grow-0 shrink-0 spinc pr-10">
      <div className="card">0</div>
      <div className="card">1</div>
      <div className="card">2</div>
      <div className="card">3</div>
      <div className="card">4</div>
      <div className="card">5</div>
      <div className="card">6</div>
      
      </div>
 <div aria-hidden className="flex gap-10 grow-0 shrink-0 spinc pr-10 ">
      <div className="card">0</div>
      <div className="card">1</div>
      <div className="card">2</div>
      <div className="card">3</div>
      <div className="card">4</div>
      <div className="card">5</div>
      <div className="card">6</div>
      
      </div>
      

    </div>
  );
};

export default Infinte;
