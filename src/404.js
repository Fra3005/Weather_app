import React from "react";
import { Alert } from '@mui/material'


const Error404 = () =>{



    return (
        <div>
            <Alert severity="error">
             The name of city is wrong! Try again!
             </Alert>
        </div>
    );
}

export default Error404;