import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const StyledDiv = styled.div`
  max-width: 80%;
  margin: 0 auto;
  margin-bottom: 30px;
`

export const StyledHeader = styled.header`
  background-color: #1c2024;
  color: #fff;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  text-transform: uppercase;
  padding: 10px 10vw;
  box-shadow: 2px 2px 23px -4px rgba(0, 0, 0, 0.75);
  max-width: 100%;
`

export const StyledNavLink = styled(NavLink)`
  color: #fff9f9;
  padding: 8px 10px;
  margin: 0 5px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color ease-in 0.1s;

  &:hover {
    background-color: rgba(4, 4, 4, 0.1);
  }

  &.active {
    background-color: #fff;
    color: #1c2024;
  }
`

export const StyledButton = styled.button`
  background-color: #1c2024;
  color: #fff9f9;
  border: none;
  font-size: 18px;
  padding: 8px 10px;
  border-radius: 5px;
  text-transform: capitalize;
  margin: 10px 0;
  cursor: pointer;

  &:active {
    transform: scale(0.9);
  }
`

export const StyledNavButton = styled(StyledButton)`
  color: #1c2024;
  background-color: #fff9f9;
  margin: 0 10px;
  text-transform: uppercase;
`

export const StyledHeading = styled.h2`
  margin: 20px 0 0;
  font-size: 44px;
  color: #1c2024;
`

export const ButtonWrapper = styled.div`
  display: flex;
`

export const StyledFormHeading = styled.h2`
  font-size: 36px;
  color: #1c2024;
  text-transform: capitalize;
`

export const StyledSpan = styled.span`
  font-size: 16px;
  color: #1c2024;
  margin-right: 20px;
`

export const StyledInput = styled.input`
  font-size: 18px;
  margin-top: 5px;
  margin-right: 5px;
  border-radius: 5px;
  border: 1px solid #1b1b1f;
  padding: 5px 10px;
  transition: linear all 0.1s;

  &:focus {
    outline: none;
    border-color: #1c2024;
    box-shadow: #1c20244f 0px 0px 0px 0.2rem;
  }
`

export const StyledTable = styled.table`
  font-size: 20px;
  width: 100%;
  border-radius: 5px;
  margin-top: 20px;
  table-layout: fixed;
  // border-collapse: collapse;

  & tr {
    display: block;
    padding: 10px;
  }

  & td {
    width: 100%;
  }

  & a {
    text-decoration: none;
    color: #1c2024;
  }

  & a:hover {
    text-decoration: underline;
  }

  & tr:nth-child(odd) {
    background-color: #1c20240f;
  }

  & tr:last-child {
    border-radius: 0 0 5px 5px;
  }

  & tr:first-child {
    display: flex;
    width: 100%;
    font-size: 22px;
    background-color: #1c2024;
    color: #fff9f9;
    text-align: center;
    border-radius: 5px 5px 0 0;
  }
`

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

export const StyledList = styled.ul`
  & a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  & a:hover {
    text-decoration: underline;
  }
`

export const StyledButtonSmall = styled(StyledButton)`
  font-size: 14px;
  padding: 6px 8px;
  margin: 0;
`

export const LoginPage = styled.div`
min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & button {
    width: 100%;
  }
`