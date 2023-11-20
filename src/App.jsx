import { useRef, useState, useEffect } from 'react'
import './App.css'
import Note from './Components/Note'
import Notes from './Components/Notes'
import NoteEditor from './Components/NoteEditor'
import Editor from './Components/Editor'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button,Stack, Box } from '@mui/material'
import 'prism-theme-one-light-dark/prism-onedark.css';
import Sidebar from './Components/Sidebar'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    
  },
  
});

function App() {
  const [clicked, setClicked] = useState(false);
  const editorState=useRef("")
  const [notes,setNotes]=useState([]);
const fetchData = async function() {
  let fetchedNotes = await fetch("http://localhost:3000/note");
  console.log(fetchedNotes);
  
  fetchedNotes = await fetchedNotes.json();

  setNotes(fetchedNotes.notes)
}

const addNotes = async function(note) {
  console.log(JSON.stringify(note))
  let addedNotes = await fetch("http://localhost:3000/note", {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(note)});

  addedNotes = await addedNotes.json();

  fetchData()
}

const deleteNote = async function (noteId) {
  console.log("http://localhost:3000/note?id="+noteId);
  let deletedNote = await fetch("http://localhost:3000/note?id="+noteId, {method:'DELETE'})

  deletedNote = await deletedNote.json()
  console.log(deletedNote)
  fetchData()
}

useEffect(()=> { 
  fetchData()
}, [notes.length]);

  const clickHandler=()=>{
    setClicked(!clicked);
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Box className="App" height='100vh'>
      <Stack direction="horizontal" sx={{height:'100%'}}>
      <Box width='16rem' sx={{height:'100%'}}>
      <Sidebar notes={notes} editorState={editorState} setClicked={setClicked}/>

      </Box>
      <Box sx={{width:'100%'}}>
      <Button onClick={clickHandler}><AddCircleIcon fontSize='large'/></Button>
      <br/>
      <br/>
      {clicked?<Editor addNotes={addNotes} editorState={editorState} setClicked={setClicked}/>:<Notes notes={notes} changeNotes={setNotes} setClicked={setClicked} deleteNote={deleteNote} editorState={editorState}  />}
      </Box>
      </Stack>
    </Box>
    </ThemeProvider>
  )
}

export default App
