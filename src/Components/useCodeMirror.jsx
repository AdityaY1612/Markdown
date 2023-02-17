import React,{useState,useRef, useEffect} from "react";
import { EditorView, highlightActiveLine, lineNumbers } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { bracketMatching, defaultHighlightStyle, indentOnInput } from "@codemirror/language";
import { markdown,markdownLanguage } from "@codemirror/lang-markdown";
import { HighlightStyle } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import { LanguageSupport } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { syntaxHighlighting } from "@codemirror/language";
import { highlightActiveLineGutter } from "@codemirror/view";
export const transparentTheme=EditorView.theme({
    '&':{
        backgroundColor:'transparent !important',
        height: '100%'
    }
})

const markdownHighlighting=HighlightStyle.define([
    {
        tag: tags.heading1,
        fontSize: '1.6em',
        fontWeight: 'bold'  
    },
    {
        tag: tags.heading2,
        fontSize:'1.4em',
        fontWeight:'bold'
    },
    {
        tag:tags.heading3,
        fontSize:'1.2em',
        fontWeight:'bold',
    }
])


const useCodeMirror=({initialDoc,setDoc})=>{
    const ref=useRef(null);
    const [view,setView]=useState(null);
    useEffect(()=>{
        if(!ref.current){
            return;
        }
        const fixedHeightEditor = EditorView.theme({
            "&": {height: "100%"},
            ".cm-scroller": {overflow: "auto"}
          })
        const startrState=EditorState.create({
            doc:initialDoc,
            contentHeight:"100vh",
            extensions:[lineNumbers(),highlightActiveLine(),indentOnInput(),bracketMatching(),fixedHeightEditor,highlightActiveLineGutter(), markdown({
                base: markdownLanguage,
                codeLanguages:LanguageSupport,
                addKeymap:true //Support GFM
              }),oneDark,syntaxHighlighting(markdownHighlighting),EditorView.lineWrapping,EditorView.updateListener.of((update)=>{
                if(update.docChanged){
                    setDoc(update.state.doc.toString())
                }
            })]
        })

        const view = new EditorView({
            state:startrState,
            parent:ref.current
        })
        setView(view);
    },[ref])

    return [ref,view];
}

export default useCodeMirror;