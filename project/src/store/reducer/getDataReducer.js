import { createReducer } from '@reduxjs/toolkit'
import { CurrencyChoosenAction } from '../action/currencyChoosen'
import { getDataAction, getDataCurrency } from '../action/getData'
import { sortByCaregoryActions } from '../action/sortByCategory'
import { categoryChoosenAction } from '../action/categoryChoosenAction'
import { addItemToBasket } from '../action/addItemToBasket'
import { productDescription } from '../action/productDescription'
import { attributsSelect } from '../action/attributsSelect'
import { deleteItemFromBasket } from '../action/deleteItemFromBasket'
import { addItemInBasket } from '../action/addItemInBasket'
import { totalSum } from '../action/totalSUM'
import { sortingDataByValueInput } from '../action/sortingDataByVAlueInput'
const initialState = {
  data: '',
  currency: '',
  selectedCurrency: '$',
  cutegory: 'all',
  selectedCutegory: '',
  selectedListData: [],
  getSelectedAmount: '',
  addItemToBasket: [],
  productDescription: '',
  inputValue: '',
  inputWork: true,
  sortingByInputValue: [],
  totalProductInBasket: 0,
  totalSumInBasket: 0,
  taxValue: 0,
  sumAfterTax: 0,
  //todo  delete
  attributs: {
    size: 41,
    color: 'Green',
    capacity: '1T',
    usb: 'No',
    touch: 'No',
  },
  product: [],
}

const getDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getDataAction, (state, action) => {
      state.data = action.payload
      state.selectedListData = action.payload.filter(
        (product) => product.name === state.cutegory
      )
    })
    .addCase(getDataCurrency, (state, action) => {
      state.currency = action.payload
    })
    .addCase(CurrencyChoosenAction, (state, action) => {
      if (action.payload) {
        state.selectedCurrency = action.payload
        state.totalSumInBasket = 0
        state.addItemToBasket.map((product) => {
          product.product.prices.map((currency) => {
            if (currency.currency.symbol === state.selectedCurrency) {
              console.log(currency.amount)
              state.totalSumInBasket +=
                currency.amount * product.quantity.length

              return
            }

            return
          })
        })
      }
    })

    .addCase(categoryChoosenAction, (state, action) => {
      state.cutegory = action.payload
    })
    .addCase(sortingDataByValueInput, (state, action) => {
      state.inputValue = action.payload
    })
    .addCase(addItemToBasket, (state, action) => {
      let isInArray = false
      console.log(action.payload)
      state.addItemToBasket.map((itemInBasket) => {
        if (itemInBasket.product.id === action.payload.product.id) {
          itemInBasket.attributs.map((itemInBasketAttribute) => {
            action.payload.attributs.map((actionAttribut) => {
              if (
                itemInBasketAttribute.attribut.id ===
                  actionAttribut.attribut.id &&
                itemInBasketAttribute.value.id === actionAttribut.value.id
              ) {
                action.payload.product.prices.map((currency) => {
                  if (currency.currency.symbol === state.selectedCurrency) {
                    state.totalProductInBasket += 1
                    isInArray = true
                    itemInBasket.quantity.push(1)
                    state.totalSumInBasket += currency.amount
                  }
                })
              }
            })
          })
        }
      })
      if (!isInArray) {
        action.payload.product.prices.map((currency) => {
          if (currency.currency.symbol === state.selectedCurrency) {
            state.totalProductInBasket += 1
            state.addItemToBasket.push(action.payload)
            state.totalSumInBasket += currency.amount
          }
        })
      }
    })
    .addCase(attributsSelect, (state, action) => {
      let isInArray = false
      console.log(action.payload)
      state.addItemToBasket.map((itemInBasket) => {
        if (itemInBasket.product.id === action.payload.product.id) {
          itemInBasket.attributs.map((itemInBasketAttribute) => {
            action.payload.attributs.map((actionAttribut) => {
              if (
                itemInBasketAttribute.attribut.id ===
                  actionAttribut.attribut.id &&
                itemInBasketAttribute.value.id === actionAttribut.value.id
              ) {
                action.payload.product.prices.map((currency) => {
                  if (currency.currency.symbol === state.selectedCurrency) {
                    state.totalProductInBasket += 1
                    isInArray = true
                    itemInBasket.quantity.push(1)
                    state.totalSumInBasket += currency.amount
                  }
                })
              }
            })
          })
        }
      })
      if (!isInArray) {
        action.payload.product.prices.map((currency) => {
          if (currency.currency.symbol === state.selectedCurrency) {
            state.totalProductInBasket += 1
            state.addItemToBasket.push(action.payload)
            state.totalSumInBasket += currency.amount
          }
        })
      }
    })

    .addCase(deleteItemFromBasket, (state, action) => {
      console.log(action.payload)

      if (action.payload.item.quantity.length > 1) {
        state.addItemToBasket.map((product, index) => {
          if (index === action.payload.index) {
            console.log('found', product)

            action.payload.item.product.prices.map((currency) => {
              if (currency.currency.symbol === state.selectedCurrency) {
                state.totalSumInBasket -= currency.amount
                state.totalProductInBasket -= 1
                product.quantity = product.quantity.slice(1)
              }
            })
          }
        })
      } else if (action.payload.item.quantity.length === 1) {
        state.totalProductInBasket -= 1
        state.addItemToBasket.splice(action.payload.index, 1)
        action.payload.item.product.prices.map((currency) => {
          if (currency.currency.symbol === state.selectedCurrency) {
            state.totalSumInBasket -= currency.amount
          }
        })
      }
    })
    .addCase(addItemInBasket, (state, action) => {
      console.log(action.payload)
      state.addItemToBasket.map((productInBasket, index) => {
        if (index === action.payload) {
          productInBasket.product.prices.map((currency) => {
            if (currency.currency.symbol == state.selectedCurrency) {
              state.totalSumInBasket += currency.amount
              state.totalProductInBasket += 1
              productInBasket.quantity.push(1)
            }
          })
        }
      })
    })

    .addCase(productDescription, (state, action) => {
      state.productDescription = action.payload
    })
    .addCase(totalSum, (state, action) => {
      if (action.payload) {
        state.addItemToBasket.map((product) => {
          product.product.prices.map((currency) => {
            if (currency.currency.symbol == state.selectedCurrency) {
              console.log(currency.amount)
              state.totalSumInBasket +=
                currency.amount * product.quantity.length

              return
            }

            return
          })
        })
      } else if (!action.payload) {
        state.totalSumInBasket = 0
      }
    })
    .addCase(sortByCaregoryActions, (state, action) => {
      state.selectedListData = state.data.filter(
        (product) => product.name == state.cutegory
      )
    })
})

export default getDataReducer
