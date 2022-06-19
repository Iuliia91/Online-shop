import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

export const StyledAttributsOFProduct = styled.div`
  .size {
    margin-top: 24px;
    p {
      text-transform: uppercase;
      font-family: 'Roboto Condensed';
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 18px;
    }
    div {
      display: grid;
      grid-template-columns: repeat(4, 64px);
      grid-column-gap: 11px;
      height: 45px;
      margin-top: 3.5px;
      div {
        box-sizing: border-box;

        height: 45px;
        border: 1px solid #1d1f22;

        p {
          align-items: center;
          justify-items: center;
          margin: auto;
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 18px;
        }
      }
    }
  }

  .active {
    background: black;
  }

  .active > p {
    color: white;
  }

  .item_details {
    margin-top: 43px;
  }
  .capacity,
  .touch,
  .usb {
    margin-top: 24px;
  }

  .Color {
    margin-top: 10px;
    p {
      font-family: 'Roboto Condensed';
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 18px;
      margin-top: 29px;
    }
    div {
      display: flex;

      flex-direction: row;

      margin-top: 5px;
      margin-right: 5px;
    }
  }
  .color_border {
    width: 36px;
    height: 36px;
    div {
      width: 32px;
      height: 32px;
      margin: auto;
    }
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

  .tr {
    background: red;
  }
  .active_color {
    width: 36px;
    height: 36px;
    border: 1px solid #5ece7b;
    div {
      width: 32px;
      height: 32px;
      margin: auto;
    }
  }
`

class AttridutsOfProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      img: this.props.productForDescription.gallery[0],
      itemIndex: 1,
      colorIndex: 0,
      active: false,
    }
  }

  render() {
    if (this.props.value.type === 'swatch') {
      return (
        <StyledAttributsOFProduct>
          <div className="Color" key={this.props.value.id}>
            <p>{this.props.value.id}:</p>
            <div>
              {this.props.value.items.map((color, indexColor) => {
                return (
                  <div
                    key={color.id}
                    className={
                      indexColor === this.state.colorIndex
                        ? 'active_color'
                        : 'color_border'
                    }
                  >
                    <div
                      onClick={() => {
                        this.setState({ colorIndex: indexColor })
                        this.props.handleAttributeValue(this.props.value, color)
                      }}
                    >
                      <div style={{ background: color.value }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </StyledAttributsOFProduct>
      )
    } else {
      return (
        <StyledAttributsOFProduct>
          <div className="size" key={this.props.value.id}>
            <p>{this.props.value.id}:</p>
            <div>
              {this.props.value.items.map((value, indexValue) => {
                return (
                  <div
                    key={value.id}
                    className={
                      indexValue === this.state.itemIndex ? 'active' : ''
                    }
                    onClick={() => {
                      this.setState({ itemIndex: indexValue })
                      this.props.handleAttributeValue(this.props.value, value)
                    }}
                  >
                    <p>{value.displayValue}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </StyledAttributsOFProduct>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  productForDescription: state.getDataReducer.productDescription,
  currency: state.getDataReducer.selectedCurrency,
})

export default connect(mapStateToProps)(AttridutsOfProduct)
