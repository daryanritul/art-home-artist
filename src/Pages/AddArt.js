import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { useHistory, useParams } from 'react-router-dom';
import {
  ADD_ART_TAG,
  DELETE_ART_TAG,
  SET_ART_CATEGORY,
  SET_ART_NAME,
  SET_ART_DESCRIPATION,
} from '../action/action.type';
import {
  addArtFun,
  updateArtFun,
  uploadArtImageFun,
  deleteArtImageFun,
} from '../action/art';
import ArtCategorySelector from '../Components/ArtCategorySelector';

const AddArt = ({
  uid,
  addArt,
  artistProfile,
  addArtFun,
  updateArtFun,
  uploadArtImageFun,
  deleteArtImageFun,
}) => {
  const [tagInput, setTagInput] = useState('');

  const { isEdit } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    category,
    downloadUrl,
    description,
    artName,
    imageUrl,
    tag,
    artId,
    downloadUploadStatus,
    downloadName,
  } = addArt;

  const hnadleSubmit = () => {
    if (isEdit === 'edit') {
      updateArtFun({
        category,
        downloadUrl,
        description,
        artName,
        imageUrl,
        tag,
        artId,
        isEdit,
        history,
        uid,
        artistProfile,
      });
    } else {
      addArtFun({
        category,
        downloadUrl,
        description,
        artName,
        imageUrl,
        tag,
        history,
        uid,
        artistProfile,
      });
    }
  };

  useEffect(() => {
    if (isEdit !== 'edit' && isEdit !== 'add') {
      history.replace('/');
    }
  }, [isEdit]);

  return (
    <div className="container border border-2 mt-2 p-2">
      <div className="artTitle mb-3">
        <p className="artTitle-big">
          {isEdit === 'edit' ? 'EDIT ART' : 'ADD NEW ART'}
        </p>
      </div>
      <div>
        <label htmlFor="artName" className="form-label">
          Art Name
        </label>
        <input
          className="form-control"
          type="text"
          name="artName"
          placeholder="Enter Art Name"
          value={artName}
          onChange={e => {
            dispatch({
              type: SET_ART_NAME,
              payload: e.target.value,
            });
          }}
        />

        <label htmlFor="artImageUrl" className="form-label">
          Art Image
        </label>
        <div className="row">
          <div className="col-md-8">
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={event => {
                uploadArtImageFun({ event, uid });
                if (isEdit === 'edit') {
                  deleteArtImageFun({ uid, downloadName });
                }
              }}
            />
            <p>Image Upload Status {downloadUploadStatus}</p>
          </div>
          <div className="col-md-4">
            <img src={imageUrl} className="w-50" alt="not Found" />
          </div>
        </div>

        <label htmlFor="descripation" className="form-label">
          Descripation
        </label>
        <input
          className="form-control"
          type="text"
          name="descripation"
          placeholder="Enter descripation"
          value={description}
          onChange={e => {
            dispatch({
              type: SET_ART_DESCRIPATION,
              payload: e.target.value,
            });
          }}
        />
        <label htmlFor="category" className="form-label">
          category
        </label>
        <ArtCategorySelector
          name="category"
          value={category}
          onChange={e => {
            dispatch({
              type: SET_ART_CATEGORY,
              payload: e.target.value,
            });
          }}
        />

        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tags Lists</th>
              </tr>
            </thead>
            <tbody>
              {tag &&
                tag.map((tagName, index) => {
                  return (
                    <tr key={index}>
                      <td>{tagName}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            dispatch({
                              type: DELETE_ART_TAG,
                              payload: index,
                            })
                          }
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div>
          <div className="row ">
            <div className="col-8">
              <input
                className="form-control"
                type="text"
                name="tagSelect"
                placeholder="Enter tag title here ..."
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
              />
            </div>
            <div className="col-4">
              <button
                className="btn btn-success w-100"
                onClick={() => {
                  dispatch({
                    type: ADD_ART_TAG,
                    payload: tagInput,
                  });
                  setTagInput('');
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary submitBtn"
          onClick={() => hnadleSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  uid: state.auth.uid,
  artistProfile: state.auth.artistProfile,
  addArt: state.addArt,
});

const mapDispatchToProps = {
  addArtFun: data => addArtFun(data),
  updateArtFun: data => updateArtFun(data),
  uploadArtImageFun: data => uploadArtImageFun(data),
  deleteArtImageFun: data => deleteArtImageFun(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArt);
