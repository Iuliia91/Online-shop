import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { DIRECTION_TYPES } from './directionTypes'
import MainLayouts from '../Layouts/MainLayouts'
import ProductDescriptionPage from '../Scenes/productDescriptionPage/ProductDescriptionPage'
import ProductCard from '../Scenes/productListingPage/ProductCard'
import CardPage from '../Scenes/cartPage/CardPage'

class RootRoute extends React.Component {
  render() {
    return (
      <Routes>
        <Route path={'/'} element={<MainLayouts />}>
          <Route path={'/'} element={<ProductCard />} />

          <Route
            path={DIRECTION_TYPES.productDesctiption}
            element={<ProductDescriptionPage />}
          />
          <Route path={'card_overlay'} element={<CardPage />} />
        </Route>
      </Routes>
    )
  }
}

export default RootRoute
