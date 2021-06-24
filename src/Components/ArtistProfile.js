import React from "react";
import { connect, useDispatch } from "react-redux";
import defaultProfile from "../asset/defaultProfile.jpg";
import { updateArtistProfileFun } from "../action/auth";
import {
  SET_ARTIST_BIO,
  SET_ARTIST_DATE_OF_BIRTH,
  SET_ARTIST_DATE_STARTED,
  SET_ARTIST_NAME,
  SET_ARTIST_PROFILE_PIC_URL,
} from "../action/action.type";

const ArtistProfile = ({
  profile,
  uid,
  updateArtistProfile,
  updateArtistProfileFun,
}) => {
  const dispatch = useDispatch();

  const hnadleSubmit = async () => {
    updateArtistProfileFun({ ...updateArtistProfile, uid });
  };
  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Profile Pic</th>
            <td>
              {profile.profilePicUrl ? (
                <img
                  src={profile.profilePicUrl}
                  className="img-thumbnail mx-auto d-block"
                  style={{ width: "200px" }}
                />
              ) : (
                <img
                  src={defaultProfile}
                  className="img-thumbnail mx-auto d-block"
                  style={{ width: "200px" }}
                />
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">Name</th>
            <td>{profile.name ? <p>profile.name</p> : <p>IRON MAN</p>}</td>
          </tr>
          <tr>
            <th scope="row">Bio</th>
            <td>{profile.bio ? <p>profile.bio</p> : <p>I do Snap</p>}</td>
          </tr>
          <tr>
            <th scope="row">Date Started</th>
            <td>
              {profile.dateStarted ? <p>profile.bio</p> : <p>1/1/3021</p>}
            </td>
          </tr>
          <tr>
            <th scope="row">Date of Birth</th>
            <td>
              {profile.dateOfBirth ? <p>profile.bio</p> : <p>1/1/2021</p>}
            </td>
          </tr>
          <tr>
            <th scope="row">social</th>
            <td>Coming Soon</td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#editArtistProfileModal"
      >
        Edit Profile
      </button>

      <div
        className="modal fade"
        id="editArtistProfileModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered  modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                <input
                  className="form-control"
                  type="text"
                  name="profilePicUrl"
                  placeholder="Enter Profile Pic Url"
                  value={updateArtistProfile.profilePicUrl}
                  onChange={(e) => {
                    dispatch({
                      type: SET_ARTIST_PROFILE_PIC_URL,
                      payload: e.target.value,
                    });
                  }}
                />

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

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => hnadleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.auth.artistProfile,
  uid: state.auth.uid,
  updateArtistProfile: state.updateArtistProfile,
});

const mapDispatchToProps = {
  updateArtistProfileFun: (data) => updateArtistProfileFun(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfile);
