import React,{useState,useRef, useEffect} from "react";
import { EditorView, highlightActiveLine, lineNumbers } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { bracketMatching, defaultHighlightStyle, indentOnInput } from "@codemirror/language";
import { markdown,markdownLanguage } from "@codemirror/lang-markdown";
import { HighlightStyle } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import { LanguageSupport, } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { syntaxHighlighting } from "@codemirror/language";
import { highlightActiveLineGutter } from "@codemirror/view";
import { languages } from "@codemirror/language-data";
import shortid from 'shortid'
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


const useCodeMirror=({editorState,setEditorState,outputState,setOutputState})=>{
    const ref=useRef(null);
    console.log(editorState);
    const [view,setView]=useState(null);
    const isImagePasted=useRef(false);
    const imageMappings=useRef({});
    useEffect(()=>{
        if(!ref.current){
            return;
        }
        const fixedHeightEditor = EditorView.theme({
            "&": {height: "100%"},
            ".cm-scroller": {overflow: "auto"}
          })
        const startrState=EditorState.create({
            doc:editorState,
            contentHeight:"100vh",
            extensions:[lineNumbers(),highlightActiveLine(),indentOnInput(),bracketMatching(),fixedHeightEditor,highlightActiveLineGutter(), markdown({
                base: markdownLanguage,
                codeLanguages:languages,
                addKeymap:true //Support GFM
              }),oneDark,syntaxHighlighting(markdownHighlighting),EditorView.lineWrapping,EditorView.updateListener.of((update)=>{
                if(update.docChanged){
                    if (update.docChanged) {
                        const editorContent = update.state.doc.toString();
                        setEditorState(editorContent);

                        let outputContent = editorContent;
                        for (let placeholder in imageMappings.current) {
                            const actualImageMarkdown = imageMappings.current[placeholder];
                            outputContent = outputContent.replace(`![${placeholder}]`, actualImageMarkdown);
                           console.log(outputContent);
                        }
                        setOutputState(outputContent);
                    }

                   
                    
                }
            }),EditorView.domEventHandlers({
                paste(event){
                    
                    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
                    console.log(items);
                    console.log(JSON.stringify(items))
                    //console.log(JSON.stringify(items));
                    //console.log("Hello World!");
                    var blob = null;
                    for (var i = 0; i < items.length; i++) {
                      if (items[i].type.indexOf("image") === 0) {
                        blob = items[i].getAsFile();
                      }
                    }
                    // load image if there is a pasted image
                    if (blob !== null) {
                        
                      var reader = new FileReader();
                      reader.onload = function(event) {
                        //console.log(event.target.result); // data url!
                          const imageUrl=event.target.result;
                          const  img= new Image();
                          console.log(typeof(imageUrl))
                          img.src=imageUrl;
                          const imageId=shortid();
                          img.onload= function (){
                              const canvas = document.createElement("canvas");
                              const context = canvas.getContext("2d");
                              canvas.width = img.width;
                              canvas.height = img.height;
                              context.drawImage(img, 0, 0);
                              const newUrl=canvas.toDataURL("image/jpeg");
                              //console.log(newUrl);
                              const markdown = `![${imageId}]`;
                              const newMarkdownOutput = `${outputState}\n![${imageId}](${newUrl})\n`;
                              imageMappings.current[`${imageId}`] = `![](${newUrl})`
                              setOutputState(newMarkdownOutput)
                              const {state,dispatch}=view;
                              isImagePasted.current=true;
                              console.log(isImagePasted);
                              dispatch(state.update({
                                  changes:{
                                      from:state.selection.main.head,
                                      to:state.selection.main.head,
                                      insert:markdown
                                  }
                              }))
                              
                          }
                        
                      };
                      reader.readAsDataURL(blob);
                     
                    }
                }
            })]
        })

        const view = new EditorView({
            state:startrState,
            parent:ref.current,
        })
        setView(view);
    },[ref])
    

    return [ref,view, imageMappings];
}

export default useCodeMirror;