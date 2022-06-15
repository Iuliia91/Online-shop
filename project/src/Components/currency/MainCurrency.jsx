import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import CurrencySwitcher from './CurrencySwitcher'

import { getDataCurrency } from '../../store/action/getData'
import { client } from '../../App'
import arrowdown from '../../assest/images/arrowdown.png'
import arrowup from '../../assest/images/arrowup.png'
import { CURRENCIES_LABEL } from '../../helpers/GraphQl/queries'
import Basket from '../header/Basket'

const StyledMAinCurrency = styled.div`
  position: absolute;
  width: 204px;
  height: 40px;
  right: 101px;
  top: 19px;
  left: 1189px;

  .choosen_currency {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    padding: 0px 10px;
    gap: 12px;
  }

  .group {
    width: 38px;
    height: 29px;
    display: flex;
    flex-direction: row;
    //gap: 12px;
    margin-right: 12px;
    position: relative;

    img {
      position: absolute;
      left: 70.47%;
      right: 20.59%;
      top: 70.75%;
      bottom: 38.75%;
    }
  }
  .label {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    //padding: 0px 10px;
    gap: 12px;

    position: absolute;
    width: 32px;
    height: 29px;

    top: 5.5px;

    p {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 160%;
      /* identical to box height, or 29px */
      margin: 0;
      padding-right: 12px;
      display: flex;
      align-items: flex-end;
    }
  }
`

class MainCurrency extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }

    this.handleCloseList = this.handleCloseList.bind(this)
  }

  componentDidMount = async () => {
    await client.query({ query: CURRENCIES_LABEL }).then((response) => {
      this.props.dispatch(getDataCurrency(response))
    })
  }

  handleOpenListCurrency() {
    this.setState({ open: !this.state.open })
  }

  handleCloseList(item) {
    this.setState({ open: item })
  }

  render() {
    return (
      <StyledMAinCurrency>
        <div className="choosen_currency">
          <div className="group" onClick={() => this.handleOpenListCurrency()}>
            <div className="label">
              <p>{this.props.selecteCurrency}</p>
            </div>

            <div>
              {this.state.open ? (
                <img src={arrowup} alt="img" />
              ) : (
                <img src={arrowdown} alt="img" />
              )}
            </div>
          </div>

          <Basket />
        </div>
        {this.state.open && (
          <CurrencySwitcher handleCloseList={this.handleCloseList} />
        )}
      </StyledMAinCurrency>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state,
  currency: state.getDataReducer.currency,
  selecteCurrency: state.getDataReducer.selectedCurrency,
})

export default connect(mapStateToProps)(MainCurrency)
