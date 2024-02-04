import {
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
} from "@mui/material";
import React from "react";
import * as Yup from "yup";
// components
import FormProvider, { RHFTextField } from "../../components/hook-form";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFAutocomplete from "../../components/hook-form/RHFAutoComplete";

const Members = ["Amaar Raza", "Mahmood Rasheed", "Hassnain Raza"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// import { LoginUser } from "../../redux/slices/auth";
// import { useDispatch, useSelector } from "react-redux";

// ----------------------------------------------------------------------

function CreateGroupForm({ handleClose }) {
  // const {isLoading} = useSelector((state) => state.auth);

  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    members: Yup.array().min(2, "Must have at least 2 members"),
  });

  const defaultValues = {
    title: "",
    members: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // console.log(data);
      // submit data to backend
      // dispatch(LoginUser(data));
    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />
        <RHFAutocomplete
          name="members"
          label="Members"
          multiple
          freeSolo
          options={Members.map((option) => option)}
          ChipProps={{ size: "medium" }}
        />
        <Stack
          spacing={2}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"end"}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="containde">
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4 }}
    >
      <DialogTitle sx={{ mb: 3 }}>Create New Group</DialogTitle>

      <DialogContent>
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
