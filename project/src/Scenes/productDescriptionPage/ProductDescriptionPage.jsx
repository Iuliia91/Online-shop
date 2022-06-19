import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import parse from 'html-react-parser'
import { attributsSelect } from '../../store/action/attributsSelect'

import AttributsOfPRoduct from './ComponentsPDP/AttributsOfPRoduct'
const StyledProductDescriptionPage = styled.div`
  max-width: 1400px;
  position: relative;
  top: 74px;
  left: 87px;
  display: flex;
  flex-direction: row;

  .block_img {
    display: grid;
    grid-row-gap: 38px;

    img {
      width: 79px;
      height: 80px;
    }
  }

  .choosen_img {
    position: absolute;
    left: 117px;
    img {
      width: 610px;
      height: 511px;
    }
  }

  .product_description {
    width: 292px;
    height: 595px;
    position: absolute;
    left: 828px;
    p {
      margin: 0;
    }
  }

  .titel {
    color: #1d1f22;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 27px;
  }
  .name {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 27px;
    padding-top: 16px;
  }

  .item_details {
    margin-top: 43px;
  }
  .price {
    p {
      font-family: 'Roboto Condensed';
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 18px;
      margin-top: 40px;
      text-transform: uppercase;
    }
    div {
      margin-top: 19px;
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 18px;
      display: flex;
      align-items: center;

      color: #1d1f22;
    }
  }

  .add_button {
    width: 100%;
    width: 292px;
    height: 52px;
    background: var(--c-primar);
    margin-top: 38px;
    button {
      width: 100%;
      border: none;
      background: transparent;
      p {
        margin: revert;
        text-transform: uppercase;
        color: white;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 120%;
      }
    }
  }
  .outOfstock {
    width: 100%;
    height: 100%;
    z-index: 3000;
    position: absolute;
    background-color: #ffffff;
    opacity: 0.5;
    top: 0;
  }
  .outName {
    position: absolute;
    left: 25.42%;
    right: 25.71%;
    top: 44.24%;
    bottom: 43.94%;
    color: #8d8f9a;
    margin: 0;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 160%;
    text-align: center;
  }
  .description {
    height: 200px;
    overflow: hidden;
    margin-top: 40px;
  }

  .description_child {
    max-height: 200px;
    margin: 0;
    overflow-y: hidden;
    ul {
      padding: 0;
    }

    span,
    p {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
    }
  }
  .description_child:hover {
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -moz-overflow-scrolling: touch;
    -ms-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
  .description_child:hover {
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -moz-overflow-scrolling: touch;
    -ms-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
  .description_child::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 2px;
  }
  .description_child::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: var(--c-primar);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`

class ProductDescriptionPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      img: this.props.productForDescription.gallery[0],

      newSelectedObj: '',
    }
    this.selectedAttributes = []
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)

    this.handleAddProductToBasket = this.handleAddProductToBasket.bind(this)
    this.handleAttributeValue = this.handleAttributeValue.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentDidUpdate(prevstate) {
    if (prevstate.newSelectedObj !== this.state.newSelectedObj) {
      console.log('different')
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  setWrapperRef(node) {
    this.wrapperRef = node
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      return
    }
  }

  handleChoosenImg(imgs) {
    this.setState({ img: imgs })
  }

  handleAttributeValue(attribut, value) {
    let obj = { attribut: attribut, value: value }

    if (this.selectedAttributes.length === 0) {
      this.selectedAttributes = [...this.selectedAttributes, obj]
    } else if (this.selectedAttributes.length > 0) {
      const copySelectedAttributes = this.selectedAttributes.filter((item) => {
        return item.attribut.id !== obj.attribut.id
      })
      copySelectedAttributes.push(obj)
      this.selectedAttributes = copySelectedAttributes
    }
  }

  handleAddProductToBasket() {
    let obj = {}

    let valuedefault = []
    this.props.productForDescription.attributes.forEach((item, index) => {
      obj = {
        attribut: item,
        value: item.items[1],
      }
      valuedefault.push(obj)
    })

    this.props.dispatch(
      attributsSelect({
        product: this.props.productForDescription,
        attributs:
          this.selectedAttributes.length === 0
            ? valuedefault
            : this.selectedAttributes,
        quantity: [1],
      })
    )
  }
  render() {
    console.log(this.selectedAttributes)
    return (
      <StyledProductDescriptionPage ref={this.setWrapperRef}>
        <div className="block_img">
          {this.props.productForDescription.gallery.forEach((img, index) => {
            return (
              <img
                alt="img"
                key={index}
                src={img}
                onClick={() => {
                  this.handleChoosenImg(img)
                }}
              />
            )
          })}
        </div>
        {this.props.productForDescription.inStock ? (
          <div className="choosen_img">
            <img src={this.state.img} alt="img" />
          </div>
        ) : (
          <div className="choosen_img">
            <img src={this.state.img} alt="img" />
            <div className="outOfstock">
              <span className="outName">OUT OF STOCK</span>
            </div>
          </div>
        )}

        <div className="product_description">
          <div>
            <p className="titel">{this.props.productForDescription.brand}</p>
            <p className="name">{this.props.productForDescription.name}</p>
          </div>
          <div className="item_details">
            {this.props.productForDescription.attributes.map(
              (attribute, indexAttribute) => {
                return (
                  <AttributsOfPRoduct
                    value={attribute}
                    handleAttributeValue={this.handleAttributeValue}
                  />
                )
              }
            )}
          </div>

          <div className="price">
            {this.props.productForDescription.prices.forEach((currenc) => {
              if (currenc.currency.symbol === this.props.currency) {
                return (
                  <>
                    <p>{currenc.__typename}:</p>
                    <div>
                      {currenc.currency.symbol}
                      {currenc.amount}
                    </div>
                  </>
                )
              }
            })}
          </div>
          <div className="add_button">
            {this.props.productForDescription.inStock ? (
              <button
                onClick={() => {
                  this.handleAddProductToBasket()
                }}
              >
                {' '}
                <p>add to cart</p>
              </button>
            ) : (
              <button>
                <p>out of stock</p>
              </button>
            )}
          </div>
          <div className="description">
            <div className="description_child">
              {parse(this.props.productForDescription.description)}
            </div>
          </div>
        </div>
      </StyledProductDescriptionPage>
    )
  }
}
const mapStateToProps = (state) => ({
  productForDescription: state.getDataReducer.productDescription,
  currency: state.getDataReducer.selectedCurrency,
  size: state.getDataReducer.attributs.size,
  color: state.getDataReducer.attributs.color,
})

export default connect(mapStateToProps)(ProductDescriptionPage)
