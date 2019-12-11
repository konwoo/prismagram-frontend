import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Text = styled.text`
    font-weight: 600;
`;

const FatText = ({text}) => <Text>{text}</Text>

FatText.propTypes = {
    text: PropTypes.string.isRequired
}

export default FatText;
