import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Raleway from '../assest/font-family/Raleway.ttf'
import Roboto from '../assest/font-family/RobotoCondensed-Regular.ttf'
import Source from '../assest/font-family/SourceSansPro-Regular.ttf'
const GlobalStyled = createGlobalStyle`
body {
  margin: 0;
  padding:0;
  max-width:1440px;
  margin:auto;
}
@font-face{
  font-family:"Raleway";
  src:url(${Raleway});
}

@font-face{
  font-family:'Roboto Condensed';
  src:url(${Roboto})
}

@font-face{
  font-family:'Source Sans Pro';
  src:url(${Source})
}
}
:root{
  --c-primar:#5ECE7B;
  --c-white:#FFFFFF;
  --c-grey:#EEEEEE;
  --c-text:#1D1F22;
}
`

class GlobalStyledProvide extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyled />
      </React.Fragment>
    )
  }
}

export default GlobalStyledProvide
