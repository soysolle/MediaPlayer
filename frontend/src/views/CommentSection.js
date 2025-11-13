import React, { useState } from 'react';
import styles from './CommentSection.module.less';

const CommentSection = ({ addCommentWithTime, currentTime }) => {
    const [newComment, setNewComment] = useState(''); // Stores the text of the new comment

    // Handle comment input change
    const handleInputChange = (e) => {
        setNewComment(e.target.value);
    };

    // Add a new comment
    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            addCommentWithTime(currentTime, newComment); // Pass the current video time and comment
            setNewComment(''); // Clear the input field
        }
    };

    return (
        <div className={styles.commentContainer}>
            <h2>Comments</h2>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Type your comment here..."
                    value={newComment}
                    onChange={handleInputChange}
                    className={styles.commentInput}
                />
                <button onClick={handleAddComment} className={styles.postButton}>
                    Post
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
