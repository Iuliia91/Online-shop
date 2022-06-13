import React from 'react'
import styled from 'styled-components'
import Header from '../Components/header/Header'
import { connect } from 'react-redux'
import { getDataAction, getDataCurrency } from '../store/action/getData'
import { client } from '../App'
import {
  Categories_Product,
  CURRENCIES_LABEL,
} from '../helpers/GraphQl/queries'
import { sortByCaregoryActions } from '../store/action/sortByCategory'
import { Outlet } from 'react-router-dom'
import { sortingDataByValueInput } from '../store/action/sortingDataByVAlueInput'
const StyledMAinLayouts = styled.div`
  width: 100%;
  margin: auto;
  text-aling: center;
  background: pinck;
  position: relative;
  .category_name {
    p {
      position: absolute;
      width: 299px;
      height: 68px;
      left: 87px;
      top: 114px;

      font-family: 'Raleway';
      font-style: normal;
      font-weight: 400;
      font-size: 42px;
      line-height: 160%;

      display: flex;
      align-items: center;
    }
  }
`

class MainLayouts extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  componentDidMount = async () => {
    await client
      .query({
        query: Categories_Product,
      })
      .then((respons) => {
        this.props.dispatch(getDataAction(respons.data.categories))
        this.props.dispatch(sortByCaregoryActions())
      })
  }

  componentWillUnmount() {}

  render() {
    return (
      <StyledMAinLayouts>
        <div>
          <Header />
        </div>
        <main>
          <Outlet />
        </main>
      </StyledMAinLayouts>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.getDataReducer.data,
  selectedCutegory: state.getDataReducer.selectedCutegory,
  currency: state.getDataReducer.currency,
  selectedCurrency: state.getDataReducer.selectedCurrency,
  cutegory: state.getDataReducer.cutegory,
})

export default connect(mapStateToProps)(MainLayouts)
