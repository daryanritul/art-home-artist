import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getArchiveArtFun } from "../action/art";
import DisplayArt from "../Components/DisplayArt";

const Archive = ({ archiveArtList, uid, getArchiveArtFun }) => {
  const history = useHistory();

  useEffect(() => {
    if (uid) {
      getArchiveArtFun({ uid, history });
    }
  }, [uid]);
  return (
    <div className="container border mt-3 p-2">
      <h3 className="text-primary text-center">Archive</h3>
      {archiveArtList.map((art) => (
        <DisplayArt art={art} key={art.artId} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  archiveArtList: state.art.archiveArtList,
  uid: state.auth.uid,
});

const mapDispatchToProps = {
  getArchiveArtFun: (data) => getArchiveArtFun(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
