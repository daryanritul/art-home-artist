import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_STATE_TO_UPDATE_ART } from "../action/action.type";
import { deleteArtFun } from "../action/art";

const DisplayArt = ({ art, uid, deleteArtFun }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showConfirmDeleteInput, setShowConfirmDeleteInput] = useState(false);
  const [inputForConfirmDelete, setInputForConfirmDelete] = useState("");

  const handleDelete = () => {
    if (inputForConfirmDelete === "delete") {
      deleteArtFun({ uid, artId: art.artId });
      setInputForConfirmDelete("");
      setShowConfirmDeleteInput(false);
    } else {
      setInputForConfirmDelete("");
    }
  };

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

        {showConfirmDeleteInput ? (
          <div>
            <h4>Aru you sure to delete Art</h4>
            <h5>
              If You want to delete type{" "}
              <strong className="text-warning">delete</strong> in inpute box
            </h5>
            <input
              className="form-control"
              type="text"
              name="confiumDelete"
              placeholder="Enter delete"
              value={inputForConfirmDelete}
              onChange={(e) => setInputForConfirmDelete(e.target.value)}
            />
            <button
              className="btn btn-warning m-2"
              onClick={() => handleDelete()}
            >
              Confium
            </button>
            <button
              className="btn btn-success m-2"
              onClick={() => setShowConfirmDeleteInput(false)}
            >
              Don't Delete
            </button>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-success m-1"
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
            <button
              className="btn btn-warning m-1"
              onClick={() => setShowConfirmDeleteInput(true)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
});
const mapDispatchToProps = {
  deleteArtFun: (data) => deleteArtFun(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayArt);
