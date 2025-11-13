import React, {useState} from 'react';
import MediaOverlay from '@enact/sandstone/MediaOverlay';
// import css from './Media.module.css';

const Media = ({onClick, idx, src, thumbSrc, name}) => {
	const [isHovering, setIsHovering] = useState(false);

	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			onClick(e); // Call the onClick handler when Enter is pressed
		}
	};

	const customTextLayout = {
		caption: {
			color: 'white',
			fontSize: '20px',
			fontWeight: 'bold'
		}
	};

	return (
		<MediaOverlay
			caption={name}
			css={customTextLayout}
			imageOverlay={isHovering ? null : thumbSrc}
			marqueeOn="focus"
			source={isHovering ? src : undefined} // Add the source prop
			muted={true}
			// noAutoPlay={!isHovering}
			className="p-0 rounded-lg shadow-xl  w-48 h-32 object-cover transition duration-500 ease-in-out"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onFocus={() => setIsHovering(true)}
			onBlur={() => setIsHovering(false)}
			onKeyDown={handleKeyPress} // Handle key press event
			onClick={onClick}
			id={idx}
			tabIndex={0} // Make the div focusable
		/>
	);
};

export default Media;
