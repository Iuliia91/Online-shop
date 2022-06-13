import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { deleteItemFromBasket } from '../../../../store/action/deleteItemFromBasket'
import { addItemInBasket } from '../../../../store/action/addItemInBasket'
import { totalSum } from '../../../../store/action/totalSUM'
import { Link } from 'react-router-dom'
class AttributeCartOverlay extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  deleteItemFromBasket(item, index) {
    console.log(item)
    this.props.dispatch(deleteItemFromBasket({ item: item, index: index }))
  }

  addItemInBasket(item) {
    this.props.dispatch(addItemInBasket(item))
  }

  render() {
    return (
      <section>
        <div>
          <div className="titel">
            <p>{this.props.product.product.brand}</p>
            <p>{this.props.product.product.name}</p>
          </div>

          <div className="amount">
            {this.props.product.product.prices.map((currency, index) => {
              if (currency.currency.symbol == this.props.currency) {
                return (
                  <div key={index}>
                    {currency.currency.symbol}
                    {currency.amount}
                  </div>
                )
              }
            })}
          </div>
          <div>
            {this.props.product.product.attributes.map((attribut, index) => {
              if (attribut.name == 'Size') {
                return (
                  <div className="size" key={index}>
                    <p>{attribut.id}:</p>
                    <div className="size_item">
                      {attribut.items.map((size) => {
                        return (
                          <div
                            className={
                              size.id == this.props.product.attributs.size
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
                  <div className="Color" key={index}>
                    <p>{attribut.id}:</p>

                    <div className="color_item">
                      {attribut.items.map((color) => {
                        return (
                          <div
                            className={
                              color.id == this.props.product.attributs.color
                                ? 'active_color'
                                : 'color_border'
                            }
                          >
                            <div>
                              <div style={{ background: color.value }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              } else if (attribut.name == 'Capacity') {
                return (
                  <div className="capacity" key={index}>
                    <p>{attribut.id}:</p>
                    <div className="capacity_item">
                      {attribut.items.map((capacity) => {
                        return (
                          <div
                            className={
                              capacity.id ==
                              this.props.product.attributs.capacity
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
                  <div className="usb" key={index}>
                    <p>{attribut.id}</p>
                    <div className="usb_item">
                      {attribut.items.map((usb) => {
                        return (
                          <div
                            className={
                              usb.id == this.props.product.attributs.usb
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
                  <div className="touch" key={index}>
                    <p>{attribut.id}</p>
                    <div className="touch_item">
                      {attribut.items.map((touch) => {
                        return (
                          <div
                            className={
                              touch.id == this.props.product.attributs.touch
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
          <div className="add">
            <p onClick={() => this.addItemInBasket(this.props.product)}>+</p>
          </div>
          <div className="countity">
            <p>{this.props.product.quantity.length}</p>
          </div>
          <div className="remove">
            <p
              onClick={() =>
                this.deleteItemFromBasket(this.props.product, this.props.index)
              }
            >
              -
            </p>
          </div>
        </div>
        <div className="block_img">
          <img src={this.props.product.product.gallery[0]} className="img" />
        </div>
      </section>
    )
  }
}
const mapStateToProps = (state) => ({
  addItemToBasket: state.getDataReducer.addItemToBasket,
  currency: state.getDataReducer.selectedCurrency,
  totalAmountInBasket: state.getDataReducer.totalProductInBasket,
  sum: state.getDataReducer.totalSumInBasket,
})
export default connect(mapStateToProps)(AttributeCartOverlay)
