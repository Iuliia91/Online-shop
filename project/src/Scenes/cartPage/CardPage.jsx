import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import AttributeCartOverlay from '../cartPage/CartOverlay/attribute/AttributeCartOverlay'
import { deleteItemFromBasket } from '../../store/action/deleteItemFromBasket'
import { addItemInBasket } from '../../store/action/addItemInBasket'
import Carusel from './CartOverlay/attribute/Carusel'
import Footer from './CartOverlay/components/Footer'
const StyledCardPage = styled.div`
  max-width: 1440px;
  margin: auto;
  display:flex;
flex-direction:column;
  main {
    width: 1275px;
    margin-top:173px;
    margin-left:85px;
   /*position: absolute;
    top: 250px;
    left: 87px;*/
  }
  header {
    position: relative;
    left: 87px;
    top:78px;
    p{
      font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 40px;
color: #1D1F22;
margin:0;
    }

  }
  section {
    border-top: 1px solid #e5e5e5;
    width: 100%;
    display: flex;
    position:relative;
    align-items: center;
    min-height:300px;
margin-bottom:40px;
    
   

    
  }
  .block_img {
    position:absolute;
    right:0;
  //top:40px;
    display: flex;
   // align-items: flex-end;
    align-items: center;
     width: 200px;
    height: 100%;
  }

  .titel{
    font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 30px;
line-height: 27px;
display:flex;
flex-direction:column;
margin:25px 0 20px 0;
gap:16px;
p{
  margin:0;
}

p:last-child{
  font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 30px;
line-height: 27px;
}

 
}
.amount {
  
  font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 24px;
  }
  .Color {
    margin-top: 0px;
    p {
      font-family: 'Roboto Condensed';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 18px;
margin-bottom:5px;
text-transform:uppercase;
    }
    div {
      
      display: flex;
      flex-direction: row;
      //margin-top: 5px;
      margin: auto;
      gap:3px;
    }

    .color_border {
      width: 36px;
      height: 36px;
margin-top:0px;
      div {
        width: 32px;
        height: 32px;
        margin: auto;
      }
    }

    .active_color {
      width: 36px;
      height: 36px;
      border: 1px solid #5ece7b;
      div {
        width: 32px;
        height: 32px;
      }
    }
  }

  .action{
    position: absolute;
width: 45px;
height: 100%;
left: 967px;
top: 24px;
  }
  .countity {
    position: absolute;
    width: 8px;
    height: 26px;
    top: 43%;
    left: 35%;
    p {
      margin: 0;
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 160%;
      text-align: right;
    }
  }
  .add {
    display: flex;
    position: absolute;
    box-sizing: border-box;
    border: 1px solid #1d1f22;
    width: 45px;
    height: 45px;

    p {
      margin: auto;

      text-align: center;
    }
  }
  .remove {
    display: flex;
    position: absolute;
    box-sizing: border-box;
    border: 1px solid #1d1f22;
    width: 45px;
    height: 45px;
    bottom: 0;
    p {
      margin: auto;
      text-align: center;
    }
  }
}

  .size,
  .capacity, .usb, .touch {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 2px;
p{
  font-family: 'Roboto Condensed';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 18px;
margin-bottom:2px;
text-transform:uppercase;
}

    .size_item, .capacity_item , .usb_item, .touch_item{
      display: flex;
      div {
        border: 1px solid #1d1f22;
        margin-right: 8px;
        margin-top: 6px;
        width: 63px;
        height: 45px;
        box-sizing: border-box;
        display:flex;
        align-items: center;
    justify-content: center;
    p{
      text-align: center;
      margin:0;
     }
      }
     

    }
    .active {
      background: #1d1f22;
    }

    .active > p {
      color: white;
    }
  }
    

`

class CardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '', index: 1, value: '', onChoose: false }
  }
  deleteItemFromBasket(item, index) {
    console.log(index)
    this.props.dispatch(deleteItemFromBasket({ item: item, index: index }))
  }

  addItemInBasket(item) {
    this.props.dispatch(addItemInBasket(item))
  }
  handleChangeImg(e, product) {
    if (e.target) {
      this.setState({ onChoose: true })

      this.setState({ value: product })
      this.setState({ index: 3 })
    }
  }
  render() {
    return (
      <StyledCardPage>
        <header>
          <p>CART</p>
        </header>
        <main>
          {this.props.addItemToBasket.map((product, indexItem) => {
            return (
              <section>
                <div>
                  <div className="titel">
                    <p>{product.product.brand}</p>
                    <p>{product.product.name}</p>
                  </div>

                  <div className="amount">
                    {product.product.prices.map((currency) => {
                      if (currency.currency.symbol == this.props.currency) {
                        return (
                          <div>
                            {currency.currency.symbol}
                            {currency.amount}
                          </div>
                        )
                      }
                    })}
                  </div>
                  <div>
                    {product.product.attributes.map((attribut) => {
                      if (attribut.name == 'Size') {
                        return (
                          <div className="size">
                            <p>{attribut.id}:</p>
                            <div className="size_item">
                              {attribut.items.map((size) => {
                                return (
                                  <div
                                    className={
                                      size.id == product.attributs.size
                                        ? 'active'
                                        : ''
                                    }
                                  >
                                    <p>{size.displayValue}</p>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      } else if (attribut.name == 'Color') {
                        return (
                          <div className="Color">
                            <p>{attribut.id}:</p>

                            <div className="color_item">
                              {attribut.items.map((color) => {
                                return (
                                  <div
                                    className={
                                      color.id == product.attributs.color
                                        ? 'active_color'
                                        : 'color_border'
                                    }
                                  >
                                    <div>
                                      <div
                                        style={{ background: color.value }}
                                      />
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      } else if (attribut.name == 'Capacity') {
                        return (
                          <div className="capacity">
                            <p>{attribut.id}:</p>
                            <div className="capacity_item">
                              {attribut.items.map((capacity) => {
                                return (
                                  <div
                                    className={
                                      capacity.id == product.attributs.capacity
                                        ? 'active'
                                        : ''
                                    }
                                  >
                                    <p>{capacity.displayValue}</p>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      } else if (attribut.name == 'With USB 3 ports') {
                        return (
                          <div className="usb">
                            <p>{attribut.id}</p>
                            <div className="usb_item">
                              {attribut.items.map((usb) => {
                                return (
                                  <div
                                    className={
                                      usb.id == product.attributs.usb
                                        ? 'active'
                                        : ''
                                    }
                                  >
                                    <p>{usb.displayValue}</p>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      } else if (attribut.name == 'Touch ID in keyboard') {
                        return (
                          <div className="touch">
                            <p>{attribut.id}</p>
                            <div className="touch_item">
                              {attribut.items.map((touch) => {
                                return (
                                  <div
                                    className={
                                      touch.id == product.attributs.touch
                                        ? 'active'
                                        : ''
                                    }
                                  >
                                    <p>{touch.displayValue}</p>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
                <div className="action">
                  <div
                    className="add"
                    onClick={() => this.addItemInBasket(product)}
                  >
                    <p>+</p>
                  </div>
                  <div className="countity">
                    <p>{product.quantity.length}</p>
                  </div>
                  <div
                    className="remove"
                    onClick={() =>
                      this.deleteItemFromBasket(product, indexItem)
                    }
                  >
                    <p>-</p>
                  </div>
                </div>
                <div className="block_img">
                  <Carusel value={product.product.gallery} />
                </div>
              </section>
            )
          })}
        </main>
        <Footer />
      </StyledCardPage>
    )
  }
}
const mapStateToProps = (state) => ({
  addItemToBasket: state.getDataReducer.addItemToBasket,
  currency: state.getDataReducer.selectedCurrency,
})

export default connect(mapStateToProps)(CardPage)
