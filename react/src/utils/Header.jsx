/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function Header({ user, onLogout }) {
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                    Caytukaayu téere
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    aria-current="page"
                                    to="/accueil"
                                >
                                    Accueil
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/document">
                                    Document
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="/profile">
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="/add-document">
                                    Add document
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <span className="m-4">{user.username}</span>
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}
