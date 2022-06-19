import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { CurrencyChoosenAction } from '../../store/action/currencyChoosen'

const StyledCurrencySwitcher = styled.ul`
  position: absolute;
  width: 114px;
  left: 45px;
  top: 41px;
  padding: 0;
  margin: 0;
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  z-index: 1000;
  li {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px 0;
    gap: 10px;
    text-align: right;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 6px 15px 6px 0;
      gap: 5px;
      p {
        margin: 0;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 160%;
        color: #1d1f22;
        // text-align: right;
      }
    }
    &:hover {
      background: #eeeeee;
      width: 100%;
      // margin: 22px 15px 22px 0;
    }
  }
`

class CurrencySwitcher extends React.Component {
  constructor(props) {
    super(props)
    this.state = { change: true, node: '' }

    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  setWrapperRef(node) {
    this.wrapperRef = node
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.handleCloseList(false)
    }
  }

  handleChoosenCurrency = (item, index) => {
    this.props.dispatch(CurrencyChoosenAction(item.symbol, index))
    this.setState({ change: false })
    this.props.handleCloseList(false)
  }
  render() {
    return (
      <StyledCurrencySwitcher ref={this.setWrapperRef}>
        {this.state.change &&
          this.props.currency.map((item, index) => {
            return (
              <li key={index}>
                <div onClick={() => this.handleChoosenCurrency(item, index)}>
                  <p>{item.symbol} </p>
                  <p>{item.label}</p>
                </div>
              </li>
            )
          })}
      </StyledCurrencySwitcher>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.getDataReducer,
  currency: state.getDataReducer.currency.data.currencies,
  selectedCurrency: state.getDataReducer.selectedCurrency,
})

export default connect(mapStateToProps)(CurrencySwitcher)
