import React, {createRef, Component} from 'react'

class SliderImg extends Component{
    constructor(props){
        super(props)
        // 滑块图片 dom
        this.sliderImg = createRef()
        // 滑块
        this.sliderPuzzle = createRef()
        this.imgUrl = ''
        this.imgInstance = '' // 定义 imgInstance
        this.puzzlePostion = '' // 拼图缺口的位置
        this.random = 1 // 定义随机数，用于 img 更新
    }

    // 加载 img -> load - canvas
    initCanvas(){
        this.props.openSpin()
        const {w, h} = this.props.canvasSize
        // 定义尺寸
        this.sliderImg.current.width = w
        this.sliderImg.current.height = h
        this.sliderPuzzle.current.width = w
        this.sliderPuzzle.current.height = h
        // 随机位置
        this.puzzlePostion = this.generateRandom()
        this.props.getPuzzleX(this.puzzlePostion.x)
        // img generate
        const img = new Image()
        img.src = this.imgUrl + `?random=${this.random}`
        img.addEventListener('load', ()=>[
            this.drowSliderImg, 
            this.drowSliderPuzzle, 
            this.props.closeSpin
        ].forEach(fn=>fn()))
        this.imgInstance = img
    }

    // 绘制 canvas
    drowSliderImg = ()=> {
        const {x, y} = this.puzzlePostion
        if(!this.sliderImg.current) return;
        const imgCtx = this.sliderImg.current.getContext('2d')
        // 绘制图片
        imgCtx.drawImage(this.imgInstance, 0, 0)
        // 绘制蒙版
        this.drowPuzzlePath(imgCtx, x, y)
        imgCtx.fillStyle = 'rgba(0,0,0,0.6)'
        imgCtx.fill()
        // 绘制 描边
        imgCtx.lineWidth = 2
        imgCtx.strokeStyle = 'white'
        imgCtx.stroke()
    }

    drowSliderPuzzle = ()=> {
        const {x, y} = this.puzzlePostion
        if(!this.sliderPuzzle.current)return;
        const puzzleCtx = this.sliderPuzzle.current.getContext('2d')
        this.drowPuzzlePath(puzzleCtx, 0, y)
        puzzleCtx.fill()
        // 切边
        puzzleCtx.clip()
        puzzleCtx.drawImage(this.imgInstance, -x, 0)
        // 绘制 描边
        puzzleCtx.strokeStyle = 'white'
        puzzleCtx.lineWidth = 3
        puzzleCtx.stroke()
    }

    // 生成随机位置
    generateRandom = ()=>{
        const {puzzleSize, canvasSize} = this.props
        const initMove = {
            minH: 10,
            maxH: canvasSize.h - puzzleSize.h - 10,
            minW: canvasSize.w / 2,
            maxW: canvasSize.w - puzzleSize.w - 10
        }
        const {minH, minW, maxH, maxW} = initMove
        const moveX = Math.random() * (maxW - minW) + minW
        const moveY = Math.random() * (maxH - minH) + minH
        return {
            x: Number(moveX.toFixed(0)),
            y: Number(moveY.toFixed(0))
        }
    }

    // 绘制拼图
    drowPuzzlePath = (ctx, x, y)=>{
        const {w, h} = this.props.puzzleSize
        const sectionW = w / 3
        const sectionH = h / 3
        const wRadius = (0.19*w).toFixed(0)
        const hRadius = (0.19*h).toFixed(0)
        // 开始绘制 拼图
        ctx.beginPath()
        // 定义笔触
        ctx.moveTo(x, y)
        // top
        ctx.lineTo(x+sectionW, y)
        ctx.arcTo(x+ sectionW + sectionW/2 , y + sectionW, x + sectionW*2 , y, wRadius)
        ctx.lineTo(x+w, y)
        // right
        ctx.lineTo(x+w, y+sectionH)
        ctx.arcTo(x+ w + sectionH, y+sectionH+sectionH/2, x + w, y+sectionH*2, hRadius)
        ctx.lineTo(x+w, y+h)
        // bottom
        ctx.lineTo(x+sectionW*2, y+h)
        ctx.arcTo(x + sectionW + sectionW/2, y+h-sectionW, x+sectionW, y+h, wRadius)
        ctx.lineTo(x, y+h)
        // left
        ctx.lineTo(x, y)
    }

    // 重置
    reset = ()=>{
        // 清除 img
        this.imgInstance.removeEventListener('load', this.drowCanvas)
        this.imgInstance = null
        // 清除 canvas
        this.random += 1
        this.sliderImg.current.width = 0
        this.sliderImg.current.height = 0
        this.sliderPuzzle.current.width = 0
        this.sliderPuzzle.current.height = 0
        // 重新 绘制
        this.initCanvas()
    }

    componentDidMount(){
        const {w, h} = this.props.canvasSize
        this.imgUrl = `https://picsum.photos/${w}/${h}`
        this.initCanvas()
    }

    render(){
        const {move} = this.props
        return <>
            <canvas ref={this.sliderImg} />
            <canvas ref={this.sliderPuzzle} style={{left: `${move}px`}} />
        </>
    }
}

SliderImg.defaultProps = {
    move: 0,
    openSpin: ()=>{},
    closeSpin: ()=>{},
    getPuzzleX: ()=>{},
    canvasSize: {w:0, h:0},
    puzzleSize: {w:0, h:0}
}

export default SliderImg;