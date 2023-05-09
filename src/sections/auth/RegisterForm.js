import { useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack, Alert, IconButton, InputAdornment, Button } from "@mui/material";

// components
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { RegisterUser } from "../../redux/slices/auth";
import { useDispatch } from 'react-redux';
import BackendApi from "../../backendApi";


// ----------------------------------------------------------------------

const RegisterForm = ({ image }) => {

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required("First name required"),
        lastName: Yup.string().required("Last name required"),
        email: Yup.string()
            .required("Email is required")
            .email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
    });

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "your@email.com",
        password: "hire me",
    };

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
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
            // submit data to backend
            // data.image = image
            // console.log(image)
            const s3url = await BackendApi.getS3Url()
            // console.log(res)

            if (image) {
                const uploading = await fetch(s3url.url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    body: image
                })
                const avatarUrl = s3url.url.split('?')[0]
                data.avatar = avatarUrl
            } else {
                data.avatar = "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top"
            }

            dispatch(RegisterUser(data))


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
            <Stack spacing={3} mb={4}>
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <RHFTextField name="firstName" label="First name" />
                    <RHFTextField name="lastName" label="Last name" />
                </Stack>

                <RHFTextField name="email" label="Email address" />

                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

            </Stack>

            <Button
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                sx={{
                    bgcolor: "text.primary",
                    color: (theme) =>
                        theme.palette.mode === "light" ? "common.white" : "grey.800",
                    "&:hover": {
                        bgcolor: "text.primary",
                        color: (theme) =>
                            theme.palette.mode === "light" ? "common.white" : "grey.800",
                    },
                }}
            >
                Create Account
            </Button>
        </FormProvider>
    );
}

export default RegisterForm;