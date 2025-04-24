import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Da = () => {
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/SignIN' || location.pathname === '/SignUP') {
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/SignIN');
            } else {
                displayusernameupdate(username);
            }
        }

    }, [location])
    return (
        <div>
            {showmenu &&
                <div className="header">

                    <Link to={'/'}>Home</Link>
                    <Link to={'/customer'}>Customer</Link>
                    <span style={{ marginLeft: '70%' }}>Welcome <b>{displayusername}</b></span>
                    <Link style={{ float: 'right' }} to={'/SignIN'}>Logout</Link>
                </div>
            }
        </div>
    );
}

export default Dashboard;