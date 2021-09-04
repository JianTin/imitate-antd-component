import React, { useRef, useLayoutEffect} from "react";
import {createPortal} from 'react-dom'

const body = document.body
const animationArray = ['imitate-maskanimationIn', 'imitate-maskanimationOut']

function Mask({visible, onCancel}){

    const maskDom = useRef(null)
    // 是否是 第一次 visible
    let init = true

    // 初始化，防止 运行动画
    useLayoutEffect(()=>{
        if(visible === false) {
            (maskDom.current).style.display = 'none'
        }
        init = false
    }, [])

    // 状态控制 显示
    useLayoutEffect(()=>{
        if(!init) return
        if(visible === true) {
            (maskDom.current).style.display = 'block'
        }
    }, [visible])

    // 动画结束，false none
    // 清除动画类
    function animationEnd(){
        maskDom.current?.classList.remove(...animationArray)
        if(visible === false) {
            (maskDom.current).style.display = 'none'
        }
    }

    // 根据 visible 返回动画 类名
    function resultAnimation() {
        return visible ? 'imitate-maskanimationIn' : 'imitate-maskanimationOut'
    }

    return <>
        {createPortal(
                <div
                    className={`imitate-mask ${resultAnimation()}`} 
                    ref={maskDom} 
                    onAnimationEnd={animationEnd} 
                    onTouchEnd={onCancel}></div>,
                body
        )}
    </>
}

const MaskChildren = function({children, visible, onCancel = ()=>{}}){
    return <>
        <Mask visible={visible} onCancel={onCancel} />
        {children}
    </>
}


export default MaskChildren