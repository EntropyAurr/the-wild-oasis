import { useState } from "react";

import { signInWithGithub } from "../../services/apiAuthGithub";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { IoLogoGithub } from "react-icons/io";
import styled from "styled-components";

const Github = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

const Span = styled.span`
  font-size: 2.2rem;
`;

function GithubLoginForm() {
  const [isPending, setIsPending] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setIsPending(true);

    signInWithGithub();
  }

  return (
    <Form onSubmit={handleSubmit} type="regular">
      <FormRowVertical>
        <Button $variation="primary" size="large">
          {!isPending ? (
            <Github>
              Login with Github{" "}
              <Span>
                <IoLogoGithub />
              </Span>
            </Github>
          ) : (
            <SpinnerMini />
          )}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default GithubLoginForm;
