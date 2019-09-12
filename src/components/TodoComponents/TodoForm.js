import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import Button from "@material-ui/core/Button";
import { LinearProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { CheckboxWithLabel, TextField } from "formik-material-ui";

//Modal Imports
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { makeStyles } from "@material-ui/styles";

const initialValues = {
  title: "",
  description: "",
  dueDate: "",
  completed: false,
  createdAt: Date.now(),
  deleted: false
};

const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string(),
  dueDate: Yup.date()
});

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: "30px",
    width: "50%",
    minWidth: "500px"
  },
  halfWidth: { border: "1px solid black", width: "50%" },
  title: {
    border: "2px solid white",
    borderRadius: 5,
    padding: 7
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 5,
    padding: 5
  }
});

export default props => {
  let type = "";
  const classes = useStyles();

  // Modal Logic
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }; // Modal Logic

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TodoSchema}
      onSubmit={(values, formikBag) => {
        setTimeout(() => {
          formikBag.setSubmitting(false);
          formikBag.resetForm();
          props.addTodo(type, values);
        }, 2000);
      }}
      render={formikBag => {
        return (
          <>
            <Form className={classes.root}>
              <Typography className={classes.title} variant="h5">
                Todo Form
              </Typography>
              <Field fullWidth type="text" label="Title" width={1 / 2} name="title" component={TextField} />
              <br />
              <Field fullWidth type="text" label="Description" multiline rows="4" name="description" component={TextField} />
              <br />
              <Field Label={{ label: "Completed" }} name="completed" component={CheckboxWithLabel} />

              <br />
              <Field InputLabelProps={{ shrink: true }} type="date" label="Due Date" name="dueDate" component={TextField} />

              <br />
              {formikBag.isSubmitting && <LinearProgress />}
              <br />
              {/* ======================= */}
              <Button
                onClick={() => {
                  type = "rfcTodoList";
                  formikBag.submitForm();
                }}
                name="rfcTodoList"
                variant="contained"
                color="primary"
                disabled={formikBag.isSubmitting}
              >
                Add to RFC
              </Button>
              {/* ======================= */}
              <Button
                variant="contained"
                color="primary"
                disabled={formikBag.isSubmitting}
                onClick={() => {
                  type = "rccTodoList";
                  formikBag.submitForm();
                }}
              >
                Add to RCC
              </Button>
              <br />
              <Button variant="contained" color="secondary" disabled={formikBag.isSubmitting} onClick={props.safeDelete}>
                Safe Delete
              </Button>
              <Button variant="contained" color="primary" disabled={formikBag.isSubmitting} onClick={props.undoDelete}>
                Undo Delete
              </Button>
              <Button variant="contained" color="secondary" disabled={formikBag.isSubmitting} onClick={handleOpen}>
                Hard Delete
              </Button>
              <br />
            </Form>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Are you sure you want to delete? This cannot be undone</h2>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      props.hardDelete();
                      handleClose();
                    }}
                  >
                    Yes
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleClose}>
                    Go Back
                  </Button>
                </div>
              </Fade>
            </Modal>{" "}
          </>
        );
      }}
    />
  );
};
