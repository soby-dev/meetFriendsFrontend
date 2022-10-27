import * as React from "react";
import { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import AuthContext from "./AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteEvent(props) {
  const [deleteModal, setDeleteModal] = useState(false);

  const { code, removeItem, url } = props;

  return (
    <div style={{ padding: "0px 10px" }}>
      <IconButton
        sx={{ float: "right", p: 0 }}
        aria-label="delete"
        onClick={(e) => setDeleteModal(true)}
      >
        <DeleteIcon />
      </IconButton>
      <DeleteModal
        show={deleteModal}
        closeCanvas={() => setDeleteModal(false)}
        code={code}
        remove={removeItem}
        url={url}
      ></DeleteModal>
    </div>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  pt: 0,
  height: 0.25,
  overflow: "scroll",
};

function DeleteModal(props) {
  const { show, closeCanvas, code, remove, url } = props;
  let { authToken } = useContext(AuthContext);

  const deleteItem = () => {
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + String(authToken.access),
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            toast.error(Object.values(data)[0], {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 8000,
            });
          });
        } else {
          toast.error("deleted", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          closeCanvas();
          remove(code);
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 8000,
        });
      });
  };

  return (
    <div>
      <Modal
        open={show}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography variant="h6" component="h2" align="right">
              <CloseIcon
                cursor="pointer"
                onClick={() => closeCanvas()}
              ></CloseIcon>
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 2 }}
            >
              Are you sure you want to delete this?
            </Typography>
            <Box textAlign="right">
              <Button
                type="button"
                variant="contained"
                onClick={() => deleteItem()}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
