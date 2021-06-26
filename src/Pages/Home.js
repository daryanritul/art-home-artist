import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_ART_CATEGORY } from "../action/action.type";

import { getArtListFun } from "../action/art";
import ArtCategorySelector from "../Components/ArtCategorySelector";
import ArtTagSelector from "../Components/ArtTagSelector";
import DisplayArt from "../Components/DisplayArt";

const Home = ({ artList, uid, getArtListFun }) => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const history = useHistory();

  const handleFilter = () => {
    getArtListFun({ uid, history, tagFilter, categoryFilter });
  };

  useEffect(() => {
    if (uid) {
      getArtListFun({ uid, history, tagFilter: "", categoryFilter: "" });
    }
  }, [uid]);

  return (
    <div className="container border border-2 border-success mt-4">
      <div className="m-2 p-2 border  row">
        <div className="col-lg-4">
          <label htmlFor="tagFilter" className="form-label">
            Select Tag
          </label>
          <ArtTagSelector
            name="tagFilter"
            value={tagFilter}
            onChange={(e) => {
              setTagFilter(e.target.value);
            }}
          />
        </div>
        <div className="col-lg-4">
          <label htmlFor="categoryFilter" className="form-label">
            Select Category To filter
          </label>
          <ArtCategorySelector
            name="categoryFilter"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
            }}
          />
        </div>

        <div className="col-lg-4 ">
          <div
            className="btn-group btn-group-lg m-4"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button className="btn btn-success " onClick={() => handleFilter()}>
              Filter
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setTagFilter("");
                setCategoryFilter("");
              }}
            >
              Clear
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                getArtListFun({
                  uid,
                  history,
                  tagFilter: "",
                  categoryFilter: "",
                });
              }}
            >
              Fetch All
            </button>
          </div>
        </div>
      </div>

      <h1 className="text-center text-primary">List of Art</h1>
      {artList.map((art) => (
        <DisplayArt art={art} key={art.artId} />
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
