import React, { useState } from 'react';
import './DisplayArt.css';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SET_STATE_TO_UPDATE_ART } from '../action/action.type';
import {
  deleteArtFun,
  toggleArtArchiveFun,
  deleteArtImageFun,
} from '../action/art';

const DisplayArt = ({
  art,
  index,
  uid,
  totalArt,
  deleteArtFun,
  toggleArtArchiveFun,
  deleteArtImageFun,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showConfirmDeleteInput, setShowConfirmDeleteInput] = useState(false);
  const [inputForConfirmDelete, setInputForConfirmDelete] = useState('');
  const handleDelete = () => {
    if (inputForConfirmDelete === 'delete') {
      deleteArtFun({
        uid,
        artId: art.artId,
        archiveValue: !art.isArchive,
        totalArt,
      });
      setInputForConfirmDelete('');
      setShowConfirmDeleteInput(false);
      deleteArtImageFun({ uid, downloadName: art.downloadName });
    } else {
      setInputForConfirmDelete('');
    }
  };

  return (
    <div className="card border border-1 m-3 p-0">
      <div className="art-card">
        <div className="card-index">{index + 1}</div>
        <div className="card-image">
          <img src={art.imageUrl} alt="not found" />
        </div>
        {showConfirmDeleteInput ? (
          <>
            <div className="card-delete">
              <h5>Are you sure to delete Art</h5>
              <h6>
                To confirm delete type the letter
                <strong className="text-warning"> delete </strong> in input box
              </h6>
              <input
                className="form-control"
                type="text"
                name="confiumDelete"
                placeholder="Enter delete"
                value={inputForConfirmDelete}
                onChange={(e) => setInputForConfirmDelete(e.target.value)}
              />
              <p>
                After confirm delete your image data will be deleted from out
                storage and cannot be restored!
              </p>
            </div>
            <div className="card-buttons">
              <button
                className="btn btn-warning m-2"
                onClick={() => handleDelete()}
              >
                Confirm
              </button>
              <button
                className="btn btn-success m-2"
                onClick={() => setShowConfirmDeleteInput(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="card-details">
              <span className="details-1">
                <p>
                  <span>Name : </span>
                  {art.artName}
                </p>
                <p>
                  <span>Catogory : </span> {art.category}
                </p>
              </span>
              <p>
                <span>Tags : </span>
                {art.tag.map((tag, index) => (
                  <p style={{ display: 'inline' }} key={index}>
                    {tag}
                  </p>
                ))}
              </p>
              <p>
                <span>Description : </span> {art.description}
              </p>
            </div>
            <div className="card-buttons">
              <button
                className="btn btn-success m-1"
                onClick={() => {
                  dispatch({
                    type: SET_STATE_TO_UPDATE_ART,
                    payload: { ...art },
                  });
                  history.push('art/edit');
                }}
              >
                Edit
              </button>
              <a
                href={art.downloadUrl}
                target="_blank"
                type="button"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Download
              </a>
              {art.isArchive ? (
                <button
                  className="btn btn-primary m-1"
                  onClick={() =>
                    toggleArtArchiveFun({
                      artId: art.artId,
                      archiveValue: false,
                    })
                  }
                >
                  Move to Public
                </button>
              ) : (
                <button
                  className="btn btn-warning m-1"
                  onClick={() =>
                    toggleArtArchiveFun({
                      artId: art.artId,
                      archiveValue: true,
                    })
                  }
                >
                  Move to Archive
                </button>
              )}
              <button
                className="btn btn-danger m-1"
                onClick={() => setShowConfirmDeleteInput(true)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  totalArt: state.auth.artistProfile.totalArt,
  uid: state.auth.uid,
});
const mapDispatchToProps = {
  deleteArtFun: (data) => deleteArtFun(data),
  toggleArtArchiveFun: (data) => toggleArtArchiveFun(data),
  deleteArtImageFun: (data) => deleteArtImageFun(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayArt);
