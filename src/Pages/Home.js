import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getArtListFun } from "../action/art";
import DisplayArt from "../Components/DisplayArt";

const Home = ({ artList, uid, getArtListFun }) => {
  useEffect(() => {
    if (uid) {
      getArtListFun({ uid });
    }
  }, [uid]);

  return (
    <div className="container border border-2 border-success mt-4">
      <h1 className="text-center text-primary">List of Art</h1>
      {artList.map((art) => (
        <DisplayArt art={art} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  artList: state.art.artList,
  uid: state.auth.uid,
});

const mapDispatchToProps = {
  getArtListFun: (data) => getArtListFun(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
