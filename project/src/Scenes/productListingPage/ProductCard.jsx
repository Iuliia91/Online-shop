import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Attribute from './attribute/Attribute'
import { sortingDataByValueInput } from '../../store/action/sortingDataByVAlueInput'
export const StyledProductCard = styled.div`
  position: relative;
  top: 250px;
  left: 87px;
  padding-bottom: 20px;
  main {
    display: grid;
    grid-template-columns: repeat(3, 386px);
    grid-column-gap: 40px;
    grid-row-gap: 106px;
    align-items: flex-start;
    padding: 0px;
    width: 100%;
    height: 444px;
    //left: calc(50% - 386px / 2 - 427px);
    bottom: 738px;

    img {
      width: 354px;
      height: 330px;
    }
  }

  .block_card {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    background: #ffffff;
    flex: none;
    order: 0;
    flex-grow: 0;

    section {
      padding: 16px;
    }
  }

  .titel {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    margin-top: 22px;
    //margin-botton: 1px;
    text-decoration: none;
  }
  .link {
    text-decoration: none;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    margin-top: 22px;
    //margin-botton: 1px;
    text-decoration: none;
    color: var(--c-text);
  }
  .price {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
    color: var(--c-text);
  }
  .basket {
    position: absolute;
    opacity: 0;
    //display: none;
    z-index: 1000;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    // top: 10px;
    right: 27px;
    bottom: -15px;
    //background: transfarent;
    // box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.1);
    z-index: 4000;
    img {
      width: 73px;
      height: 73px;
    }
  }

  .img {
    position: relative;
  }

  .outOfstock {
    width: 100%;
    height: 100%;
    z-index: 3000;
    position: absolute;
    background-color: #ffffff;
    opacity: 0.5;
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
  }
  .block_card:hover {
    display: block;
    background: red;

    background: #ffffff;
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
  .block_card:hover .basket {
    opacity: 1;
  }

  .serch {
    position: absolute;
    width: 299px;
    height: 68px;
    input {
      border: 0;
    }
    input::placeholder {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 400;
      font-size: 42px;
      line-height: 160%;
      color: #1d1f22;
    }
  }
`
const StyledInput = styled.div`
  position: absolute;
  width: 299px;
  height: 68px;
  top: -174px;
  //left: 87px;
  input {
    border: none;
    width: 305px;
    height: 70px;
    outline: 0;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 42px;
    line-height: 160%;
    color: #1d1f22;
  }
  input::placeholder {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 42px;
    line-height: 160%;
    color: #1d1f22;
  }

  input:focus::placeholder {
    color: transparent;
  }
`
class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { List: '', value: '' }
    this.handleSortingByValue = this.handleSortingByValue.bind(this)
  }
  handleSortingByValue(event) {
    this.setState({ value: event.target.value })

    let arr = this.props.selectedListData[0].products.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    })
    this.setState({ List: arr })
  }

  render() {
    if (this.props.selectedListData.length > 0) {
      return (
        <StyledProductCard>
          {this.props.cutegory == 'all' && (
            <StyledInput>
              <input
                placeholder="Category name"
                value={this.state.value}
                onChange={(event) => this.handleSortingByValue(event)}
              />
            </StyledInput>
          )}
          <main>
            {this.state.value !== ''
              ? this.state.List.map((item, index) => {
                  return (
                    <Attribute
                      key={index}
                      item={item}
                      currency={this.props.currency}
                      productForDescription={this.props.productForDescription}
                    />
                  )
                })
              : this.props.selectedListData[0].products.map((item, index) => {
                  return (
                    <Attribute
                      key={item.id}
                      item={item}
                      currency={this.props.currency}
                      productForDescription={this.props.productForDescription}
                    />
                  )
                })}
          </main>
        </StyledProductCard>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  selectedListData: state.getDataReducer.selectedListData,
  currency: state.getDataReducer.selectedCurrency,
  value: state.getDataReducer.selectedCurrency.inputValue,
  cutegory: state.getDataReducer.cutegory,
})

export default connect(mapStateToProps)(ProductCard)
