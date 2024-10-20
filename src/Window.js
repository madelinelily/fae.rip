import * as React from "react";
import { useState } from 'react'

export const Window = ({width, name, logo, links, body}) => {

    const [logoText, setLogoText] = useState("");
    const [linksText, setLinksText] = useState("");
    const [bodyText, setBodyText] = useState("");
    const codeStyle = {
        minHeight:'100%',
        minWidth:'100%', 
        color:'white', 
        fontFamily:'monospace', 
        whiteSpace:'pre'
    }
    const underscore = "_";
    const space = " ";
    const emptyLine = "|" + space.repeat(width-2)+"|";
    const endLine = "|" + underscore.repeat(width-2)+"|";


    fetch(logo)
		.then(r => r.text())
		.then(text => {
            setLogoText(text);
    });

    if(links != ""){
        fetch(links)
            .then(r => r.text())
            .then(text => {
                setLinksText(text);
        });
    }

    if(body != ""){
        fetch(body)
            .then(r => r.text())
            .then(text => {
                setBodyText(text.replace(/(\r\n|\n|\r)/gm, ""));
        });
    }


	function generateWindowHeader(width, name){
        var top = " " + underscore.repeat(width-2) +" ";
        var header = name + space.repeat(width-name.length-10) + "-" + space.repeat(2) + "□" + space.repeat(2) + "x" + space;
        return(
            <div>
                <div style={codeStyle}>
                    {top}
                </div>
                <div style={codeStyle}>
                    {"|"}
                    <u>{header}</u>
                    {"|"}
                </div>
            </div>
        )
    }


    function generateWindowLogo(width){
        return(
            <div>
                <div style={codeStyle}>
                    {emptyLine}
                </div>
                {logoText.split('\n').map(text => 
                    <div style={codeStyle}>
                        {generateLine(text, width)}
                    </div>
                )}
            </div>
        )
    }


    function generateLine(text, width){
        if(text == "discord - snapcaster.mage"){
            console.log("yes");
            console.log(text, width);
        }
        var count = width-text.length-1;
        if(count < 0){
            count = 0;
        }
        if(text.replace(" ","") == ""){
            return(emptyLine);
        }
        var line = "|" + text + space.repeat(count);
        line += "|";
        return line;
    }


    function generateEndline(){
        return(
            <div style={codeStyle}>
                {endLine}
            </div>
        )
    }

    function generateLinkList(){
        if(linksText == ""){
            return;
        }
        return(
            linksText.split("\n").map(text => generateLink(text))
        );
    }

    function generateLink(input){
        var list = input.split(",");
        var text = list[0];
        var link = list[1];
        if(link == "x"){
            return(
                <div style={codeStyle}>
                    {generateLine(" " + text, width-1)}
                </div>
            );
        }
        var count = width-text.length-3;
        if(count < 0){
            count = 0;
        }
        return(
            <div style={codeStyle}>
                {"| "}
                <a href={link}>{text}</a>
                {space.repeat(count) + "|"}
            </div>
        )
    }

    function generateBody(width, input){
        if(input == ""){
            return;
        }
        if(input.length < width){
            return(
                <div style={codeStyle}>
                    {generateLine(input, width-1)}
                </div>
            )
        }
        var text = input;
        //width-4 for leading "| " and trailing "|", plus an extra for 0-indexing
        var currentText = text.substring(0, width-4);
        var index = currentText.length-1;
        while(index > 0){
            if(currentText[index] == " " || currentText[index] == "."){
                break;
            }
            index--;
        }
        currentText = currentText.substring(0, index);
        var nextText = text.substring(index, text.length);
        if(nextText == ""){
            return(
                <div style={codeStyle}>
                    {generateLine(currentText, width-1)}
                </div>
            )
        }
        return(
            <>
                <div style={codeStyle}>
                    {generateLine(currentText, width-1)}
                </div>
                {generateBody(width, nextText)}
            </>
        )
    }

	return (
        <div>
            {generateWindowHeader(width, name)}
            {generateWindowLogo(width)}
            {generateLinkList()}
            {generateBody(width, bodyText)}
            {generateEndline()}
        </div>
	);
};  