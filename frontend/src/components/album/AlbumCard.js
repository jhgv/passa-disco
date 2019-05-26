import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import albumsAPI from '../../apis/album';

const renderCover = ({ cover_image }) => {
  if (cover_image) {
    return (
      <img
        src={`${albumsAPI.defaults.baseURL}/${cover_image}`}
        className="card-img"
        alt="Cover"
        style={{ maxHeight: '15em' }}
      />
    );
  }
  return <FontAwesomeIcon icon={faImage} style={{ fontSize: '15em' }} />;
};

const AlbumCard = ({ album }) => {
  return (
    <div className="col-sm-3 mb-3">
      <div className="card" style={{ width: '15rem' }}>
        {renderCover(album)}
        <div className="card-body">
          <h4 className="card-title">{album.name}</h4>
          <p className="card-text">by {album.artist}.</p>
          <p className="card-text text-muted">
            <small className="text-muted">
              {album.genre} - {album.year}
            </small>
          </p>

          <Link
            to={`/album/update/${album.id}`}
            className="btn btn-outline-warning btn-sm mr-2"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <Link
            to={`/album/delete/${album.id}`}
            className="btn btn-outline-danger btn-sm"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
