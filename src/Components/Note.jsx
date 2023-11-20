import React from "react";
import { Button, Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";


const Note=(props)=>{
    const {note}=props;
    return (
        <Box >
        <Card>
        <CardContent>
        <Typography variant="h1" color="text.primary">{note.title}</Typography>
       <Typography variant="p" color="text.secondary">{note.content}</Typography>
        </CardContent>
        </Card>
        <Button onClick={()=>{
            props.editorState.current=note.content;
            props.setClicked(true)
            }}>Open</Button>
        <Button onClick={()=>{
            props.deleteNote(props.note._id);
            }}>Delete</Button>
        </Box>
    )
}

export default Note;





