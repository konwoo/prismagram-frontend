import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom"
import { useQuery, useMutation } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";

const GET_USER = gql`
    query seeUser($username: String!) {
        seeUser(username: $username) {
            id
            avatar
            username
            fullName
            isFollowing
            itSelf
            bio
            followingCount
            followerCount
            postsCount
            posts {
                id
                files {
                url
                }
                likeCount
                commentCount
            }
        }
    }
`;

 const LOG_OUT = gql`
    mutation logUserOut {
        logUserOut @client
    }
`;

export default withRouter(({ match: { params: { username } }, history}) => {
    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    const [logOut] = useMutation(LOG_OUT);
    const onClick = id => {
        history.push(`/post/${id}`);
    }
    return <ProfilePresenter loading={loading} data={data} logOut={logOut} onClick={onClick} />;
});