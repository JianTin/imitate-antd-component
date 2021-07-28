import React, { useState } from 'react'
import {render} from 'react-dom'
import {Select, Message} from '../component/index'

const {Option} = Select
function App(){
    const [value, setValue] = useState('1')
    const [array, setArray] = useState(['1', '2'])
    function change(newVal){
        setValue(newVal)
    }
    return (
        <>
            <Select value={value} onChange={change}>
                {
                    array.map((item)=> <Option value={item} key={item}>{item}</Option>)
                }
            </Select>
        </>
    )
}
render(
    <App/>,
    document.getElementById('root')
)