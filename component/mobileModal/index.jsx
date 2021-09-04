import React,{useRef, useLayoutEffect} from "react";
import {createPortal} from 'react-dom'
import {getIndex} from '../assets'
import close from '../image/close.png'
import {Button} from '../index'
import {Touch} from '../index'

const body = document.querySelector('body')
const animationArray = ['initate-mobileModalmask-animationIn', 'initate-mobileModalmask-animationOut', 'initate-mobileModalcontent-animationIn', 'initate-mobileModalcontent-animationOut']
const index = getIndex()
const Modal = function(
    {children, visible = false, onCancel=()=>{}, title, footer=true, className='', footerText='确认', header=true}
){
    const ModalDom = useRef(null)
    // 是否是 第一次 visible
    let init = true
    // 初始化，防止 运行动画
    useLayoutEffect(()=>{
        if(visible === false) {
            (ModalDom.current).style.display = 'none'
        }
        init = false
    }, [])

    // 状态控制 显示
    useLayoutEffect(()=>{
        if(!init) return
        if(visible === true) {
            (ModalDom.current).style.display = 'block'
        }
    }, [visible])

    // 动画结束，false none
    // 清除动画类
    function animationEnd(){
        if(visible === false) {
            (ModalDom.current).style.display = 'none'
        }
        Object.values((ModalDom.current).children).forEach(item => item.classList.remove(...animationArray))
    }

    // 根据 visible 返回动画 类名
    function resultAnimation() {
        return visible ? {mask: 'initate-mobileModalmask-animationIn', content: 'initate-mobileModalcontent-animationIn'} : 
        {mask: 'initate-mobileModalmask-animationOut', content: 'initate-mobileModalcontent-animationOut'}
    }

    const {mask, content} = resultAnimation()
    const ModalElemet = <div className={`initate-mobileModalouter ${className}`} ref={ModalDom} style={{zIndex: index}}>
        <Touch eventCall={onCancel}>
            <div className={`initate-mobileModalmask ${mask}`}></div>
        </Touch>
        <div className={`initate-mobileModalcontent ${content}`} onAnimationEnd={animationEnd}>
            {
                header && <>
                    <div className='initate-mobileModalclose'>
                        <Touch eventCall={onCancel}>
                            <img src={close} alt='close' onClick={onCancel} />
                        </Touch>
                    </div>
                    <div className='initate-mobileModaltitle'>
                        <span>{title}</span>
                    </div>
                </>
            }
            <div className='initate-mobileModalchildren-content'>
                {children}
            </div>
            {
                footer && 
                <Touch eventCall={onCancel}>
                    <Button className='initate-mobileModalfooter' type='primary' >{footerText}</Button>
                </Touch>
            }
        </div>
    </div>
    return createPortal(ModalElemet, body)
}

export default Modal