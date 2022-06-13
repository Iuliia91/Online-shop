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
        (product) => product.name == state.cutegory
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
            if (currency.currency.symbol == state.selectedCurrency) {
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

      if (action.payload) {
        state.addItemToBasket.forEach((item) => {
          if (item.product.id == action.payload.id) {
            action.payload.prices.map((currency) => {
              if (currency.currency.symbol == state.selectedCurrency) {
                isInArray = true

                item.quantity.push(1)
                state.totalProductInBasket += 1
                state.totalSumInBasket += currency.amount
              }
            })
          }
        })

        if (!isInArray) {
          action.payload.prices.map((currency) => {
            if (currency.currency.symbol == state.selectedCurrency) {
              state.totalProductInBasket += 1
              state.addItemToBasket.push({
                product: action.payload,
                attributs: state.attributs,
                quantity: [1],
              })
              state.totalSumInBasket += currency.amount
            }
          })
        }
      }
    })
    .addCase(attributsSelect, (state, action) => {
      let isInArray = false
      let quantity = 0
      state.addItemToBasket.forEach((item) => {
        if (item.product.id == action.payload.product.id) {
          if (
            item.attributs.size == action.payload.attributs.size &&
            item.attributs.color == action.payload.attributs.color &&
            item.attributs.capacity == action.payload.attributs.capacity &&
            item.attributs.usb == action.payload.attributs.usb &&
            item.attributs.touch == action.payload.attributs.touch
          ) {
            item.quantity.push(1)
            state.totalProductInBasket += 1
            action.payload.product.prices.map((currency) => {
              if (currency.currency.symbol == state.selectedCurrency) {
                isInArray = true

                state.totalSumInBasket += currency.amount
              }
            })
          }
        }
      })

      if (!isInArray) {
        state.totalProductInBasket += 1
        state.addItemToBasket.push(action.payload)
        action.payload.product.prices.map((currency) => {
          if (currency.currency.symbol == state.selectedCurrency) {
            state.totalSumInBasket += currency.amount
          }
        })
      }
    })

    .addCase(deleteItemFromBasket, (state, action) => {
      console.log(action.payload)

      if (action.payload.item.quantity.length > 1) {
        state.addItemToBasket.map((product) => {
          if (product.product.id == action.payload.item.product.id) {
            if (
              product.attributs.size == action.payload.item.attributs.size &&
              product.attributs.color == action.payload.item.attributs.color &&
              product.attributs.capacity ==
                action.payload.item.attributs.capacity &&
              product.attributs.usb == action.payload.item.attributs.usb &&
              product.attributs.touch == action.payload.item.attributs.touch
            ) {
              state.totalProductInBasket -= 1
              product.quantity = product.quantity.slice(1)
              action.payload.item.product.prices.map((currency) => {
                if (currency.currency.symbol == state.selectedCurrency) {
                  state.totalSumInBasket -= currency.amount
                }
              })
            }
          }
        })
      } else if (action.payload.item.quantity.length == 1) {
        state.totalProductInBasket -= 1
        state.addItemToBasket.splice(action.payload.index, 1)
        action.payload.item.product.prices.map((currency) => {
          if (currency.currency.symbol == state.selectedCurrency) {
            state.totalSumInBasket -= currency.amount
          }
        })
      }
    })
    .addCase(addItemInBasket, (state, action) => {
      let isInArray = false
      console.log(action.payload)
      state.addItemToBasket.map((product) => {
        if (product.product.id == action.payload.product.id) {
          if (
            product.attributs.size == action.payload.attributs.size &&
            product.attributs.color == action.payload.attributs.color &&
            product.attributs.capacity == action.payload.attributs.capacity &&
            product.attributs.usb == action.payload.attributs.usb &&
            product.attributs.touch == action.payload.attributs.touch
          ) {
            product.quantity.push(1)
            state.totalProductInBasket += 1
            console.log(action.payload.product.prices)
            action.payload.product.prices.map((currency) => {
              if (currency.currency.symbol == state.selectedCurrency) {
                state.totalSumInBasket += currency.amount
              }
            })
          }
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
