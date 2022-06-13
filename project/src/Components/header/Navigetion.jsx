import React, { setState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { categoryChoosenAction } from '../../store/action/categoryChoosenAction'
import { sortByCaregoryActions } from '../../store/action/sortByCategory'
const StyledNavigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: absolute;
  padding: 0px;
  left: 102px;
  top: 24px;
  width: 234px;
  justify-content: space-between;

  .listItem {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 0px;
    width: 33%;
  }

  .label {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: fixed;
    padding: 0 16px;
  }
  .active {
    color: var(--c-primar);
    display: flex;
    // width: 100px;
    // position: fixed;
    flex-direction: column;
    align-items: center;
  }

  p {
    margin: 0 auto;
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    text-align: center;
    color: var(--c-text);
    text-transform: uppercase;
  }

  .active::after {
    content: '';
    width: 30%;
    border-bottom: 2px solid #5ece7b;
    float: inherit;
    top: 50px;
    position: absolute;
    padding: 0 16px;
  }
`

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listItem: ['all', 'tech', 'clothes'],
      addActive: '',
      item: '',
      choosenList: '',
    }
  }
  handleActiveClass = (item) => {
    this.setState({ item: item })
    this.props.dispatch(categoryChoosenAction(item))
    this.props.data.map((block) => {
      if (block.name === item) {
        this.props.dispatch(sortByCaregoryActions(block))
        this.setState({ choosenList: block })
      }
    })
  }
  render() {
    return (
      <StyledNavigation>
        {this.state.listItem.map((item, index) => (
          <div
            onClick={() => this.handleActiveClass(item)}
            key={index}
            className="listItem"
          >
            <div className="lable">
              <p className={this.props.category == item ? 'active' : 'lable'}>
                {item}
              </p>
            </div>
          </div>
        ))}
      </StyledNavigation>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.getDataReducer.data,
  selectedCutegory: state.getDataReducer.selectedCutegory,
  category: state.getDataReducer.cutegory,
})

export default connect(mapStateToProps)(Navigation)
