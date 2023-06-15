export default function ProfileChangePassword() {
    return (
        <div>
            <form>
                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                type="password"
                                name="old_password"
                                id="old_password"
                                className="form-control p-3"
                                placeholder="old password"
                                aria-describedby="helpId"
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                type="password"
                                name="new_password"
                                id="new_password"
                                className="form-control p-3"
                                placeholder="new password"
                                aria-describedby="helpId"
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                type="text"
                                name="confirmation_password"
                                id="confirmation_password"
                                className="form-control p-3"
                                placeholder="confirmation password"
                                aria-describedby="helpId"
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <input
                        type="submit"
                        className="btn btn-block"
                        value="Valider"
                    />
                </div>
            </form>
        </div>
    );
}
