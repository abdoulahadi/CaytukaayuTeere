/* eslint-disable no-unused-vars */
import { Link, Navigate, Outlet, useOutletContext } from "react-router-dom";


export default function AdminLayout(){
    
    const [user, setUser,onLogout] = useOutletContext();

    if(user.status!=='1'){
        return <Navigate to="/accueil"/>
    }
        return(
        
        <div id="defaultLayout">
            <aside>
                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/users">User</Link>
                <Link to="/admin/universities">University</Link>
                <Link to="/admin/ufrs">Ufr</Link>
                <Link to="/admin/departements">Département</Link>
                <Link to="/admin/formations">Formation</Link>
                <Link to="/admin/settings">Paramètrages</Link>
                <Link to="/accueil">Quitter</Link>
            </aside>
            <div className="content" >
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                    <span className="m-4">{user.username}</span>
                        <a onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet context={[user, setUser]}/>
                </main>
            </div>
        </div>
    );
}