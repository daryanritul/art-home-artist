import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CLEAR_ART_LIST, SET_LAST_ART } from '../action/action.type';

import { getArtListFun } from '../action/art';
import ArtCategorySelector from '../Components/ArtCategorySelector';
import DisplayArt from '../Components/DisplayArt';

const Home = ({ artList, uid, lastArt, totalArt, getArtListFun }) => {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selector, setSelector] = useState({ search: '', category: 'All' });
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLoadMore = async () => {
    await getArtListFun({
      uid,
      history,
      search: selector.search.toLowerCase(),
      category: selector.category,
      lastArt,
    });
  };

  useEffect(() => {
    dispatch({ type: CLEAR_ART_LIST });
    dispatch({ type: SET_LAST_ART, payload: [] });

    if (uid) {
      getArtListFun({
        uid,
        history,
        search: selector.search.toLowerCase(),
        category: selector.category,
        lastArt: [],
      });
    }
  }, [uid, selector]);

  return (
    <>
      <div className="container  mt-4">
        <div className="m-3 p-2 border  row">
          <div className="artTitle">
            <p className="artTitle-big">My Arts</p>
            <p className="artTitle-small">
              Total : {artList.length} / {totalArt}
            </p>
          </div>
        </div>
        <div className="m-3 p-2 border  row">
          <div className="col-lg-4">
            <label htmlFor="categoryFilter" className="form-label">
              Search Arts by Name, Tags
            </label>
            <input
              className="form-control"
              type="text"
              name="confiumDelete"
              placeholder="Enter Name, Tags Here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-lg-4">
            <label htmlFor="categoryFilter" className="form-label">
              Select Category To filter
            </label>
            <ArtCategorySelector
              name="categoryFilter"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </div>

          <div
            className="col-lg-4 "
            style={{
              position: 'relative',
            }}
          >
            <div
              className="filter-buttons"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                className="btn btn-success m-1"
                onClick={() =>
                  setSelector({
                    ...selector,
                    search,
                    category,
                  })
                }
              >
                Filter
              </button>
              <button
                className="btn btn-primary m-1"
                onClick={() => {
                  setCategory('All');
                  setSearch('');
                  setSelector({ search: '', category: 'All' });
                }}
              >
                View All
              </button>
            </div>
          </div>
        </div>

        {artList.map((art, index) => (
          <DisplayArt art={art} key={art.artId} index={index} />
        ))}
        <div className="more">
          <button
            className="btn btn-primary viewMore"
            onClick={() => handleLoadMore()}
          >
            View More
          </button>
        </div>
      </div>
      <div className="addArtBtn">
        <Link to="/art/add">
          <button className="btn btn-primary ">ADD MORE ARTS</button>
        </Link>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  artList: state.art.artList,
  lastArt: state.art.lastArt,
  uid: state.auth.uid,
  totalArt: state.auth.artistProfile.totalArt,
});

const mapDispatchToProps = {
  getArtListFun: (data) => getArtListFun(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
