import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_STATE_TO_UPDATE_ART } from "../action/action.type";
import {
  deleteArtFun,
  toggleArtArchiveFun,
  deleteArtImageFun,
} from "../action/art";

const DisplayArt = ({
  art,
  uid,
  deleteArtFun,
  toggleArtArchiveFun,
  deleteArtImageFun,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showConfirmDeleteInput, setShowConfirmDeleteInput] = useState(false);
  const [inputForConfirmDelete, setInputForConfirmDelete] = useState("");

  const handleDelete = () => {
    if (inputForConfirmDelete === "delete") {
      deleteArtFun({ uid, artId: art.artId, archiveValue: !art.isArchive });
      setInputForConfirmDelete("");
      setShowConfirmDeleteInput(false);
      deleteArtImageFun({ uid, downloadName: art.downloadName });
    } else {
      setInputForConfirmDelete("");
    }
  };

  return (
    <div
      className={
        art.isArchive
          ? "card border border-3 m-2 p-2 text-white bg-dark"
          : "card border border-3 m-2 p-2"
      }
    >
      <div className="row ">
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
                If You want to delete type
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

              {art.isArchive ? (
                <button
                  className="btn btn-primary m-1"
                  onClick={() =>
                    toggleArtArchiveFun({
                      artId: art.artId,
                      archiveValue: false,
                    })
                  }
                >
                  Move to Public
                </button>
              ) : (
                <button
                  className="btn btn-primary m-1"
                  onClick={() =>
                    toggleArtArchiveFun({
                      artId: art.artId,
                      archiveValue: true,
                    })
                  }
                >
                  Move to Archive
                </button>
              )}

              <button
                className="btn btn-warning m-1"
                onClick={() => setShowConfirmDeleteInput(true)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Download
        </button>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Download Image
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="row">
                <a href={art.downloadUrl} download>
                  <img src={art.downloadUrl} className="w-75" />
                </a>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
});
const mapDispatchToProps = {
  deleteArtFun: (data) => deleteArtFun(data),
  toggleArtArchiveFun: (data) => toggleArtArchiveFun(data),
  deleteArtImageFun: (data) => deleteArtImageFun(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayArt);
