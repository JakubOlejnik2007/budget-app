import { Typography } from "@mui/material";
import DropdownMenu from "../../structure/dropdown-menu";

const UserPanel = () => {

    return (
        <>
            <Typography
                variant="h1"
                sx={{
                    fontSize: "3rem",
                    textAlign: "center",
                }}>
                Panel użytkownika
            </Typography>
            <DropdownMenu />
        </>
    );
};

export default UserPanel;
