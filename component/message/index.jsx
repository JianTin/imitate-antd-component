import React, { useEffect } from 'react'
import {render} from 'react-dom'
import err from './image/ava_error.png'
import success from './image/color-success.png'
import info from './image/info.png'
import warning from './image/warning.png'
// outer Message
let messageOuter = null
// 动画时间
const animationDuration = 500
const messageObj = {
  info: type(info),
  error: type(err),
  warming: type(warning),
  success: type(success),
  config: deleteMessage
}
// 用户可以定义的类型
const defaultProps = {
  content: '',
  duration: 4000,
  img: ''
}
// 确定类型
function type(typeImg){
  return (options={}) => {
    const newOptions = Object.assign({} ,defaultProps, {img: typeImg}, options)
    return createMessage(newOptions)
  }
}

// 删除
function deleteMessage(prentDom){
  // 判断是否存在，存在则删除
  if(messageOuter.contains(prentDom) && !(prentDom.e)){
    // 防止重复删除
    prentDom.e = true
    const messageElement = prentDom.firstChild
    messageElement.classList.add('imitate-message-Out')
    setTimeout(()=>messageOuter.removeChild(prentDom), animationDuration)
  }
}

// 生成外层 outer
function createMessageOuter(){
    messageOuter = document.createElement('div')
    messageOuter.className = 'imitate-message-root'
    document.body.appendChild(messageOuter)
}

// 渲染 message
function Message({parentDom, options}){
  const {content, duration, img} = options
  // 删除
  useEffect(()=>{
    setTimeout(()=>{
      deleteMessage(parentDom)
    }, duration)
  }, [])
  return <div className={`imitate-message-item imitate-message-In`}>
    <div className='imitate-message-icon'> <img src={img} /> </div>
    <div className='imitate-message-content'>{content}</div>
  </div>
}

// 生成 message
function createMessage(options){
  if(!messageOuter) createMessageOuter()
  // react 容器
  const reactBox = document.createElement('div')
  // 容器 添加进 outer
  messageOuter.appendChild(reactBox)
  // 往容器 渲染reactDom
  render(<Message parentDom={reactBox} options={options} />, reactBox)
  // 返回容器，允许进行删除
  return reactBox
}
export default messageObj