import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CollectionCard = ({ collection, changeListText }) => {
  return (
    <div className="card" key={collection.id}>
      <div className="card-body">
        <h5 className="card-title">{collection.name}</h5>
        <p className="card-text">
          <small className="text-muted">{collection.num_albums} album(s)</small>
        </p>
        <Link
          onClick={() => {
            changeListText(collection.name);
          }}
          to={`/collection/${collection.id}/albums`}
          className="btn btn-primary  mr-2"
        >
          See Albums
        </Link>
        <Link
          to={`/collection/update/${collection.id}`}
          className="btn btn-outline-warning mr-2"
        >
          <FontAwesomeIcon icon={faEdit} />
        </Link>
        <Link
          to={`/collection/delete/${collection.id}`}
          className="btn btn-outline-danger"
        >
          <FontAwesomeIcon icon={faTrash} />
        </Link>
      </div>
    </div>
  );
};

export default CollectionCard;
