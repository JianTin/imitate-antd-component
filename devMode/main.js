import React, { useEffect, useRef, useState } from 'react'
import {render} from 'react-dom'
import {SliderValidate, Mask, MobileModal} from '../component/index.js'

function App(){
    return <>
        <SliderValidate/>
    </>
}

render(
    <App/>,
    document.getElementById('root')
)