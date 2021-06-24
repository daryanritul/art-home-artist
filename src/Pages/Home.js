import React from "react";
import { connect } from "react-redux";

import ArtistProfile from "../Components/ArtistProfile";

const Home = ({ artistProfile }) => {
  return (
    <div className="container border mt-4">
      <ArtistProfile />
    </div>
  );
};

const mapStateToProps = (state) => ({
  artistProfile: state.auth.artistProfile,
});

export default connect(mapStateToProps)(Home);
