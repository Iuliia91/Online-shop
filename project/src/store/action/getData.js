import { createAction } from '@reduxjs/toolkit'
import { gql, useQuery } from '@apollo/client'
import { GetData } from '../actionTypes'

export const getDataAction = createAction('get_product_from_Server')

export const getDataCurrency = createAction('get_currency_from_Server')
