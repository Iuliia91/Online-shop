import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import AttributeCartOverlay from './attribute/AttributeCartOverlay'
import { Link } from 'react-router-dom'
import { categoryChoosenAction } from '../../../store/action/categoryChoosenAction'

const StyledCartOverlay = styled.div`
  position: absolute;
  z-index: 99999;
  top: 55px;
  left: -1200px;
  width: 1440px;
  height: 1800px;
  background: rgba(57, 55, 72, 0.22);
  .block {
    position: absolute;
    width: 325px;
    height: 677px;
    left: 1039px;
    background: white;
    header {
      // display: flex;
      margin-left: 15px;
      margin-top: 32px;
      align-items: flex-start;
      width: 118px;
      //height: 26px;

      p {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 160%;
        /* identical to box height, or 26px */

        text-align: right;
        span {
          font-weight: 500;
          font-family: 'Raleway';
          font-style: normal;
        }
      }
    }
    main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-bottom: 20px;
      gap: 40px;
      margin: auto;
      width: 293px;
      height: 420px;
      margin-top: 34px;
      overflow: hidden;
      overflow-y: hidden;

      section {
        width: 293px;
       
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 0px;
        gap: 8px;
      }

      .titel {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 160%;
        width: 136px;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
          margin: 0;
        }
      }
      .amount {
        margin-top: 4px;
      }
      .amount > div {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 160%;
        color: #1d1f22;
      }
    }
  }
  main:hover {
    // overflow-x: hidden;
    // overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -moz-overflow-scrolling: touch;
    -ms-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;
    overflow-scrolling: touch;
    padding-bottom: 20px;
  }
  main:hover {
    overflow-y: auto;
    // overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -moz-overflow-scrolling: touch;
    -ms-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
  main::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 2px;
  }
  main::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: var(--c-primar);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
  .block_img {
    height: 100%;
    display: flex;
    align-items: flex-end;
  }
  .img {
    margin: auto;
    width: 121px;
  }

  .size,
  .capacity, .usb, .touch {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 2px;


    .size_item, .capacity_item , .usb_item, .touch_item{
      display: flex;
      div {
        border: 1px solid #1d1f22;
        margin-right: 8px;
        margin-top: 6px;
        width: 24px;
        height: 24px;
        box-sizing: border-box;
      }
     

    }
    .capacity_item>div{
         border: 1px solid #1d1f22;
        margin-right: 8px;
        margin-top: 6px;
        width: 30px;
        height: 30px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-size: 10px;
        }
      }

      p {
        margin: 0;
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 160%;
        color: #1d1f22;
        text-align: center;
      }
    }

    .active {
      background: #1d1f22;
    }

    .active > p {
      color: white;
    }

    .action {
      position: relative;
      height: 100%;
      width: 24px;
    }
    .countity {
      position: absolute;
      width: 8px;
      height: 26px;
      top: 42%;
      left: 23%;
      p {
        margin: 0;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 160%;
        text-align: right;
      }
    }
    .add {
      display: flex;
      position: absolute;
      box-sizing: border-box;
      border: 1px solid #1d1f22;
      width: 24px;
      height: 24px;

      p {
        margin: auto;

        text-align: center;
      }
    }
    .remove {
      position: absolute;
      box-sizing: border-box;
      border: 1px solid #1d1f22;
      width: 24px;
      height: 24px;
      bottom: 0;
      p {
        margin: 0;
        text-align: center;
      }
    }
  }

  .Color {
    margin-top: 0px;
    p {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
    }
    div {
      display: flex;
      flex-direction: row;
      margin-top: 5px;
      margin: auto;
    }

    .color_border {
      width: 20px;
      height: 20px;

      div {
        width: 16px;
        height: 16px;
        margin: auto;
      }
    }

    .active_color {
      width: 20px;
      height: 20px;
      border: 1px solid #5ece7b;
      div {
        width: 16px;
        height: 16px;
      }
    }
  }

  footer{
    display:flex;
    flex-direction:column;
 gap:35px;
 width: 293px;
 height: 420px;
 margin:auto;
    .total_sum{
      position:relative;
      margin-top:3px;
      width:100%;
      .total{
        position:absolute;
        left:0;
         font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 18px;
       
        
    }
    .sum{
      position:absolute;
      right: 0;
      font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 18px;
    }
    

  }
  .bag_button{
   
    
  display: flex;
  flex-direction: row;
   align-items: flex-start;
  margin-top:32px; 
     gap: 12px;
     .button{
    background: transparent;
    border: 1px solid #1D1F22;
    width: 140px;
height: 43px;*

p{

  margin:0;
  ont-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 120%;
}
      }
      .button:hover{
        background:#5ECE7B;
        border:none;
        p{
          color:white;
        }
      }
    }
    
    .active{
      background:#5ECE7B;
        border:none;
        width: 140px;
height: 43px;
        p{
          color:white;
        }
    }
`

class CartOverlay extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: 'CHECK OUT',
      text: ['VIEW BAG', 'CHECK OUT'],
    }
  }

  handleActiveClass(item) {
    this.props.dispatch(categoryChoosenAction('tech'))
    this.setState({ active: item })
  }

  render() {
    return (
      <StyledCartOverlay>
        <div className="block">
          <header>
            <p>
              My Bag <span>{this.props.totalAmountInBasket} items</span>
            </p>
          </header>
          <main>
            {this.props.addItemToBasket.map((product, index) => {
              return (
                <AttributeCartOverlay
                  product={product}
                  index={index}
                  currency={this.props.currency}
                />
              )
            })}
          </main>
          <footer>
            <div className="total_sum">
              <p className="total">Total</p>
              <p className="sum">
                {this.props.currency} {this.props.sum.toFixed(2)}
              </p>
            </div>
            <div className="bag_button">
              {this.state.text.map((text) => {
                return (
                  <Link to="/card_overlay">
                    {' '}
                    <button
                      className={
                        this.state.active === text ? 'active' : 'button'
                      }
                      onClick={() => {
                        return (
                          this.handleActiveClass(text), this.props.show(false)
                        )
                      }}
                    >
                      <p>{text}</p>
                    </button>
                  </Link>
                )
              })}
            </div>
          </footer>
        </div>
      </StyledCartOverlay>
    )
  }
}

const mapStateToProps = (state) => ({
  addItemToBasket: state.getDataReducer.addItemToBasket,
  currency: state.getDataReducer.selectedCurrency,
  totalAmountInBasket: state.getDataReducer.totalProductInBasket,
  sum: state.getDataReducer.totalSumInBasket,
})
export default connect(mapStateToProps)(CartOverlay)
