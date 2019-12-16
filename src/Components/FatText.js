import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.h1`
    font-weight: 600;
    user-select: none;
`;

const FatText = ({ text, className }) => (
    <Container className={className}>{text}</Container>
    );

FatText.propTypes = {
    text: PropTypes.string.isRequired
}

export default FatText;
