import { useRef, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@enact/sandstone/Button';
import Dropdown from '@enact/sandstone/Dropdown';
import Hls from 'hls.js';
import axios from 'axios';
import SysProcPop from './SysProProgressBar';
import { PLAYBACK_ADDR, PLAYBACK_FIND_ADDR } from '../constants/ip';

const HLSVideo = ({ src = 'default-video-url.m3u8', userId = 'guest', curVideo = null, handleAlertClose = () => {} }) => {
	const videoRef = useRef(null);
	const hlsRef = useRef(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [curBandwidth, setCurBandwidth] = useState(0);
	const playBackTime = useRef(0);

	// Set playback position on load
	useEffect(() => {
		if (isLoaded) {
			videoRef.current.currentTime = playBackTime.current;
		}
	}, [isLoaded]);

	const handleBack = () => {
		setIsLoaded(false);
		axios
			.post(PLAYBACK_ADDR, {
				userId: userId,
				mediaItemId: curVideo?.videoId,
				position: parseInt(videoRef.current?.currentTime, 10),
			})
			.then(() => {
				setIsLoaded(false);
				handleAlertClose();
			})
			.catch((err) => console.error(err));
	};

	// Initialize HLS.js and attach it to video
	useEffect(() => {
		if (!src) {
			console.error('Error: src prop is undefined. Provide a valid video source URL.');
			return;
		}

		if (!userId) {
			console.error('Error: userId prop is undefined. Provide a valid userId.');
			return;
		}

		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(videoRef.current);

			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				videoRef.current.play();
			});

			hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
				const level = hls.levels[hls.currentLevel];
				if (level) {
					setCurBandwidth(level.attrs.BANDWIDTH || hls.bandwidthEstimate);
				}
			});

			hlsRef.current = hls;

			return () => {
				hls.destroy();
			};
		}
	}, [src]);

	const handleDropdownSelect = useCallback((e) => {
		if (hlsRef.current) {
			if (e.selected === 0) {
				hlsRef.current.currentLevel = 0; // Lowest resolution
			} else if (e.selected === 1) {
				hlsRef.current.currentLevel = hlsRef.current.levels.length - 1; // Highest resolution
			} else {
				hlsRef.current.currentLevel = -1; // Auto resolution
			}
		}
	}, []);

	return (
		<div
			style={{
				position: 'fixed',
				top: '0',
				left: '0',
				width: '100%',
				height: '100%',
				backgroundColor: 'black',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div>
				<SysProcPop />
				<Dropdown
					placeholder="Resolution"
					onSelect={handleDropdownSelect}
				>
					{['Lowest', 'Highest', 'Auto']}
				</Dropdown>
				<Button onClick={handleBack}>Back</Button>
				<Button disabled>
					{hlsRef.current ? `Level: ${hlsRef.current.currentLevel}` : 'Loading'}
				</Button>
				<Button disabled style={{ fontSize: '20px' }}>
					{`Bandwidth: ${curBandwidth} bps`}
				</Button>
			</div>

			<video
				ref={videoRef}
				height={720}
				controls
				onLoadedData={() => {
					axios
						.post(PLAYBACK_FIND_ADDR, {
							userId: userId,
							mediaItemId: curVideo?.videoId,
						})
						.then((res) => {
							playBackTime.current = parseInt(res.data.position, 10);
							setIsLoaded(true);
						})
						.catch((err) => console.error(err));
				}}
			/>
		</div>
	);
};

HLSVideo.propTypes = {
	src: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	curVideo: PropTypes.object,
	handleAlertClose: PropTypes.func,
};

HLSVideo.defaultProps = {
	src: 'default-video-url.m3u8',
	userId: 'guest',
	curVideo: null,
	handleAlertClose: () => {}
};

export default HLSVideo;
