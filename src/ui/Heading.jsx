import styled, { css } from "styled-components";

const Heading = styled.h1`
  line-height: 1.5;
  text-align: center;
  font-family: "Inter";
  font-weight: 600;

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 5rem;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 4rem;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 3rem;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 2.5rem;
    `};
`;

export default Heading;
