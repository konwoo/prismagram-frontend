import React from "react";
import styled, {keyframes} from "styled-components";

const spinTrans = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`


const Spinner = styled.img`
    height: 32px;
    animation: ${spinTrans} 1.2s steps(12) infinite;
`;

const Container = styled.div `
    
`;


export default () => (
    <Container>
        <Spinner 
            src={require("../images/loading.png")}
            alt="loading"
        />
    </Container>
)