import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ADD_ART_TAG,
  DELETE_ART_TAG,
  SET_ART_CATEGORY,
  SET_ART_DOWNLOAD_URL,
  SET_ART_NAME,
  SET_ART_IMAGE_URL,
  SET_ART_DESCRIPATION,
} from '../action/action.type';
import {
  addArtFun,
  updateArtFun,
  uploadArtImageFun,
  deleteArtImageFun,
} from '../action/art';
import ArtCategorySelector from '../Components/ArtCategorySelector';
import ArtTagSelector from '../Components/ArtTagSelector';

const AddArt = ({
  uid,
  addArt,
  artistProfile,
  addArtFun,
  updateArtFun,
  uploadArtImageFun,
  deleteArtImageFun,
}) => {
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
      console.log('updateArtFun');
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
      console.log('addArtFun');
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

  useEffect(async () => {
    if (isEdit !== 'edit' && isEdit !== 'add') {
      history.replace('/');
    }
  }, [isEdit]);

  return (
    <div className="container border border-2 mt-2 p-2">
      <h4 className="text-center text-primary">
        {isEdit === 'edit' ? 'EDIT ART' : 'ADD ART'}
      </h4>

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
                if (isEdit == 'edit') {
                  deleteArtImageFun({ uid, downloadName });
                }
              }}
            />
            <p>Image Upload Status {downloadUploadStatus}</p>
          </div>
          <div className="col-md-4">
            <img src={imageUrl} className="w-50" />
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
          <h5>Artist tag list</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tga</th>
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
                          className="btn btn-primary"
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

        <div className="border border-2 m-3 p-2">
          <label htmlFor="tagSelect" className="form-label">
            ADD TAG
          </label>
          <ArtTagSelector
            name="tagSelect"
            onChange={e => {
              dispatch({
                type: ADD_ART_TAG,
                payload: e.target.value,
              });
            }}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
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
