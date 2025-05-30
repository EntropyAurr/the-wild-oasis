import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  gap: 0.6rem;
  padding: 0.7rem 1rem;
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.6rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value; // read the current state with the "get" method for retrieving whenever we reload the UI => for the user to know what they're selecting

  function handleClick(value) {
    searchParams.set(filterField, value); // store the state to the URL when triggering the event handler

    // pagination issue: reset the page everytime we change the status, otherwise it will cause the error: 416 ( range not satisfiable)
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton onClick={() => handleClick(option.value)} key={option.value} $active={option.value === currentFilter ? option.value : undefined} disabled={option.value === currentFilter}>
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
