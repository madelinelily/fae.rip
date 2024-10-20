import * as React from "react";
import { XTerm } from "@pablo-lion/xterm-react";
import raw from '././logo.ansi';
import { Box } from "@mui/material";

export const TerminalComponent = () => {
	const xterm = React.useRef(null);

	React.useEffect(() => {
		// You can call most method in XTerm.js by using 'xterm.current.[METHOD_NAME]`
		// For not exposed methods below, we have to use 'xterm.current.terminal.[METHOD_NAME]`
		const terminal = xterm.current.terminal;
		fetch(raw)
		.then(r => r.text())
		.then(text => {
			text = text.replaceAll("\\u001b", "\u001b");
			text = text.replaceAll("\n", "");
			xterm.current.write('\x1b[?47h')
			xterm.current.writeln(text);
		});
	}, []);
	var options = {
		cols:200,
		rows:40,
		scrollback:0,
		fontSize:10,
		cursorInactiveStyle:'none',
		theme:{
			cursor:'#000000'
		},
	};
	return (
		// Create a new terminal and set it's ref.
		<Box display="flex" justifyContent={'center'} alignContent={'center'} style={{minHeight:'100%', maxWidth:'100vw', overflow:'hidden'}}>
			<div style={{minHeight:'100%', overflow:'hidden'}}>
				<XTerm  options={options} ref={xterm} />
			</div>
		</Box>
	);
};  