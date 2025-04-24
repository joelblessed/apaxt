import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
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


    const [custlist, custupdate] = useState([]);
    const [haveedit, editchange] = useState(false);
    const [haveview, viewchange] = useState(false);
    const [haveadd, addchange] = useState(false);
    const [haveremove, removechange] = useState(false);

    const navigate=useNavigate();


    useEffect(() => {
        GetUserAccess();
        loadcustomer();
       
    }, []);

    const loadcustomer = () => {
        fetch("http://localhost:4500/customer").then(res => {
            if (!res.ok) {
                return false
            }
            return res.json();
        }).then(res => {
            custupdate(res)
        });
    }

    const GetUserAccess = () => {
        const userrole = sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole').toString() : '';
        fetch("http://localhost:4500/roleaccess?role=" + userrole + "&menu=customer").then(res => {
            if (!res.ok) {
                navigate('/');
            toast.warning('You are not authorized to access');
                return false;
            }
            return res.json();
        }).then(res => {
            console.log(res);
            if (res.length > 0) {
                viewchange(true);
                let userobj = res[0];
                editchange(userobj.haveedit);
                addchange(userobj.haveadd);
                removechange(userobj.havedelete);
            }else{
                navigate('/');
            toast.warning('You are not authorized to access');
            }
        })
    }

    const handleadd = () => {
        if(haveadd){
        toast.success('added')
        }else{
            toast.warning('You are not having access for add');
        }
    }
    const handleedit = () => {
        if(haveedit){
        toast.success('edited')
        }
        else{
            toast.warning('You are not having access for Edit');
        }
    }

    const handleremove = () => {
        if(haveremove){
        toast.success('removed')
        }else{
            toast.warning('You are not having access for remove');
        }
    }

    return (<>
          
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
        </>
    );
}

export default Dashboard;