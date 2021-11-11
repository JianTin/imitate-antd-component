import React,{Component, createRef} from 'react';
import SliderCanvas from './SliderCanvas.jsx'
import {compatiblePcMobile} from '../assets'
import Mask from '../mask/index.jsx'

class SliderValidate extends Component {
    constructor(props){
        super(props)
        this.isMove = false // 由 isMove 决定事件move 是否要触发
        this.sliderMove = 0 // 需要移动的sliderMove
        this.startSlider ={
            clientX: 0,
            offsetX: 0
            // 点击时 slider 的信息
            // clientX 界面的触发位置
            // offsetX 距离outer的位置
        }
        this.sliderCanvasInstance = createRef()
        this.sliderMaxMove = 0 // 最长移动距离
        this.sliderType = '' // 显示的状态 info | success | error
        this.isInit = true // 是否是初始化，用于定义文字 显示
        this.isSpin = false // 是否是加载中
        this.puzzleX = '' // 缺口拼合的 x 位置
    }

    // 绑定事件
    componentDidMount(){
        document.addEventListener('touchmove', this.sliderMoveEvent, {passive: false})
        document.addEventListener('touchend', this.sliderUpEvent)
        document.addEventListener('mousemove', this.sliderMoveEvent)
        document.addEventListener('mouseup', this.sliderUpEvent)
        const {canvasSize, puzzleSize} = this.props
        this.sliderMaxMove = canvasSize.w - puzzleSize.w - 3
    }
    componentWillUnmount(){
        document.removeEventListener('touchmove', this.sliderMoveEvent)
        document.removeEventListener('touchend', this.sliderUpEvent)
        document.removeEventListener('mousemove', this.sliderUpEvent)
        document.removeEventListener('mouseup', this.sliderUpEvent)
    }

    // 点击滑块时
    sliderDownEvent =(e)=> {
        if(this.isSpin === true || this.sliderType === 'success') return;
        const handelInfo = compatiblePcMobile(e)
        const clientX = e.type.includes('mouse') ? handelInfo.clientX : handelInfo[0].clientX
        this.startSlider = {
            clientX,
            offsetX: e.target.offsetLeft
        }
        this.sliderType = 'info'
        this.isMove = true
        this.isInit = false
    }
    // 以下均在 document 绑定
    sliderMoveEvent =(e)=>{
        const {isMove, startSlider, sliderMaxMove} = this
        const {clientX, offsetX} = startSlider
        if(!isMove) return
        const handelInfo = compatiblePcMobile(e)
        const moveX = e.type.includes('mouse') ? handelInfo.clientX : handelInfo[0].clientX
        // 阻止浏览器翻页
        e.preventDefault()
        // 计算移动距离
        let move = moveX - clientX + offsetX
        if(move > sliderMaxMove) move = sliderMaxMove;
        if(move < 0) move = 0;
        this.sliderMove = move
        this.forceUpdate()
    }
    sliderUpEvent =(e)=> {
        // 是否触发过 move，没有则不能进入
        if(!this.isMove) return;
        this.isMove = false
        const isSuccess = this.validateSliderMove()
        if(isSuccess){
            this.sliderType = 'success'
            this.forceUpdate()
            this.props.onSuccess('success')
        } else {
            this.sliderType = 'error'
            this.forceUpdate()
            setTimeout(()=>{
                this.reset()
            }, 1000)
            this.props.onError('error')
        }
    }

    // 校验
    validateSliderMove =()=>{
        const {puzzleX, sliderMove} = this
        const min = puzzleX - 5
        const max = puzzleX + 5
        if(sliderMove >= min && sliderMove <= max) return true;
        return false
    }

    // 重置
    reset = ()=> {
        // 重置 图像
        this.sliderCanvasInstance.current.reset()
        // 重置正常属性
        this.sliderMove = 0
        this.sliderType = ''
        this.isInit = true
        // 更新
        this.forceUpdate()
    }

    // 开启 加载
    openSpin = ()=>{
        this.isSpin = true
        this.forceUpdate()
    }
    // 关闭 加载
    closeSpin = ()=>{
        this.isSpin = false
        this.forceUpdate()
    }
    // 获取 缺口的 x轴
    getPuzzleX = (x)=>{
        this.puzzleX = x
    }

    render(){
        const {sliderMove, sliderCanvasInstance, sliderType, isInit, isSpin} = this
        const {sliderDownEvent, openSpin, closeSpin, getPuzzleX} = this
        const {canvasSize, puzzleSize, sliderText, outerStyle} = this.props
        return <div className='sliderValidate-outer' style={{width: canvasSize.w + 'px', ...outerStyle}} >
            <div className='sliderValidate-img'>
                <Mask spin={true} visible={isSpin}>
                    <SliderCanvas move={sliderMove} ref={sliderCanvasInstance}
                        openSpin={openSpin} closeSpin={closeSpin} getPuzzleX={getPuzzleX}
                        canvasSize={canvasSize} puzzleSize={puzzleSize}
                    />
                </Mask>
            </div>
            <div className='sliderValidate-slider-outer' data-type={sliderType}>
                {
                    isInit && <div className='sliderValidate-slider-text'>{sliderText}</div>
                }
                <div className='sliderValidate-slider-bck' 
                    style={{width: `${sliderMove + 2}px`}} 
                    data-type={sliderType}
                ></div>
                <div className='sliderValidate-slider'
                    style={{left: `${sliderMove}px`, width: `${puzzleSize.w}px`}}
                    onTouchStart={sliderDownEvent}
                    onMouseDown={sliderDownEvent}
                    data-type={sliderType}
                ></div>
            </div>
        </div>
    }
}

SliderValidate.defaultProps = {
    onSuccess: ()=>{},
    onError: ()=>{},
    canvasSize: {
        w: 300,
        h: 150
    },
    puzzleSize: {
        w: 40,
        h: 40
    },
    sliderText: '向右滑动拼图',
    outerStyle: {}
}
export default SliderValidate