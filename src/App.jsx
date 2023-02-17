import { useState } from 'react'
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
import { Button } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [clicked, setClicked] = useState(false)
  const [notes,setNotes]=useState([
    {
    title:1,
    content:"Content for note 1"
    },
    {
      title:2,
      content:"Content for note 1"
    },
    {
      title:3,
      content:"Content for note 1"
    }
  
])
const addNotes=(note)=>{
  setNotes([...notes,note]);
}
  const clickHandler=()=>{
    setClicked(!clicked);
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <div className="App">
      <Button onClick={clickHandler}><AddCircleIcon fontSize='large'/></Button>
      <br/>
      <br/>
      {clicked?<Editor addNotes={addNotes} />:<Notes notes={notes} changeNotes={setNotes} />}
        
    </div>
    </ThemeProvider>
  )
}

export default App
