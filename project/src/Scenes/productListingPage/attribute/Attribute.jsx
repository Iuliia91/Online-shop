import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import circle from '../../../assest/images/circle.png'
import { connect } from 'react-redux'
import { addItemToBasket } from '../../../store/action/addItemToBasket'
import { productDescription } from '../../../store/action/productDescription'

class Attribute extends React.Component {
  constructor(props) {
    super(props)
    this.state = { List: props.list }
  }
  handleProductDescription(item) {
    this.props.dispatch(productDescription(item))
  }
  handleAddItemtoBasket(item) {
    let obj = {}
    let valuedefault = []
    item.attributes.map((itemAttributes) => {
      obj = {
        attribut: itemAttributes,
        value: itemAttributes.items[1],
      }
      valuedefault.push(obj)
    })
    this.props.dispatch(
      addItemToBasket({
        product: item,
        attributs: valuedefault,
        quantity: [1],
      })
    )
  }
  render() {
    return (
      <div
        key={this.props.item.id}
        className="block_card"
        onClick={() => {
          this.handleProductDescription(this.props.item)
        }}
      >
        <section>
          {this.props.item.inStock ? (
            <div className="img">
              <Link to={'/product_description'}>
                {' '}
                <img src={this.props.item.gallery[0]} />
              </Link>

              <div
                className="basket"
                onClick={() => {
                  this.handleAddItemtoBasket(this.props.item)
                }}
              >
                <img src={circle} />
              </div>
            </div>
          ) : (
            <div className="img">
              <div className="basket">
                <img src={circle} />
              </div>
              <Link to={'/product_description'}>
                {' '}
                <div className="outOfstock">
                  <span className="outName">OUT OF STOCK</span>
                </div>
              </Link>{' '}
              <img src={this.props.item.gallery[0]} />
            </div>
          )}{' '}
          <Link to={'/product_description'} className="link">
            <div className="titel">
              {' '}
              <div>
                {this.props.item.id}
                {this.props.item.name}
              </div>
              <div>
                {this.props.item.prices.map((currenc, index) => {
                  if (currenc.currency.symbol === this.props.currency) {
                    return (
                      <div className="price" key={index}>
                        {currenc.currency.symbol}
                        {currenc.amount}
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </Link>
        </section>
      </div>
    )
  }
}

export default connect()(Attribute)
