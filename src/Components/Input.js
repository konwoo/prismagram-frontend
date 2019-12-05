import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.input`
    border: 0;
    border: ${props => props.theme.boxBorder};
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.bgColor};
    height: 35px;
    font-size: 12px;
    padding: 0px 1px;
`;

const Input = ({ placeholder }) => <Container placeholder={placeholder}></Container>;

Input.prototype = {
    placeholder: PropTypes.string.isRequired
};

export default Input;