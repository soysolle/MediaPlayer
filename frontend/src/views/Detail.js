import React, {useRef, useEffect, useState} from 'react';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
// import styles from './Video.module.css';

const Detail = props => {
	const [isPaused, setIsPaused] = useState(false);
	const [currentTimestamp, setCurrentTimestamp] = useState(0);
	const [showButton, setShowButton] = useState(true);
	const [lastViewedStopPoint, setLastViewedStopPoint] = useState(0);

	const videoPlayerRef = useRef(null);
	const [videoSrc, setVideoSrc] = useState(props.src);

	const onPause = event => {
		setIsPaused(true);
		setCurrentTimestamp(Math.floor(event.currentTime));
	};

	const onPlay = event => {
		setIsPaused(false);
	};

	const moveToTime = time => {
		const newSrc = `${props.src}#t=${time}`;
		setVideoSrc(newSrc);
		setShowButton(false);
	};

	useEffect(() => {
		const fetchLastViewHistory = async () => {
			try {
				// const response = await fetch(
				// 	`${process.env.REACT_APP_BACKEND_URI}/histories/${props.user_id}?video_id=${props.video_id}`
				// );
				// const data = await response.json();

				// if (data && data.length > 0) {
				// 	setLastViewedStopPoint(data[0].stop_point);
				// }
				console.log(props.src, props.name);
				setLastViewedStopPoint(0); // 나중에 지우기
			} catch (error) {
				console.error('Error fetching last view history:', error);
			}
		};

		fetchLastViewHistory();
	}, [props.video_id]);

	const handleLoadedData = () => {
		const timer = setTimeout(() => {
			setShowButton(false);
		}, 5000);

		return () => clearTimeout(timer);
	};

	const handleTimeUpdate = event => {
		const currentTime = Math.floor(event.target.currentTime);
		setCurrentTimestamp(currentTime);

		(async () => {
			try {
				const postData = {
					video_id: props.video_id,
					playback_pos: currentTime
				};

				await fetch(`${process.env.REACT_APP_BACKEND_URI}/histories`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(postData)
				});
			} catch (error) {
				console.error('Error posting to videoHistories:', error);
			}
		})();
	};

	return (
		<div className="">
			<VideoPlayer
				ref={videoPlayerRef}
				onLoadedData={handleLoadedData}
				onTimeUpdate={handleTimeUpdate}
				autoCloseTimeout={7000}
				backButtonAriaLabel="go to previous"
				feedbackHideDelay={3000}
				initialJumpDelay={400}
				jumpDelay={200}
				loop
				miniFeedbackHideDelay={2000}
				muted={false}
				title={props.name}
				titleHideDelay={4000}
				onBack={props.onBack}
				onPause={onPause}
				onPlay={onPlay}
				className="z-0"
			>
				<source src={videoSrc} type="video/mp4" />
				<infoComponents>
					A video about some things happening to and around some characters.
					Very exciting stuff.
				</infoComponents>
			</VideoPlayer>
			{showButton && lastViewedStopPoint > 0 && (
				<button
					onClick={() => moveToTime(lastViewedStopPoint)}
					className="spottable fixed bottom-36 right-12 overflow-hidden bg-primary text-white font-bold py-2 px-4 rounded flex justify-center items-center 
				transition duration-300 ease-in-out	focus:bg-primary focus:shadow-xl focus:text-black  focus:scale-110
				hover:bg-primary hover:shadow-xl hover:text-black  hover:scale-110"
					style={{
						zIndex: 1000
					}}
					onAnimationEnd={() => setShowButton(false)}
				>
					<span className="block z-10">이어서 보기</span>
					<span
						className="absolute top-0 left-0 h-full bg-bold"
						style={{animation: 'fill 5s linear', zIndex: -1}}
					></span>
				</button>
			)}
		</div>
	);
};

export default Detail;
