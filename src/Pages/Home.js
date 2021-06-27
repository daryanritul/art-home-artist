import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  CLEAR_ART_LIST,
  SET_ART_CATEGORY,
  SET_LAST_ART,
} from "../action/action.type";

import { getArtListFun } from "../action/art";
import ArtCategorySelector from "../Components/ArtCategorySelector";
import ArtTagSelector from "../Components/ArtTagSelector";
import DisplayArt from "../Components/DisplayArt";

const Home = ({ artList, uid, lastArt, getArtListFun }) => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleFilter = () => {
    dispatch({ type: CLEAR_ART_LIST });
    dispatch({ type: SET_LAST_ART, payload: [] });
    getArtListFun({ uid, history, tagFilter, categoryFilter, lastArt: [] });
  };
  const handleFetchAll = () => {
    dispatch({ type: CLEAR_ART_LIST });
    dispatch({ type: SET_LAST_ART, payload: [] });

    getArtListFun({
      uid,
      history,
      tagFilter: "",
      categoryFilter: "",
      lastArt: [],
    });
  };

  useEffect(() => {
    dispatch({ type: CLEAR_ART_LIST });
    dispatch({ type: SET_LAST_ART, payload: [] });

    if (uid) {
      getArtListFun({
        uid,
        history,
        tagFilter: "",
        categoryFilter: "",
        lastArt: [],
      });
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
              onClick={() => handleFetchAll()}
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
      <button
        onClick={() =>
          getArtListFun({ uid, history, tagFilter, categoryFilter, lastArt })
        }
      >
        More
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  artList: state.art.artList,
  lastArt: state.art.lastArt,
  uid: state.auth.uid,
});

const mapDispatchToProps = {
  getArtListFun: (data) => getArtListFun(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
