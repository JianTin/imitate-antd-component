import React,{forwardRef} from 'react'
import {createPortal} from 'react-dom'

export default forwardRef(function OptionsList(props, refOptions){
    const {optionPosition, optionsAnimationEnd, optionArray, clickOption, selectValue, searchOptionArray, type} = props
    // 决定用哪个数组
    let array = type === 'search' ? searchOptionArray : optionArray
    return createPortal(
        <div className='imitate-select-list' isopen='noOpen' style={optionPosition} ref={refOptions}
            onAnimationEnd={optionsAnimationEnd}
        >
            {
                array.map(({children, value}, index)=>
                    <div className={
                        `imitate-select-item ${(value === selectValue) && 'imitate-select-active'}`
                        } optionvalue={value} key={index} onClick={clickOption}  
                        // 阻止 blur 事件在 click options 之前触发
                        onMouseDown={(e)=> e.preventDefault()}
                    >
                        {children}
                    </div>
                )
            }
        </div>
        , document.body
    )  
})
