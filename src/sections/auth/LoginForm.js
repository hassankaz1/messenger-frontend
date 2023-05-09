import React, { useState } from 'react'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from '../../components/hook-form/FormProvider'
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import { RHFTextField } from '../../components/hook-form';
import { Eye, EyeSlash } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../redux/slices/auth';
import { ResetCurrentConversation } from '../../redux/slices/conversation';




const LoginForm = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false)
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
    });

    const defaultValues = {
        email: "your@email.com",
        password: "hire me",
    };


    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        try {
            // submit data to backend
            dispatch(LoginUser(data))
            dispatch(ResetCurrentConversation())

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
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}

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

            <Stack alignItems="flex-end" sx={{ my: 2 }}>
                <Link component={RouterLink} to="/auth/reset-password" variant="body2" color="inherit" underline="always">
                    Forgot password?
                </Link>
            </Stack>

            <Button
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                // loading={isLoading}
                sx={{
                    bgcolor: "text.primary",
                    border: "2px solid black",
                    color: (theme) =>
                        theme.palette.mode === "light" ? "common.white" : "grey.800",
                    '&:hover': {
                        color: "text.primary",
                        bgcolor: (theme) =>
                            theme.palette.mode === "light" ? "common.white" : "grey.800",
                    },
                }}
            >
                Login
            </Button>
            {/* 
            </Stack>

            
             */}
        </FormProvider>

    )
}

export default LoginForm;