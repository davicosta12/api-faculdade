import { Autocomplete, Box, Button, CircularProgress, TextField } from '@mui/material';
import { Fragment, FunctionComponent, useEffect, useState } from 'react';

interface Props {
}

const AutoCompleteComponent: FunctionComponent<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [breeds, setBreeds] = useState([]);
    const loading = open && breeds?.length === 0;

    useEffect(() => {
        getBreeds();
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setBreeds([]);
        }
    }, [open]);

    const getBreeds = async () => {
        const url = 'https://api.thecatapi.com/v1/breeds';
        await fetch(url)
            .then((resp) => resp.json())
            .then((data) => setBreeds(data))
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Box
            component="form"
            sx={{ display: 'flex', flexWrap: 'wrap' }}
            noValidate
            autoComplete="off"
        >
            <Autocomplete
                disablePortal
                sx={{ m: 1, width: '49ch' }}
                id="combo-box-demo"
                options={breeds?.map((c: any) => Object.assign({}, { id: c.id, label: c.name }))}
                loading={loading}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label="Breeds"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </Fragment>
                            ),
                        }}
                    />}
            />
            <TextField
                id="outlined-basic"
                sx={{ m: 1, width: '49ch' }}
                label="Filled"
                variant="outlined"
            />
        </Box>
    );
};

export default AutoCompleteComponent;
