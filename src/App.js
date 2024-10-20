import './App.css';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react'
import { TerminalComponent } from './TerminalComponent';
import { Window } from './Window';
import socialsLogo from './socials.txt';
import socialLinks from './socialLinks.txt';
import aboutLogo from './aboutLogo.txt';
import aboutBody from './aboutText.txt';
import projectsLogo from './projectsLogo.txt';
import projectsLinks from './projectsLinks.txt';
import kitty1 from './kitty1.txt';
import kitty2 from './kitty2.txt';

function App() {
	const [time, setTime] = useState(Date.now());
	const [frameTime, setFrameTime] = useState(false);
	
	useEffect(() => {
	const interval = setInterval(() => setTime(Date.now()), 1000);
	console.log("interval");
		setFrameTime(!frameTime);
		return () => {
			clearInterval(interval);
		};
	}, [time]);
 	return (
		<div style={{background:'#000000', minHeight:'100vh'}}>
			<div display="flex" justifyContent={'space-between'} alignContent={'space-between'} style={{background:'#000000'}}>
				<TerminalComponent style={{minHeight:'100%'}}/>
			</div>
			<Box display="flex" justifyContent={'space-between'} alignContent={'space-between'}>
				<Box>
					<div style={{background:'#000000'}}>
						<Window width={75} name={'socials.txt'} logo={socialsLogo} links={socialLinks} body={""}></Window>
					</div>
				</Box>
				<Box>
					<div style={{background:'#000000'}}>
						<Window width={80} name={'about.txt'} logo={aboutLogo} links={""} body={aboutBody}></Window>
					</div>
				</Box>
				<Box>
					<div style={{background:'#000000'}}>
						<Window width={75} name={'projects.txt'} logo={projectsLogo} links={projectsLinks} body={""}></Window>
					</div>
				</Box>
			</Box>
			<Box display="flex" justifyContent={'center'} alignContent={'center'}>
				<div hidden={!frameTime} style={{background:'#000000'}}>
					<Window width={85} name={'kitty.exe'} logo={kitty1} links={""} body={""}></Window>
				</div>
				<div hidden={frameTime} style={{background:'#000000'}}>
					<Window width={85} name={'kitty.exe'} logo={kitty2} links={""} body={""}></Window>
				</div>
			</Box>
		</div>
	);
}

export default App;
