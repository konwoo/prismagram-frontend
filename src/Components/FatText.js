import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Text = styled.text`
    font-weight: 600;
    user-select: none;
`;

const FatText = ({ text, className }) => (
    <Text className={className}>{text}</Text>
    );

FatText.propTypes = {
    text: PropTypes.string.isRequired
}

export default FatText;
