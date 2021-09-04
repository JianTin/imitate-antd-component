import React,{createRef} from 'react'
import {createPortal} from 'react-dom'
import Button from '../button/index.jsx'
import {Touch} from '../index'
import {getIndex} from '../assets'

function RenderModal(Modal){
    return class extends React.PureComponent {
        constructor(props){
            super(props)
            this.init = false
        }
        static defaultProps = {
            title: '', // title
            visible: null, // 组件隐藏 显示
            footer: true, // modal footer 是否显示
            cancelEvent: ()=>{}, // 点击 close / mask / 取消会触发的事件
            okEvent: ()=>{}, // 点击确认
            afterClose: ()=>{}, // Modal完全关闭后的回调
            destroyOnClose: false, // 关闭时销毁，默认不销毁
            centered: false, // 是否居中
            mask: true, // 蒙版 是否显示
            maskClosable: true, // 蒙版点击，是否触发 cancel 事件
            modalStyle: {}, // modal 样式
            maskStyle: {}, // 遮罩样式
            okText: '确定',
            cancelText: '取消',
            getContainer: document.body // 默认渲染到body下
        }
        // 渲染 dom 元素的设置
        setContainerPosition(){
            const {getContainer} = this.props
            const defaultContainer = document.body
            // 添加 position  迫使可以将 modal渲染进去
            if(defaultContainer !== getContainer){
                const position = getContainer.style.position
                getContainer.style.position = position ? position : 'relative'
            }
        }
        render(){
            const {visible, getContainer} = this.props
            // 当传visible才会渲染
            // 防止触发 Modal componentDidMount 等渲染
            if(typeof visible !== 'boolean' || !getContainer) return null
            // visible 为 true，才能做初始化渲染
            if(visible === true) this.init = true
            if(this.init === false) return null
            this.setContainerPosition()
            return <Modal {...this.props} />
        }
    }
}

class Modal extends React.PureComponent {
    constructor(props){
        super(props)
        // 设置当前的 index
        this.index = getIndex()
        this.rootRef = createRef()
    }

    // 通过 虚拟DOm对比。来要求渲染新元素
    isDestroyContent = ()=>{
        const {destroyOnClose, visible, children} = this.props
        if(destroyOnClose && !visible) return null
        return children
    }

    // mask 点击，是否允许触发cancel
    maskClick = ()=> {
        const {maskClosable, cancelEvent} = this.props
        if(maskClosable) cancelEvent()
    }

    // 返回动画的class
    resultAnimationCss = ()=>{
        const {visible} = this.props
        return {
            maskAnimation: visible ? 'imitate-modal-maskIn' : 'imitate-modal-maskOut',
            modalAnimation: visible ? 'imitate-modal-In' : 'imitate-modal-Out'
        }
    }

    // 获取 modal 显示 相关参数
    getModalShowAssets = ()=> {
        const {visible} = this.props
        const modalRoot = this.rootRef.current
        return {visible, modalRoot}
    }

    // 动画结束 && visible === false
    // 为false root.dispaly = none 关闭
    // 解绑 esc 事件
    AnimationEndModal = ()=>{
        const {modalRoot, visible} = this.getModalShowAssets()
        const {afterClose} = this.props
        if(!visible){
            afterClose()
            modalRoot.style.display = 'none'
        }
    }

    // visible 为true 显示  root.dispaly = block 开启
    // 不处理 visible 为 false，会影响到 动画
    // 绑定 esc 事件
    componentDidUpdate(){
        const {modalRoot, visible} = this.getModalShowAssets()
        modalRoot.style.display = visible && 'block'
    }

    render(){
        const {resultAnimationCss, props, AnimationEndModal, isDestroyContent, maskClick, index} = this
        const {maskAnimation, modalAnimation} = resultAnimationCss()
        const {cancelEvent, title, footer, okEvent, mask, centered, modalStyle, 
            maskStyle, okText, cancelText, getContainer } = props
        const Element = (
        <div className='imitate-modal-root' ref={this.rootRef} style={{zIndex: index}}>
            {/* 蒙版 */}
            { mask &&  
                <Touch eventCall={maskClick}>
                    <div className={`imitate-modal-mask imitate-moda-animationDuration ${maskAnimation}`}
                        onClick={maskClick} style={maskStyle}
                    ></div>
                </Touch>
            }
            { /* modal */ }
            <div className={`imitate-modal-outer imitate-moda-animationDuration ${modalAnimation}`} onAnimationEnd={AnimationEndModal} 
                centered={centered?'true':null} style={modalStyle}
            >
                { /* cancel */ }
                <Touch eventCall={cancelEvent}>
                    <div className='imitate-modal-cancel' onClick={cancelEvent}> <a>x</a> </div>
                </Touch>
                {/* title */ }
                {title && <div className='imitate-modal-title'>{title}</div>}
                { /* content */ }
                <div className='imitate-modal-content'> { isDestroyContent() } </div>
                {
                    footer && 
                    <div className='imitate-modal-footer'>
                        <Button onClick={cancelEvent}>{cancelText}</Button>
                        <Button type='primary' onClick={okEvent}>{okText}</Button>
                    </div>
                }
            </div>
        </div>)
        return createPortal(Element, getContainer)
    }
}

export default RenderModal(Modal)