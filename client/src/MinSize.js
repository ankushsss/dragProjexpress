import './App.css';
import ReactSplit, { SplitDirection } from '@devbookhq/splitter';
import { useEffect } from 'react';
import { RegistrationForm } from './Component/RegistrationForm';
import { Table } from './Component/Table';
import { Profile } from './Component/Profile';

function MinSize() {
  useEffect(() => {

  }, [])
  return (
    <div className="splits">
      <ReactSplit
        direction={SplitDirection.Horizontal}
        minWidth={1000} // In pixels.
      >

        <ReactSplit
          direction={SplitDirection.Vertical}
          minWidth={1000} // In pixels.
        >

          <ReactSplit
            direction={SplitDirection.Horizontal}
            minHeight={1000} // In pixels.
            maxHeight={1000}
          >
            <div className="tile">
             <RegistrationForm/>
            </div>
            <div className="tile">
            
                
             <Profile/>
            </div>
          </ReactSplit>


          <div className="tile">
            <ReactSplit
              direction={SplitDirection.Horizontal}
              minHeight={1000} // In pixels.
              maxHeight={1000}
            >

              <div className="tile">
                <Table/>
              </div>
              
            </ReactSplit>
          </div>

        </ReactSplit>



      </ReactSplit>

    </div>
  );
}

export default MinSize;