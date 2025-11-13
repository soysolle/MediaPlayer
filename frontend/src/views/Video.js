import { useState, useEffect } from 'react';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import { MediaControls } from '@enact/sandstone/MediaPlayer';
import Button from '@enact/sandstone/Button';
import CommentSection from './CommentSection.js';

const Video = (prop) => {
    const [comments, setComments] = useState([]); // Stores comments with timestamps
    const [currentTime, setCurrentTime] = useState(0); // Tracks current video time
    const [visibleComment, setVisibleComment] = useState(''); // Comment to display on the video

    // Add a comment with the current timestamp
    const addCommentWithTime = (time, text) => {
        const newComment = { time: parseFloat(time.toFixed(1)), text }; // Save time to 1 decimal place
        setComments((prevComments) => [...prevComments, newComment]);
    };

    // Show comments at the appropriate time
    useEffect(() => {
        const matchingComment = comments.find(
            (comment) => Math.abs(comment.time - currentTime) < 1 // Show if within 1 second
        );
        if (matchingComment) {
            setVisibleComment(matchingComment.text); // Set the comment to display
        } else {
            setVisibleComment(''); // Clear the display
        }
    }, [currentTime, comments]);

    const handleTimeUpdate = (event) => setCurrentTime(event.target.currentTime);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                minHeight: '100vh',
                overflowY: 'auto',
                padding: '20px',
                boxSizing: 'border-box',
                backgroundColor: '#000',
            }}
        >
            {/* Video Player */}
            <div
                style={{
                    height: '70vh',
                    width: '70vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    marginBottom: '20px',
                }}
            >
                {visibleComment && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        {visibleComment}
                    </div>
                )}

                <VideoPlayer
                    autoCloseTimeout={7000}
                    backButtonAriaLabel="go to previous"
                    feedbackHideDelay={3000}
                    initialJumpDelay={400}
                    jumpDelay={200}
                    loop
                    miniFeedbackHideDelay={2000}
                    muted
                    title="Sandstone VideoPlayer Sample Video"
                    titleHideDelay={4000}
                    onTimeUpdate={handleTimeUpdate}
                >
                    <source src={prop.src} type="video/mp4" />
                    <infoComponents>
                        A video about some things happening to and around some characters.
                        Very exciting stuff.
                    </infoComponents>
                    <MediaControls
                        jumpBackwardIcon="jumpbackward"
                        jumpForwardIcon="jumpforward"
                        pauseIcon="pause"
                        playIcon="play"
                    >
                        <Button icon="list" size="small" />
                        <Button icon="playspeed" size="small" />
                        <Button icon="speakercenter" size="small" />
                        <Button icon="miniplayer" size="small" />
                        <Button icon="subtitle" size="small" />
                    </MediaControls>
                </VideoPlayer>
            </div>

            {/* Scroll to Comments Button */}
            <button
                onClick={() =>
                    document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })
                }
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#d3d3d3',
                    color: '#000',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '20px',
                }}
            >
                Scroll to Comments
            </button>

            {/* Comment Section */}
            <div
                id="comments-section"
                style={{
                    width: '90%',
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '15px',
                    borderRadius: '10px',
                }}
            >
                <CommentSection addCommentWithTime={addCommentWithTime} currentTime={currentTime} />
            </div>
        </div>
    );
};

export default Video;
