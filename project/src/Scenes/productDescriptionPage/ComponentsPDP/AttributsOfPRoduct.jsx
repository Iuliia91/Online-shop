import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const StyledAttributsOFProduct = styled.div`
  .size,
  .capacity,
  .touch,
  .usb {
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
      div:hover {
        background: black;
        p {
          color: white;
        }
      }
    }
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

  .active {
    background: black;
  }

  .active > p {
    color: white;
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
      color: '',
      active: false,
    }
  }

  render() {
    return (
      <>
        {this.props.productForDescription.attributes.length > 0 && (
          <StyledAttributsOFProduct>
            {' '}
            {this.props.productForDescription.attributes.map(
              (attribut, index) => {
                if (attribut.name == 'Size') {
                  return (
                    <div className="size" key={index}>
                      <p>{attribut.id}:</p>
                      <div>
                        {attribut.items.map((sizeItem, index) => {
                          return (
                            <div
                              key={index}
                              className={
                                this.props.size == sizeItem.id ? 'active' : ''
                              }
                              onClick={() =>
                                this.props.handeleSizeValu(sizeItem.id)
                              }
                            >
                              <p>{sizeItem.displayValue}</p>
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
                      <div>
                        {attribut.items.map((color) => {
                          return (
                            <div
                              className={
                                this.props.color == color.id
                                  ? 'active_color'
                                  : 'color_border'
                              }
                            >
                              <div
                                onClick={() =>
                                  this.props.handleColorValue(color.id)
                                }
                              >
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
                      <p>{attribut.id}</p>
                      <div>
                        {attribut.items.map((capacity) => {
                          return (
                            <div
                              onClick={() =>
                                this.props.handleCapacityValue(capacity.id)
                              }
                              className={
                                this.props.capacity == capacity.id
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
                      <div>
                        {attribut.items.map((usb) => {
                          return (
                            <div
                              onClick={() => this.props.handleUsbValue(usb.id)}
                              className={
                                this.props.usb == usb.id ? 'active' : ''
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
                      <div>
                        {attribut.items.map((touch) => {
                          return (
                            <div
                              onClick={() =>
                                this.props.handleTouchValu(touch.id)
                              }
                              className={
                                this.props.touch == touch.id ? 'active' : ''
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
              }
            )}
          </StyledAttributsOFProduct>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  productForDescription: state.getDataReducer.productDescription,
  currency: state.getDataReducer.selectedCurrency,
})

export default connect(mapStateToProps)(AttridutsOfProduct)
