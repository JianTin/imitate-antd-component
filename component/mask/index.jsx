import React, { useRef, useLayoutEffect, useEffect} from "react";
import {createPortal} from 'react-dom'

const body = document.body
const animationArray = ['imitate-maskanimationIn', 'imitate-maskanimationOut']

function Mask({visible, onCancel, spin, isFullScreen}){

    const maskDom = useRef(null)
    const spinContainer = useRef(null)
    // 是否是 第一次 visible
    const initRef = useRef(true)
    // 初始化，防止 运行动画
    useLayoutEffect(()=>{
        initRef.current = false
        if(visible === false) {
            (maskDom.current).style.display = 'none'
        }
        if(spin) {
            createSpin()
            spinContainer.current.style.visibility = 'hidden'
        }
    }, [])
    
    // 打开可滚动
    useEffect(()=>openScroll, [])

    function createSpin(){
        const container = spinContainer.current
        if(!container) return;
        if(container.children.length === 4) {
            return spinContainer.current.style.visibility = 'visible'
        }
        const spin = document.createElement('div')
        spin.classList.add('imitate-spin')
        setTimeout(()=>{
            container.appendChild(spin)
            createSpin()
        }, 100)
    }

    // 状态控制 显示
    useLayoutEffect(()=>{
        if(initRef.current) return
        if(visible === true) {
            (maskDom.current).style.display = 'block'
            if(isFullScreen) notScroll();
        }
    }, [visible])

    // 动画结束，visible：false -> display: none; 
    // 清除动画类
    function animationEnd(){
        maskDom.current?.classList.remove(...animationArray)
        if(visible === false) {
            (maskDom.current).style.display = 'none'
            if(isFullScreen) openScroll();
        }
    }

    // 根据 visible 返回动画 类名
    function resultAnimation() {
        return visible ? 'imitate-maskanimationIn' : 'imitate-maskanimationOut'
    }

    // 关闭滚动
    function notScroll(){
        document.body.style.overflow = 'hidden'
    }
    // 打开滚动
    function openScroll(){
        document.body.style.overflow = ''
    }

    return <div
                className={`imitate-mask ${resultAnimation()}`} 
                ref={maskDom} 
                onAnimationEnd={animationEnd}
                onClick={onCancel}
                onTouchEnd={onCancel}
                style={{position: isFullScreen ? 'fixed' : 'absolute'}}
            >
                {
                    spin && 
                    <div className='imitate-spin-container' ref={spinContainer}>
                        <div className='imitate-spin'></div>
                    </div>
                }
            </div>
}

const MaskChildren = function({children = null, visible, onCancel = ()=>{}, spin=false}){
    const isFullScreen = children ? false : true
    if(children){
        return <div className='imitate-mask-outer'>
            <Mask visible={visible} onCancel={onCancel} spin={spin} isFullScreen={isFullScreen} />
            {children}
        </div>
    }
    return createPortal(<Mask visible={visible} onCancel={onCancel} isFullScreen={isFullScreen} />, body)
}


export default MaskChildren