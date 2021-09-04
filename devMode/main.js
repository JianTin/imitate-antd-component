import React, { useState } from 'react'
import {render} from 'react-dom'
import {Touch, MobileModal, Modal, Select} from '../component/index'

function App(){
    function t(){
        console.log(123)
    }
    return (
        <>
        <Touch eventCall={t}>
            <button>123</button>
        </Touch>
        <Select>
            <div key='1' value='1'>1</div>
            <div key='2' value='2'>12</div>
        </Select>
        </>
        
    )
}
render(
    <App/>,
    document.getElementById('root')
)