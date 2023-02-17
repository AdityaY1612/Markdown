import React from "react";
import Note from "./Note";
import { Grid } from "@mui/material";


const  Notes=(props)=>{
    return<Grid container spacing={4} justifyContent="space-evenly">
     {    props.notes.map((note)=>{
        return <Grid item xs={3} padding={3} width={1}><Note note={note} /></Grid>
    })}
    </Grid>
}

export default Notes;