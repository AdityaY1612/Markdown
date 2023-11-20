import React from 'react'
import { Stack,Box, Typography,Divider, Button } from '@mui/material'
const Sidebar = (props) => {
  const notes=props.notes
  return (
    <Stack divider={<Divider orientation="horizontal" flexItem />} justifyContent='flex-start' spacing='2rem' Height='95%' maxHeight='95%' sx={{overflowY:'scroll'}} >
      {notes.map((note) =>{
        return    <Button onClick= {()=>{
            props.editorState.current=note.content;
            props.setClicked(true)
            }}>
        <Typography variant='button'>
          {note.title}
        </Typography>
        </Button>
      })}
   
    </Stack>
  )
}

export default Sidebar