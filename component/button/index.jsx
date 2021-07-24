import React from 'react'
import {findDOMNode} from 'react-dom'

export default class Button extends React.Component {

    handelEvent = ()=>{
        const {onClick, type, disabled} = this.props
        if(disabled) return
        if(['primary', 'default', 'dashed'].includes(type)){
            const node = findDOMNode(this)
            node.classList.add('imitate-btn-animation-click')
        }
        if(onClick) onClick()
    }

    animationEnd = () => {
        const node = findDOMNode(this)
        node.classList.remove('imitate-btn-animation-click')
    }

    render(){
        const {props, handelEvent, animationEnd} = this
        const {children, type, disabled, danger} = props
        return <button className={`imitate-btn imitate-btn-${type}`} 
            onClick={handelEvent}
            onAnimationEnd={animationEnd}
            disabled={disabled ? 'true' : null}
            danger={danger ? 'true' : null}
        >
            <span>{children}</span>
        </button>
    }
}

Button.defaultProps = {
    type: 'default', // primary / default /  dashed / text / link
    onClick: ()=>{}, // click 事件
    disabled: false, // 禁止
    danger: false // 危险
}
