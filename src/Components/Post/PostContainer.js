import React, { useState, useEffect } from "react";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import PropTypes from "prop-types";

const PostContainer = ({ 
    id, 
    user, 
    files,
    comments,
    isLiked,
    likeCount,
    createdAt,
    caption,
    location
}) => {
    const [isLikedS, SetIsLiked] = useState(isLiked);
    const [likeSountS, SetLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const comment = useInput("");
    
    const slide = () => {
        const totalFiles = files.length;
        if(currentItem === totalFiles - 1) {
            setCurrentItem(0);
        }
        else {
            setCurrentItem(currentItem + 1);
        }
    };

    useEffect(() => {
        setInterval(slide, 2000);
    }, [currentItem]);

    return <PostPresenter 
        user={user}
        files={files}
        comments={comments}
        isLiked={isLikedS}
        likeCount={likeSountS}
        createdAt={createdAt}
        SetIsLiked={SetIsLiked}
        SetLikeCount={SetLikeCount}
        newComment={comment}
        caption={caption}
        location={location}
        currentItem={currentItem}
    />
}

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired
        })
    })),
    isLiked: PropTypes.bool,
    likeCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string
};

export default PostContainer;