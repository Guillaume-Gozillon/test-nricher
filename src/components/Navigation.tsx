import { Stack } from "@mui/material";
import { ReactNode } from "react";
import logo from "../assets/nricher.svg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type MyComponentProps = {
  children: ReactNode;
};

const Navigation = ({ children }: MyComponentProps) => {
  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        marginTop={3}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <img src={logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
        <Button variant="text" component={Link} to="/" color="primary">
          Accueil
        </Button>
        <Button
          disabled
          variant="text"
          component={Link}
          to="/about"
          color="primary"
        >
          À propos
        </Button>
      </Stack>
      {children}
    </>
  );
};

export default Navigation;
