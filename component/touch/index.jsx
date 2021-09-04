import React,{cloneElement, isValidElement, Fragment} from "react";

const Touch = function({children, eventCall}){
    let startElement= null

    // 存储start时的元素
    function collectTstart(event){
        startElement = event.target
    }

    function isCallEvent(event){
        const {clientX, clientY} = event.changedTouches[0]
        const endElement = document.elementFromPoint(clientX, clientY)
        // 如果start 和 end 元素不一样时，不做触发
        if(endElement === startElement){
            eventCall(event)
        }
    }

    function result(){
        // 后续处理
        const isReactElement = isValidElement(children)
        // 不是react元素 / 是fragment 不做处理
        // if(!isReactElement || (children.$$typeof) !== Fragment) return children
        console.dir(children)
        // 添加事件
        return cloneElement(children, {
            onTouchStart: collectTstart,
            onTouchEnd: isCallEvent
        })
    }
    return <>{result()}</>
}

export default Touch