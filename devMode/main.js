import React, { useState } from 'react'
import {render} from 'react-dom'
import {Button, Tab} from '../component/index'

const {TabPane} = Tab
function App(){
    function chang(key){
       // setActiveKey(key)
    }

    return (
        <div>
            <Tab onChange={chang}>
                <TabPane tab="Tab 1" key="1">
                    hello 1
                </TabPane>
                <TabPane tab="Tabs 3123333334" key="2">
                    hello 2
                </TabPane>
            </Tab>
        </div>
    )
}
render(
    <App/>,
    document.getElementById('root')
)