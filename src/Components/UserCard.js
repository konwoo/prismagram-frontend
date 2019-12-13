import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Button from "./Button";

const Card = styled.div`

`;

const UserCard = ({ username, isFollowing, url, itSelf }) => (
    <Card>
        <Avatar url={url} />
        <FatText text={username} />
        {!itSelf && <Button text={isFollowing ? "Unfollow" : "Follow"} /> }
    </Card>
);

UserCard.propTypes = {
    username: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    itSelf: PropTypes.bool.isRequired
}

export default UserCard;