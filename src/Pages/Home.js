import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_STATE_TO_UPDATE_ART } from "../action/action.type";

import { getArtListFun } from "../action/art";

const Home = ({ artList, uid, getArtListFun }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (uid) {
      getArtListFun({ uid });
    }
  }, [uid]);

  console.log("artlist", artList);
  return (
    <div className="container border border-2 border-success mt-4">
      <h1 className="text-center text-primary">List of Art</h1>
      {artList.map((art) => {
        return (
          <div className="row border border-3 m-2 p-2">
            <div className="col-sm-6">
              <img src={art.imageUrl} className="w-75" />
            </div>
            <div className="col-sm-6">
              <h5>Art Name:</h5>
              <p>{art.artName}</p>
              <h5>Art Category:</h5>
              <p>{art.category}</p>
              <h5>Art Description:</h5>
              <p>{art.description}</p>
              <h5>Art Tag</h5>
              {art.tag.map((tag, index) => (
                <p key={index}>{tag}</p>
              ))}

              <button
                className="btn btn-success"
                onClick={() => {
                  dispatch({
                    type: SET_STATE_TO_UPDATE_ART,
                    payload: { ...art },
                  });
                  history.push("art/edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
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
