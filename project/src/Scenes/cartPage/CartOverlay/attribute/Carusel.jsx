import React from 'react'

import styled from 'styled-components'
import forward from '../../../../assest/images/forward.png'
import back from '../../../../assest/images/back.png'
const StyledCarusel = styled.div`
  width: 200px;
  height: 288px;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 40px;
  div {
    display: flex;

    .img {
      width: 200px;
      height: 100%;
    }
  }

  .carusel_button {
    position: absolute;
    bottom: 16px;
    right: 16px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
  }
`
class Carusel extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.value, index: 0, currentLimit: 1 }
    this.handleCaruselActionForward = this.handleCaruselActionForward.bind(this)
    this.handleCaruselActionBack = this.handleCaruselActionBack.bind(this)
  }

  handleCaruselActionForward() {
    if (this.state.index == this.state.value.length - 1) {
      this.setState({ index: this.state.value.length - 1 })
    } else if (this.state.index < this.state.value.length - 1) {
      this.setState({ index: ++this.state.index })
    }
  }
  handleCaruselActionBack() {
    if (this.state.index == 0) {
      this.setState({ index: 0 })
    } else if (this.state.index <= this.state.value.length - 1) {
      this.setState({ index: --this.state.index })
    }
  }
  render() {
    return (
      <StyledCarusel>
        {this.props.value.map((img, index) => {
          if (this.state.value.length == 1) {
            return (
              <div key={index}>
                <img src={img} className="img" />
              </div>
            )
          }
          return (
            <div>
              {this.state.index == index && (
                <div>
                  <img src={img} className="img" />
                  <div className="carusel_button">
                    <img
                      src={back}
                      onClick={() => this.handleCaruselActionBack()}
                    />

                    <img
                      src={forward}
                      onClick={() => this.handleCaruselActionForward()}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </StyledCarusel>
    )
  }
}

export default Carusel
