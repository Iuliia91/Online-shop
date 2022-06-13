import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import group from '../../assest/images/logo/Group.png'
const StyledLogo = styled.div`
  width: 41px;
  height: 41px;
  position: absolute;
  width: 41px;
  left: calc(50% - 41px / 2 + 4.5px);
  top: 0%;
  bottom: 0%;
  margin: auto;

  .brenIcon {
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
  }
  .list {
    position: absolute;
    left: 12%;
    right: 12%;
    top: 13.2%;
    bottom: 13.2%;
  }
`

class Logo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <StyledLogo>
        <div className="brenIcon"></div>
        <div className="list">
          <img src={group} />
        </div>
      </StyledLogo>
    )
  }
}

export default Logo
