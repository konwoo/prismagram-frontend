import React from "react";
import { gql } from "apollo-boost";
import Post from "../Components/Post";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";

const SEE_FULL_POST = gql`
    query seeFullPost($id: String!) {
        seeFullPost(id: $id) {
            id
            location
            caption
            user {
                id
                avatar
                username
            }
            files {
                id
                url
            }
            likeCount
            isLiked
            comments {
                id
                text
                user {
                    id
                    username
                }
            }
            createdAt
        }
    }
`

export default ({ match: { params: { id } } }) => {
    const {data, loading} = useQuery(SEE_FULL_POST, { variables: { id: id } });
    

    if(loading === true) {
        return (
            <Loader />
        )
    }
    else if (!loading && data && data.seeFullPost) {
        const {
            user,
            files,
            comments,
            isLiked,
            likeCount,
            createdAt,
            caption,
            location,
        } = data.seeFullPost;
           return <Post 
                id={id} 
                user={user}
                files={files}
                comments={comments}
                isLiked={isLiked}
                likeCount={likeCount}
                createdAt={createdAt}
                caption={caption}
                location={location}
            />;
    }
    return null;
}