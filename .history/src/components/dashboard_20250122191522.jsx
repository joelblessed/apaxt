import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/singIN' || location.pathname === '/signUP') {
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

   
    const [customerlist, listupdate] = useState(null);
   
    useEffect(() => {
       

        let jwttoken = sessionStorage.getItem('jwttoken');
        fetch("https://localhost:44308/Customer", {
            headers: {
                'Authorization': 'bearer ' + jwttoken
            }
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            listupdate(resp);
        }).catch((err) => {
            console.log(err.messsage)
        });

    }, []);
    return (<>
        <div>
            {showmenu &&
                <div className="header">

                    <Link to={'/'}>Home</Link>
                    <Link to={'/customer'}>Customer</Link>
                    <span style={{ marginLeft: '70%' }}>Welcome <b>{displayusername}</b></span>
                    <Link style={{ float: 'right' }} to={'/signIN'}>Logout</Link>
                </div>
            }
        </div>
        <div>
            
            <h1 className="text-center">Welcome to Nihira Techiees</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <td>Code</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Credit Limit</td>
                    </tr>
                </thead>
                <tbody>
                    {customerlist &&
                        customerlist.map(item => (
                            <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.creditLimit}</td>
                            </tr>

                        ))
                    }
                </tbody>

            </table>
        </div>
        </>
    );
}

export default Dashboard;