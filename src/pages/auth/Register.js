import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Typography, Link, Avatar, IconButton } from '@mui/material';

// import Register Form from "../../sections/auth/RegisterForm";
import AuthSocial from '../../sections/auth/AuthSocial';
import RegisterForm from '../../sections/auth/RegisterForm';

// ----------------------------------------------------------------------

export default function Register() {
    const [upload, setUpload] = useState(false)
    const [image, setImage] = useState(false)
    const [preview, setPreview] = useState(null)

    const uploadInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.addEventListener("load", (e) => {
            setPreview(e.target.result);
            setImage(file)
            setUpload(false)

        });

        reader.readAsDataURL(file);
        console.log(file)
    }


    return (
        <>
            <Stack spacing={2} sx={{ mt: 5, position: 'relative' }}>
                <Typography variant="h4">Get started with Messenger.</Typography>
                <Stack direction={"row"} alignContent={"center"} justifyContent={"center"}>
                    <input
                        ref={uploadInputRef}
                        accept="image/*"
                        id="icon-button-photo"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                    <label htmlFor="icon-button-photo">

                        <IconButton onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                            variant="contained" onMouseEnter={() => { setUpload(true) }} onMouseLeave={() => { setUpload(false) }}  >
                            <Avatar
                                containerElement='label'
                                sx={{ width: 90, height: 90 }}
                                alt="Remy Sharp" src={upload ? "https://t3.ftcdn.net/jpg/02/18/21/86/360_F_218218632_jF6XAkcrlBjv1mAg9Ow0UBMLBaJrhygH.jpg" : (preview ? preview : "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top")}
                            />
                        </IconButton>
                    </label>
                </Stack>
                <Typography textAlign={"center"} variant="body2">{image ? image.name : "Upload Image"}</Typography>
                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2"> Already have an account? </Typography>

                    <Link component={RouterLink} to={"/auth/login"} variant="subtitle2">
                        Sign in
                    </Link>
                </Stack>
            </Stack>

            <RegisterForm image={image} />

            <Typography
                component="div"
                sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
            >
                {'By signing up, I agree to '}
                <Link underline="always" color="text.primary">
                    Terms of Service
                </Link>
                {' and '}
                <Link underline="always" color="text.primary">
                    Privacy Policy
                </Link>
                .
            </Typography>
            {/* Form */}
            {/* 

*/}

            <AuthSocial />
        </>
    );
}