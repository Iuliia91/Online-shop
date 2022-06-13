import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import basket from '../../assest/images/Empty Cart.png'
import CartOverlay from '../../Scenes/cartPage/CartOverlay/CatOverlay'

const StyledBasket = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  left: -4%;
  right: 0%;
  top: 1.98%;
  bottom: 2.16%;
  img {
    position: absolute;
    left: -4%;
    right: 0%;
    top: 2.98%;
    bottom: 2.16%;
  }
  .item_count {
    position: relative;
    top: -7px;
    right: -13px;
    background-color: black;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;

    p {
      text-align: center;
      position: absolute;
      color: white;
      top: -15px;
      left: 7px;
    }
  }
`

class Basket extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }

  showModal = (e) => {
    this.setState({ show: !this.state.show })
  }

  render() {
    return (
      <>
        {' '}
        <StyledBasket>
          <img src={basket} onClick={() => this.showModal()} />
          {this.props.addItemToBasket.length > 0 && (
            <div className="item_count">
              <p>{this.props.addItemToBasket.length}</p>
            </div>
          )}
        </StyledBasket>
        {this.state.show && <CartOverlay show={this.showModal} />}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  addItemToBasket: state.getDataReducer.addItemToBasket,
})

export default connect(mapStateToProps)(Basket)
