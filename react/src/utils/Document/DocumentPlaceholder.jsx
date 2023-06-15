export default function DocumentPlaceholder() {
    return (
        <div className="col-lg-5 col-md-6 m-4 shadow p-0">
            <div className="card h-100 mb-0" aria-hidden="true">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                    <a
                        href="#"
                        tabIndex="-1"
                        className="btn btn-success disabled placeholder col-6"
                    ></a>
                </div>
            </div>
        </div>
    );
}
