import { Box } from "@mui/material";

export function CustomTotalsComponent(props: {
    totalRows: number;
}) {
    return (
        <Box sx={{ p: 2 }}>
            Total: {props.totalRows} linhas
        </Box>
    );
}