import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getArchiveArtFun } from '../action/art';
import DisplayArt from '../Components/DisplayArt';

const Archive = ({ archiveArtList, uid, getArchiveArtFun }) => {
  const history = useHistory();

  useEffect(() => {
    if (uid) {
      getArchiveArtFun({ uid, history });
    }
  }, [uid]);
  return (
    <div className="container border mt-3 p-2">
      <div className="artTitle">
        <p className="artTitle-big">My Arts</p>
        <p className="artTitle-small">Total : {archiveArtList.length}</p>
      </div>
      {archiveArtList.map((art, index) => (
        <DisplayArt art={art} key={art.artId} index={index} />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  archiveArtList: state.art.archiveArtList,
  uid: state.auth.uid,
});

const mapDispatchToProps = {
  getArchiveArtFun: data => getArchiveArtFun(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
