import React from 'react';
import ReactSplit, { SplitDirection } from '@devbookhq/splitter';
import { RegistrationForm } from './Component/RegistrationForm';
import { Table } from './Component/Table';
import { Profile } from './Component/Profile';
export const Horizontal = () => {
    return (
        <div className="splits"  >
 
       
    <ReactSplit
      direction={SplitDirection.Vertical}
      minWidth={1000} // In pixels.
    >
       
      

       
    <div className="tile" style={{overflowY:"scroll"}}>
      <RegistrationForm/>
    </div>
    <div className="tile" style={{overflowY:"scroll"}}>
      <Profile/>
    </div>
    <div className="tile" style={{overflowY:"scroll"}}>
      <Table/>
    </div>
      </ReactSplit>
    
   
  
      

    
    </div>
    );
};
