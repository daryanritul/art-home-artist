import React from "react";
import { connect, useDispatch } from "react-redux";
import { updateArtistProfileFun, uploadProfileImageFun } from "../action/auth";

import {
  ADD_ARTIST_SOCIAL,
  DELETE_ARTIST_SOCIAL,
  SET_ARTIST_BIO,
  SET_ARTIST_DATE_OF_BIRTH,
  SET_ARTIST_DATE_STARTED,
  SET_ARTIST_NAME,
  SET_ARTIST_SOCIAL_ID,
  SET_ARTIST_SOCIAL_LINK,
  SET_ARTIST_SOCIAL_PROVIDER_NAME,
} from "../action/action.type";
import { useHistory } from "react-router-dom";

const EditArtistProfile = ({
  updateArtistProfile,
  uid,
  updateArtistProfileFun,
  uploadProfileImageFun,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const hnadleSubmit = async () => {
    updateArtistProfileFun({ updateArtistProfile, uid, history });
  };
  console.log("updateArtistProfile", updateArtistProfile);
  return (
    <div className="container border border-warning border-2 mt-2 p-3">
      <div>
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          className="form-control"
          type="text"
          name="name"
          placeholder="Enter Name"
          value={updateArtistProfile.name}
          onChange={(e) => {
            dispatch({
              type: SET_ARTIST_NAME,
              payload: e.target.value,
            });
          }}
        />

        <label htmlFor="profilePicUrl" className="form-label">
          Profile Pic
        </label>
        <div className="row">
          <div className="col-md-8">
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(event) => uploadProfileImageFun({ event, uid })}
            />
            <p>{updateArtistProfile.profilePicUploadStatus}</p>
          </div>
          <div className="col-md-4">
            <img src={updateArtistProfile.profilePicUrl} className="w-50" />
          </div>
        </div>

        <label htmlFor="dateOfBirth" className="form-label">
          Date Of Birth
        </label>
        <input
          className="form-control"
          type="date"
          name="dateOfBirth"
          placeholder="Enter Date of Birth"
          value={updateArtistProfile.dateOfBirth}
          onChange={(e) => {
            dispatch({
              type: SET_ARTIST_DATE_OF_BIRTH,
              payload: e.target.value,
            });
          }}
        />
        <label htmlFor="dateStarted" className="form-label">
          Date Started
        </label>
        <input
          className="form-control"
          type="date"
          name="dateStarted"
          placeholder="Enter Date Started"
          value={updateArtistProfile.dateStarted}
          onChange={(e) => {
            dispatch({
              type: SET_ARTIST_DATE_STARTED,
              payload: e.target.value,
            });
          }}
        />
        <label htmlFor="dateStarted" className="form-label">
          Bio
        </label>
        <input
          className="form-control"
          type="text"
          name="bio"
          placeholder="Enter BIo"
          value={updateArtistProfile.bio}
          onChange={(e) => {
            dispatch({
              type: SET_ARTIST_BIO,
              payload: e.target.value,
            });
          }}
        />

        <div>
          <h5>Artist Socila List</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Social Provider Name</th>
                <th scope="col">social ID</th>
                <th scope="col">social Link</th>
              </tr>
            </thead>
            <tbody>
              {updateArtistProfile.social &&
                updateArtistProfile.social.map((social, index) => {
                  return (
                    <tr key={index}>
                      <td>{social.socialProviderName}</td>
                      <td>{social.socialID}</td>
                      <td>{social.socialLink}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            dispatch({
                              type: DELETE_ARTIST_SOCIAL,
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
          <label htmlFor="socialProviderName" className="form-label">
            Social Provier Name
          </label>
          <input
            className="form-control"
            type="text"
            name="socialProviderName"
            placeholder="Enter Social Provider Name"
            value={updateArtistProfile.socialProviderName}
            onChange={(e) => {
              dispatch({
                type: SET_ARTIST_SOCIAL_PROVIDER_NAME,
                payload: e.target.value,
              });
            }}
          />
          <label htmlFor="socialID" className="form-label">
            Social ID
          </label>
          <input
            className="form-control"
            type="text"
            name="socialID"
            placeholder="Enter Social ID"
            value={updateArtistProfile.socialID}
            onChange={(e) => {
              dispatch({
                type: SET_ARTIST_SOCIAL_ID,
                payload: e.target.value,
              });
            }}
          />
          <label htmlFor="socialLink" className="form-label">
            Social Link
          </label>
          <input
            className="form-control"
            type="text"
            name="socialLink"
            placeholder="Enter Social Link"
            value={updateArtistProfile.socialLink}
            onChange={(e) => {
              dispatch({
                type: SET_ARTIST_SOCIAL_LINK,
                payload: e.target.value,
              });
            }}
          />
          <button
            className="btn btn-primary m-3"
            onClick={() => dispatch({ type: ADD_ARTIST_SOCIAL })}
          >
            ADD Socila
          </button>
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

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
  updateArtistProfile: state.updateArtistProfile,
});

const mapDispatchToProps = {
  updateArtistProfileFun: (data) => updateArtistProfileFun(data),
  uploadProfileImageFun: (data) => uploadProfileImageFun(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArtistProfile);
