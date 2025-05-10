import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-family: "Inter";
      font-weight: 600;
    `}

  line-height: 1.5;

  ${(props) =>
    props.as === "h2" &&
    css`
      color: darkgreen;
      font-family: "Doppio One";
      font-size: 2rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      color: darkorange;
      font-family: "Baloo Bhai 2";
      font-size: 2rem;
      font-weight: 500;
    `}
`;

export default Heading;
