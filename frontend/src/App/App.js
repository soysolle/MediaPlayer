import { useState } from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';
import Login from '../views/Login.js';
import Account from '../views/Account.js';
import Home from '../views/Home.js';
import SystemState from '../views/SystemState.js';
import HLSVideo from '../views/HLSVideo';
import Video from '../views/Video';
import { useBackHandler, useCloseHandler, useDocumentEvent } from './AppState';
import { isDevServe } from '../libs/utils';

/* istanbul ignore next */
if (isDevServe()) {
	window.webOSSystem = {
		highContrast: 'off',
		close: () => { },
		platformBack: () => { },
		PmLogString: () => { },
		screenOrientation: 'landscape',
		setWindowOrientation: () => { }
	};
}

const App = (props) => {
	const [skinVariants, setSkinVariants] = useState({ highContrast: false });
	const [currentPanel, setCurrentPanel] = useState('home'); // State to manage current panel
	const [currentVideoSrc, setCurrentVideoSrc] = useState(''); // Store video source for HLSVideo
	const [user_id, setUserId] = useState('guest'); // User identifier
	const [selectedVideo, setSelectedVideo] = useState(null); // Store selected video details
	const handleBack = useBackHandler();
	const handleClose = useCloseHandler();
	useDocumentEvent(setSkinVariants);

	const renderPanel = () => {
		switch (currentPanel) {
			case 'login':
				return (
					<Login 
						navigateToAccount={() => setCurrentPanel('account')} 
					/>
				);
			case 'account':
				return (
					<Account 
						navigateToLogin={() => setCurrentPanel('login')} 
					/>
				);
			case 'systemState':
				return (
					<SystemState 
						navigateToHome={() => setCurrentPanel('home')} 
					/>
				);
			case 'home':
				return (
					<Home 
						user_id={user_id} 
						navigateToLogin={() => setCurrentPanel('login')} 
						navigateToSystemState={() => setCurrentPanel('systemState')} 
						navigateToHLSVideo={(video) => {
							setSelectedVideo(video); // Store the selected video details
							setCurrentVideoSrc(video?.url || ''); // Update video source
							setCurrentPanel('hlsVideo'); // Navigate to HLSVideo
						}} 
						navigateToVideo={() => setCurrentPanel('video')} 
					/>
				);
			case 'hlsVideo':
				return (
					<HLSVideo 
						src={currentVideoSrc || 'default-video-url.m3u8'} 
						userId={user_id || 'guest'} 
						curVideo={selectedVideo} 
						handleAlertClose={() => setCurrentPanel('home')} 
					/>
				);
			case 'video':
				return (
					<Video 
						navigateToHome={() => setCurrentPanel('home')} 
					/>
				);
			default:
				return (
					<Login 
						navigateToAccount={() => setCurrentPanel('account')} 
					/>
				);
		}
	};

	return (
		<Panels
			{...props}
			skinVariants={skinVariants}
			onBack={handleBack}
			onClose={handleClose}
		>
			{renderPanel()}
		</Panels>
	);
};

export default ThemeDecorator(App);
