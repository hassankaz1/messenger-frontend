import { Container, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import Logo from "../../assets/Images/logo.ico"

const MainLayout = () => {

  const { isLoggedIn } = useSelector((state) => state.auth)

  if (isLoggedIn) {
    return <Navigate to="/app" />;
  }
  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <Stack spacing={5}>
          {/* <Stack sx={{ width: "100%" }} direction="column" alignItems={"center"}>
            <img style={{ height: "90px", width: "90px" }} src={Logo} alt="none" />
          </Stack> */}
        </Stack>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
