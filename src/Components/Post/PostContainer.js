import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation, useQuery } from "react-apollo-hooks";
import { toast } from "react-toastify";
import moment from "moment";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { ME } from "../../SharedQueries";

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
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [selfComments, setSelfComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const { data: meQuery } = useQuery(ME);

    const comment = useInput("");

    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: {
            postId: id
        }
    });

    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables: {
            postId: id, text: comment.value
        }
    });
    
    const slide = () => {
        const totalFiles = files.length;
        if(currentItem === totalFiles - 1) {
            setTimeout(() => setCurrentItem(0), 3000);
        }
        else {
            setTimeout(() => setCurrentItem(currentItem + 1), 3000);
        }
    };

    useEffect(() => {
        slide();
    }, [currentItem]);

    const toggleLike = async () => {
        toggleLikeMutation();
        if(isLikedS === true) {
            setIsLiked(false);
            setLikeCount(likeCountS - 1);
        }
        else {
            setIsLiked(true);
            setLikeCount(likeCountS + 1);
        }
    }

    const onKeyPress = async e => {
        const { which } = e;
        if(which === 13) {
            e.preventDefault();
            setLoadingComments(true);
            try {
                const { data: { addComment } } = await addCommentMutation();
                // const { data } = await addCommentMutation();
                setSelfComments([
                    ...selfComments, 
                    {id: Math.floor(Math.random * comment.length), text: comment.value, user: {username: meQuery.me.username} }
                    // addComment
                ]);
                comment.setValue("");
                setLoadingComments(false);
            } catch (error) {
                toast.error("Can't send comment..");
            }
        }
        return ;
    }

    return <PostPresenter 
        user={user}
        files={files}
        comments={comments}
        isLiked={isLikedS}
        likeCount={likeCountS}
        createdAt={moment(createdAt).fromNow()}
        setIsLiked={setIsLiked}
        setLikeCount={setLikeCount}
        newComment={comment}
        caption={caption}
        location={location}
        currentItem={currentItem}
        toggleLike={toggleLike}
        onKeyPress={onKeyPress}
        selfComments={selfComments}
        loadingComments={loadingComments}
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