import React, { useState } from "react";
import Note from "./Note";
import Editor from "./Editor";


const NoteEditor=(props)=>{
    const [note,setNote]=useState({
        title:"",
        content:""
    })
    const handleChange= (event)=>{
        const {name,value}=event.target;
        console.log(name+" "+value+" ");
        console.log({
            ...note,
            [name]:value
        });
        setNote(() =>{
            return {
                ...note,
                [name]:value
            }
        })
    }
    return<div>
        <input type="text" value={note.title} onChange={handleChange} name="title" />
        <input type="text" value={note.content} onChange={handleChange} name="content" />

        <button onClick={()=>{
            props.addNotes(note)
        }}>Add note!</button>
        {props.clicked&&<Editor/>}
    </div>
}

export default NoteEditor;