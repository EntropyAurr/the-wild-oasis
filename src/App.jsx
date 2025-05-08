import styled from "styled-components";
import GlobalStyles from "./ui/GlobalStyles";
import Heading from "./ui/Heading";
import Row from "./ui/Row";
import Input from "./ui/Input";

const StyledApp = styled.main`
  margin: 2rem;
  padding: 1.5rem 2.5rem;
  border: 2px solid darkgreen;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 1rem 2.5rem;
  margin-left: 2rem;
  font-size: 1.8rem;
  background-color: #2a9d8f;
  color: #fff;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="horizontal">
          <Heading as="h1">The Wild Oasis</Heading>
          <div>
            <Heading as="h2">Aurora</Heading>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, dolorum.</p>
            <Button>Check in</Button>
            <Button>Check out</Button>
          </div>
        </Row>

        <Row type="vertical">
          <form>
            <Heading as="h3">Form</Heading>
            <Input type="text" placeholder="Enter your name..." />
            <Button>Submit</Button>
          </form>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
