import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../Components/header/Header'
const StyledSecondMainLayouts = styled.div``

class SecondMainLayouts extends React.Component {
  render() {
    return (
      <StyledSecondMainLayouts>
        <header></header>
        <main></main>
      </StyledSecondMainLayouts>
    )
  }
}

export default SecondMainLayouts
