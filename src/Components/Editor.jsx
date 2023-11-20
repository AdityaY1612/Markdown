import { useState, createElement, Fragment } from "react";
import useCodeMirror from "./useCodeMirror";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react/lib";
import "./Editor.css"
import Button from '@mui/material/Button';
import { Grid, Input, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import rehypePrismAll from "rehype-prism-plus/all";


const Editor=(props)=>{
    
    const [outputState,setOutputState]=useState(props.editorState.current);
    const [editorState,setEditorState]= useState(props.editorState.current);
    const [title,setTitle]=useState("");
   // const [editorRef,editorView]=useCodeMirror({initialDoc:editorState.current,setEditorState,outputState,setOutputState})
    const [editorRef,editorView, images]=useCodeMirror({editorState,setEditorState,outputState,setOutputState})
    const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrismAll, {ignoreMissing: true})
    .use(rehypeReact, { createElement, Fragment })
    .processSync(outputState).result;


    console.log("I am rendered!");
    console.log(images.current )
    
    const saveNote=()=>{
        const note={
            title: title,
            content:editorState
        }
        console.log("I am in save note!");
        props.addNotes(note)
        props.setClicked(false)
    }



    return <div><Grid container flexDirection="row" justifyContent="space-between" style={{paddingLeft:"auto",paddingRight:"auto"}}>
        <Grid item><Typography variant="span" color="primary">Title:<Input value={title} onChange={(e)=>setTitle(e.target.value)}/></Typography></Grid>
        <Grid item></Grid>
        <Grid item><Button onClick={saveNote}><SaveIcon/></Button></Grid>
    </Grid>
         <div className="editorContainer" style={{marginTop:"2rem"}} >
    <div ref={editorRef} className="editor" id="markdown" />
    <code className="output" id="preview">{md}</code>
   
</div></div>
   
}

export default Editor;