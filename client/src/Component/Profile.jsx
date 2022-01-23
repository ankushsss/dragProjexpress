import React from 'react';

export const Profile = () => {
  return (<div>

        <br/>
        <div>
            <div className="card" style={{margin:"0 auto"}}>
            <div class="card-header" >
                    <div class="card-photo">
                        <img src="https://scontent.fbho4-2.fna.fbcdn.net/v/t1.6435-1/p160x160/120734982_2802954626647609_3747883647545336537_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=7206a8&_nc_ohc=7D9xBjYcpPsAX8HsLDo&_nc_ht=scontent.fbho4-2.fna&oh=00_AT8J4bpysUFg_NmnMSGyxp1T5D8mhS-bqLDoMl4IEbwGVw&oe=6212A0E0" alt=""/>
                    </div>
                </div>
                <div className="card-body">
                    <h3 className="card-name">Ankush Saxena</h3>
                    <p className="card-description">MERN Stack || Frontend Developer  <br/>React || Next || UI/UX Design || Photoshop</p>
                    <div classNameName="card-button">
                        <button className="btn btn-primary"><i className="fab fa-facebook-f"></i></button>
                        <button className="btn btn-primary" style={{marginLeft:"5px"}}><i className="fab fa-linkedin-in"></i></button>
                        <button className="btn btn-primary" style={{marginLeft:"5px"}}><i className="fab fa-instagram"></i></button>
                        
                    </div>
                    <br/>
                    <ul className="card-social">
                        <li style={{fontSize:"10px"}}><a href="#" style={{fontSize:"10px",textDecoration:"none"}}><i className="fas fa-phone-alt" ></i> 7974829419 </a></li>
                        <li style={{fontSize:"10px"}}><a href="#" style={{fontSize:"10px",textDecoration:"none"}}><i className="fas fa-envelope-open"></i>ankushsss99@gmail.com</a></li>
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
};
