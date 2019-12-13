import React from "react";
import styled from "styled-components";
import TextAreaAuthosize from "react-textarea-autosize";
import FatText from "../FatText";
import Avatar from "../Avatar";
import Indigator from "../Loading";
import { Comment as CommentIcon, HeartEmpty, HeartFull } from "../Icons";


const Post = styled.div`
    ${props => props.theme.whiteBox};
    width: 100%;
    max-width: 600px;
    margin-bottom: 25px;
`;

const Header = styled.header`
    padding: 15px;
    display:flex;
    align-items: center;
`;

const UserColumn = styled.div`
    margin-left: 10px;
`;

const Location = styled.span`
    display: block;
    margin-top: 5px;
    font-size: 12px;
`;

const Files = styled.div`
    position: relative;
    padding-bottom: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
`;

const File = styled.div`
    max-width: 100%;
    width: 100%;
    height: 600px;
    position: absolute;
    top: 0;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    opacity: ${props => (props.showing ? 1 : 0)};
    transition: opacity 0.5 linear;
`;

const Meta = styled.div`
    padding: 15px;
`;

const MetaCaption = styled.div`
    padding-top: 10px;
`;

const Button = styled.button`
    cursor: pointer;
    border: 0;
`;

const Buttons = styled.div`
    ${Button} {
        &:first-child {
            margin-right: 10px;
        }
    }
    margin-bottom: 10px;
`;

const Timestamp = styled.span`
    font-weight: 400;
    text-transform: uppercase;
    opacity: 0.5;
    display: block;
    font-size: 12px;
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const TextArea = styled(TextAreaAuthosize)`
    border: none;
    width: 100%;
    resize: none;
    font-size: 13px;
    &:focus {
        outline: none;
    }
`;

const Comments = styled.ul`
    margin-top: 10px;
`;

const Comment = styled.li`
    margin-bottom: 7px;
    span {
        margin-right: 5px;
        padding-left: 5px;
    }
`;

export default ({
    user: {avatar, username},
    location,
    caption,
    files,
    isLiked,
    likeCount,
    createdAt,
    newComment,
    currentItem,
    toggleLike,
    onKeyPress,
    comments,
    selfComments,
    loadingComments
}) => (
    <Post>
        <Header>
            <Avatar size="sm" url={avatar} />
            <UserColumn>
                <FatText text={username}/>
                <Location>{location}</Location>
            </UserColumn>
        </Header>
        <Files>
            { files && 
                files.map((file, index) =>
                 <File key={file.id} id={file.id} src={file.url} showing={index === currentItem}></File>
                 )}
        </Files>
        <Meta>  
            <Buttons>
            <Button onClick={toggleLike}> {isLiked ? <HeartFull /> : <HeartEmpty/> } </Button>
            <Button> <CommentIcon /> </Button>
            </Buttons>
            <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
                <MetaCaption>
                    <text> {caption} </text>
                </MetaCaption>
            
            {comments && (
                <Comments>
                    {
                        comments.map(comment => (
                            <Comment key={comment.id}>
                                <FatText text={comment.user.username} />
                                <span>{comment.text}</span>
                            </Comment>
                        ))
                    }
                    {
                        selfComments.map(comment => (
                            <Comment key={comment.id}>
                                <FatText text={comment.user.username} />
                                <span>{comment.text}</span>
                            </Comment>
                        ))
                    }
                </Comments>
            )}
            {
                loadingComments ? <Indigator /> : <div></div>
            }
            <Timestamp>{createdAt}</Timestamp>
            <TextArea placeholder="Add a Comment..." value={newComment.value} onChange={newComment.onChange} onKeyPress={onKeyPress}/>
        </Meta>
    </Post>
);