import React from 'react';
import './ArtistProfile.css';
import { connect, useDispatch } from 'react-redux';
import defaultProfile from '../asset/defaultProfile.jpg';
import { SET_ARTIST_PROFILE_UPDATE_DATA } from '../action/action.type';
import { useHistory } from 'react-router-dom';

const ArtistProfile = ({ profile }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div
      className="container border border-3 border-rounder-4 mt-2 p-3"
      style={{
        position: 'relative',
      }}
    >
      {/* <table className="table">
        <tbody>
          <tr>
            <th scope="row">Profile Pic</th>
            <td>
              {profile.profilePicUrl ? (
                <img
                  src={profile.profilePicUrl}
                  className="img-thumbnail mx-auto d-block"
                  style={{ width: '200px' }}
                />
              ) : (
                <img
                  src={defaultProfile}
                  className="img-thumbnail mx-auto d-block"
                  style={{ width: '200px' }}
                />
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">Name</th>
            <td>{profile.name ? <p>{profile.name}</p> : <p>IRON MAN</p>}</td>
          </tr>
          <tr>
            <th scope="row">Bio</th>
            <td>{profile.bio ? <p>{profile.bio}</p> : <p>I do Snap</p>}</td>
          </tr>
          <tr>
            <th scope="row">Date Started</th>
            <td>
              {profile.dateStarted ? (
                <p>{profile.dateStarted}</p>
              ) : (
                <p>1/1/3021</p>
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">Date of Birth</th>
            <td>
              {profile.dateOfBirth ? (
                <p>{profile.dateOfBirth}</p>
              ) : (
                <p>1/1/2021</p>
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">social</th>
            <td>
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
                    {profile.social &&
                      profile.social.map((social, index) => {
                        return (
                          <tr key={index}>
                            <td>{social.socialProviderName}</td>
                            <td>{social.socialID}</td>
                            <td>{social.socialLink}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table> */}
      <button
        className="btn btn-success editBtn"
        onClick={() => {
          dispatch({ type: SET_ARTIST_PROFILE_UPDATE_DATA, payload: profile });
          history.push('/editartistprofile');
        }}
      >
        Edit Profile
      </button>
      <div className="profileImage">
        {profile.profilePicUrl ? (
          <img
            src={profile.profilePicUrl}
            className="img-thumbnail mx-auto d-block"
          />
        ) : (
          <img src={defaultProfile} className="img-thumbnail mx-auto d-block" />
        )}
        <p className="profileName">
          {profile.name ? <p>{profile.name}</p> : <p>IRON MAN</p>}
        </p>
      </div>
      <div className="profileDetails">
        <h6 scope="row">Date Started : </h6>
        <p>
          {profile.dateStarted ? <p>{profile.dateStarted}</p> : <p>1/1/3021</p>}
        </p>

        <h6 scope="row">Date of Birth : </h6>
        <p>
          {profile.dateOfBirth ? <p>{profile.dateOfBirth}</p> : <p>1/1/2021</p>}
        </p>
      </div>
      <div className="profileBio">
        <p>{profile.bio ? <p>{profile.bio}</p> : <p>I do Snap</p>}</p>
      </div>
      <div>
        <h5>Social Links </h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Social Account</th>
              <th scope="col">Social Account Id</th>
              <th scope="col">social Link</th>
            </tr>
          </thead>
          <tbody>
            {profile.social &&
              profile.social.map((social, index) => {
                return (
                  <tr key={index}>
                    <td>{social.socialProviderName}</td>
                    <td>{social.socialID}</td>
                    <td>{social.socialLink}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.auth.artistProfile,
});

export default connect(mapStateToProps)(ArtistProfile);
