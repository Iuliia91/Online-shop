import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const StyledFooter = styled.div`
  border-top: 1px solid #e5e5e5;
  width: 1275px;
  margin-left: 85px;
  .footer {
    // margin-left: 85px;
    width: 1275px;
    margin-top: 32px;
    div {
      display: flex;
      margin-top: 8px;
      p:first-child {
        width: 120px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        margin: 0;
      }
      p:last-child {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 28px;
        margin: 0;
      }
    }
    div:last-child {
      p:first-child {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
      }
    }
  }
  button {
    width: 279px;
    height: 43px;
    background: transparent;
    background: #5ece7b;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    span {
      color: white;
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 120%;
    }
  }
`
class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <StyledFooter>
        <footer className="footer">
          <div className="tax">
            <p>Tax 21%: </p>
            <p>
              {this.props.currency}
              {((this.props.sum * 21) / 100).toFixed(2)}
            </p>
          </div>
          <div>
            <p>Quantity:</p>
            <p>{this.props.totalAmountInBasket}</p>
          </div>
          <div>
            <p>Total:</p>
            <p>
              {this.props.currency}
              {(this.props.sum - (this.props.sum * 21) / 100).toFixed(2)}
            </p>
          </div>
          <div>
            <button>
              <span>ORDER</span>
            </button>
          </div>
        </footer>
      </StyledFooter>
    )
  }
}
const mapStateToProps = (state) => ({
  addItemToBasket: state.getDataReducer.addItemToBasket,
  currency: state.getDataReducer.selectedCurrency,
  totalAmountInBasket: state.getDataReducer.totalProductInBasket,
  sum: state.getDataReducer.totalSumInBasket,
})
export default connect(mapStateToProps)(Footer)
