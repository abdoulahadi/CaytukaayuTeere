import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Accueil from "./views/Accueil";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Document from "./views/Document";
import Profile from './views/Profile';
import AddDocument from "./utils/Document/DocumentAdd";
import AdminLayout from "./components/AdminLayout";
import User from './utils/Admin/User/User';
import UserForm from "./utils/Admin/User/UserForm";
import ConnectedLayout from "./components/ConnectedLayout";
import University from "./utils/Admin/Universite/University";
import UniversityForm from "./utils/Admin/Universite/UniversityForm";
import Ufr from "./utils/Admin/Ufr/Ufr";
import UfrForm from "./utils/Admin/Ufr/UfrForm";
import Departement from "./utils/Admin/Departement/Departement";
import DepartementForm from "./utils/Admin/Departement/DepartementForm";
import Formation from "./utils/Admin/Formation/Formation";
import FormationForm from "./utils/Admin/Formation/FormationForm";
import Settings from "./utils/Admin/Settings/Settings";
import Dashboard from "./utils/Admin/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path:'/',
        element:<ConnectedLayout/>,
        children:[
            {
                path:"/",
                element:<DefaultLayout/>,
                children:[    
                    {
                        path:"/",
                        element:<Navigate to="/accueil"/>
                    },    
                    {
                        path:"/accueil",
                        element:<Accueil/>
                    },
                    {
                        path:"/document",
                        element:<Document/>
                    },
                    
                    {
                        path:"/profile",
                        element:<Profile/>
                    },
                    {
                        path:"/add-document",
                        element:<AddDocument/>
                    },
                ]
            },
            {
                path:"/",
                element:<AdminLayout/>,
                children:[
                    {
                        path: "/admin",
                        element: <Dashboard/>
                    },
                    {
                        path:"/admin/users",
                        element:<User/>
                    },
                    {
                        path:"/admin/users/:id",
                        element:<UserForm/>
                    },
                    {
                        path:"/admin/universities",
                        element:<University/>
                    },
                    {
                        path:"/admin/universities/:id",
                        element:<UniversityForm/>
                    },
                    {
                        path:"/admin/ufrs",
                        element:<Ufr/>
                    },
                    {
                        path:"/admin/ufrs/:id",
                        element:<UfrForm/>
                    },
                    {
                        path:"/admin/departements",
                        element:<Departement/>
                    },
                    {
                        path:"/admin/departements/:id",
                        element:<DepartementForm/>
                    },
                    {
                        path:"/admin/formations",
                        element:<Formation/>
                    },
                    {
                        path:"/admin/formations/:id",
                        element:<FormationForm/>
                    },
                    {
                        path:"/admin/settings",
                        element:<Settings/>
                    },
                ]
            },

        ]
    },
    {
        path:"/",
        element:<GuestLayout/>,
        children:[   
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/signup",
                element:<Signup/>
            },
        ]
    },
    {
        path:"/*",
        element:<NotFound/>
    },
]);

export default router;
