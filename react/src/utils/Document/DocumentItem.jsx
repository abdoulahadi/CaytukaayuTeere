/* eslint-disable react/prop-types */

import { API_URL_DOWNLOAD } from "../../constant";

const DocumentItem = ({ document,action }) => {

  return (
    <div className="col-md-5 m-4 shadow p-0">
      <div className="card h-100 mb-0">
              <h5 className="card-title text-truncate">Nom : { document.nom}</h5>
        <div className="row g-0">
          <div className="col-4">
            <img src={document.imageUrl} className="card-img" alt={document.nom} />
          </div>
          <div className="col-4">
            <div className="card-body">
              <p className="card-text text-truncate">
                Licence: {document.licence.sigle}<br />
                Nature: {document.nature}<br />
                Module: {document.module}<br />
                Niveau: {document.niveau}<br />
                Année: {document.annee}<br/>
                Auteur: {document.user.username}
              </p>
            </div>
          </div>
          <div className="col-4">
            {action ==='download' && <a href={API_URL_DOWNLOAD+document.path} className="btn btn-primary" download>Télécharger</a>}
            {action ==='delete'&&<a href="#" className="btn btn-primary">Supprimer</a>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentItem;
