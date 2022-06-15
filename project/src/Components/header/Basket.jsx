import React from 'react'
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

  .modal {
    heigth: 100%;
  }
`

class Basket extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
    this.handleCloseCartOverlay = this.handleCloseCartOverlay.bind(this)
  }

  showModal = (e) => {
    this.setState({ show: !this.state.show })
  }

  handleCloseCartOverlay(item) {
    this.setState({ show: item })
  }

  render() {
    return (
      <>
        {' '}
        <StyledBasket>
          <img src={basket} onClick={() => this.showModal()} alt="basket" />
          {this.props.addItemToBasket.length > 0 && (
            <div className="item_count">
              <p>{this.props.addItemToBasket.length}</p>
            </div>
          )}
        </StyledBasket>
        {this.state.show && (
          <CartOverlay
            show={this.showModal}
            handleCloseCartOverlay={this.handleCloseCartOverlay}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  addItemToBasket: state.getDataReducer.addItemToBasket,
})

export default connect(mapStateToProps)(Basket)
