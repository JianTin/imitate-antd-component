import React, { cloneElement, FC, useRef } from "react";

// 超过三秒、不在同个移动点 不触发
const Touch = function ({ children, eventCall, extraOuterStyle}) {
  const startElement = useRef(null)
  const endTime = useRef(0)
  const client = useRef([0, 0])

  // 存储start时的元素
  function collectTstart(event) {
    startElement.current = event.target
    endTime.current = (new Date()).valueOf() + 1000 * 2
    const { clientX, clientY } = event.touches[0]
    client.current = [clientX, clientY]
  }

  function isCallEvent(event) {
    const { clientX, clientY } = event.changedTouches[0]
    const endElement = document.elementFromPoint(clientX, clientY)
    // 防止元素切换 不同
    // 对比超过时间么，超过了 不进去
    if (
      clientX !== client.current[0] || clientY !== client.current[1] ||
      endElement !== startElement.current ||
      (new Date()).valueOf() > endTime.current
    ) return;
    eventCall(event)
  }

  function result() {
    if(Array.isArray(children)) children = <div style={extraOuterStyle}>{children}</div>;
    // 后续处理
    // const isReactElement = isValidElement(children)
    // 不是react元素 / 是fragment 不做处理
    // if(!isReactElement || (children!.$$typeof ) !== Fragment) return children
    // 添加事件
    return cloneElement(children, {
      onTouchStart: collectTstart,
      onTouchEnd: isCallEvent
    })
  }
  return <>{result()}</>
}

export default Touch