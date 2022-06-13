import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'

import Navigation from './Navigetion'
import MainCurrency from '../currency/MainCurrency'
const StyledHeader = styled.div`
  width: 1400px;
  display: flex;
  height: 80px;
  flex-direction: row;

  position: relative;
  top: 0;
  left: 0;
  align-items: center;

  .list-item {
    display: flex;
    left: 101px;
    //flex-direction: row;
    justify-content: space-evenly;
  }
`

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <StyledHeader>
        <Navigation />
        <Logo />
        <div>
          <MainCurrency />
        </div>
      </StyledHeader>
    )
  }
}

export default Header
