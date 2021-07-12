import { readAndCompressImage } from 'browser-image-resizer';

import { toast } from 'react-toastify';
import { firebaseAuth, firestore, storage } from '../firebase';

import {
  CLEAR_UPDATE_ARTIST_PROFILE_STATE,
  SET_ARTIST_PROFILE,
  SET_ARTIST_PROFILE_PIC_UPLOAD_STATUS,
  SET_ARTIST_PROFILE_PIC_URL,
} from './action.type';

export const getArtistProfile = (data) => async (dispatch) => {
  const { uid } = data;

  const profileDoc = await firestore.collection('artist').doc(uid).get();

  if (profileDoc.exists) {
    dispatch({ type: SET_ARTIST_PROFILE, payload: profileDoc.data() });
  }
};

export const updateArtistProfileFun =
  ({ updateArtistProfile, uid, history }) =>
  async (dispatch) => {
    try {
      const { bio, dateOfBirth, dateStarted, name, profilePicUrl, social } =
        updateArtistProfile;

      // create ref of batch
      const batch = firestore.batch();

      // create ref of Artist Profile doc
      const artistProfileUpdateRef = await firestore
        .collection('artist')
        .doc(uid);

      // update profile value
      batch.update(artistProfileUpdateRef, {
        bio,
        dateOfBirth,
        dateStarted,
        name,
        profilePicUrl,
        uid,
        social,
      });

      // create ref of all art of artist
      const artistArtRef = await firestore
        .collection('art')
        .where('uid', '==', uid);

      const snapshot = await artistArtRef.get();
      // update each art of artist
      snapshot.forEach((doc) => {
        console.log('doc', doc.ref);
        batch.update(doc.ref, {
          artistprofilePicUrl: profilePicUrl,
          artistname: name,
          artistdateStarted: dateStarted,
        });
      });

      //  batch commit to write all doc at single time and if any one fail all fail
      await batch
        .commit()
        .then((res) => {
          toast('Profile Edite', {
            type: 'success',
          });
          dispatch({ type: SET_ARTIST_PROFILE, payload: updateArtistProfile });
          dispatch({
            type: CLEAR_UPDATE_ARTIST_PROFILE_STATE,
          });
          history.push('/artistprofile');
        })
        .catch((error) => {
          toast(error.message, {
            type: 'error',
          });
        });
    } catch (error) {
      toast(error.message, {
        type: 'error',
      });
    }
  };

export const uploadProfileImageFun =
  ({ event, uid }) =>
  async (dispatch) => {
    const imageFile = event.target.files[0];

    const config = {
      quality: 0.9,
      maxWidth: 800,
      maxHeight: 2000,
      autoRotate: true,
      debug: true,
    };
    // TO compress file
    try {
      const compressedFile = await readAndCompressImage(imageFile, config);

      var storageRef = storage.ref(uid + '/profilePic.jpeg');
      const uploadTask = storageRef.put(compressedFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          dispatch({
            type: SET_ARTIST_PROFILE_PIC_UPLOAD_STATUS,
            payload: 'Upload is ' + progress + '% done',
          });
        },
        (error) => {
          toast(error.message, {
            type: 'error',
          });
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            dispatch({
              type: SET_ARTIST_PROFILE_PIC_URL,
              payload: downloadURL,
            });
          });
        }
      );
    } catch (error) {
      toast(error.message, {
        type: 'error',
      });
    }
  };

export const signIn = (data) => async (dispatch) => {
  const { email, password } = data;

  firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      toast('Sign In', {
        type: 'success',
      });
    })
    .catch((error) => {
      toast(error.message, {
        type: 'error',
      });
    });
};
