import React, { createRef } from 'react'
import selectPng from '../image/xiala.png'

export default class DefaultSelect extends React.PureComponent {
    constructor(props){
        super(props)
        this.refSelect = createRef()
        this.refSearch = createRef()
        this.state = {
            searchVal: '' // input 显示的value
        }
        this.resizeObserver = null
    }

    componentDidMount(){
        // 监听元素变化
        const node = this.refSelect.current
        let oldHeight = 0
        const resizeObserver = new ResizeObserver(entries => {
            // 对该元素，高度不同时 变化
            const selectTitle = entries.find((item)=> item.target === node)
            const newHeight = selectTitle.contentRect.height
            if(newHeight !== oldHeight){
                oldHeight = newHeight
                this.getoptionPosition()
            }
        })
        resizeObserver.observe(node)
        this.resizeObserver = resizeObserver
    }

    componentWillUnmount(){
        this.resizeObserver.disconnect()
    }

    componentDidUpdate(){
        const {selectChildren, isOpen, type} = this.props
        // 当为关闭，type为搜索时。赋值选中的children
        if(!isOpen && type==='search') this.setState({searchVal: selectChildren})
    }

    // 获取 option 定位位置
    getoptionPosition = ()=> {
        const node = this.refSelect.current
        const {offsetTop, offsetLeft, offsetHeight, offsetWidth} = node
        this.props.resultPosition({
            left: offsetLeft,
            top: offsetTop + offsetHeight + 5,
            width: offsetWidth
        })
    }

    // 点击Select栏
    clickOuter = ()=> {
        const {toggelRunAnimation, type, isOpen, recoveryOptionArray} = this.props
        if(type === 'search' && isOpen) return
        if(type === 'search'){
            const inp = this.refSearch.current
            inp.focus()
            // 设置为空值，可以search 输入查找
            this.setState({searchVal: ''})
            // 恢复 原来的 数组
            recoveryOptionArray()
        }
        // search点击，options打开 不能关闭
        toggelRunAnimation()
    }

    // 失焦，options为打开 才可以关闭
    blurCloseOption=()=>{
        const {toggelRunAnimation, isOpen} = this.props
        if(isOpen) toggelRunAnimation()
    }
    
    // 搜索事件
    search=(event)=>{
        const {value} = event.target
        const {optionArray, resultOptionsArray, isOpen, toggelRunAnimation} = this.props
        const newArray = optionArray.filter((item)=> item.children.includes(value))
        // 搜索时，如果是关闭，那么打开option
        if(!isOpen) toggelRunAnimation()
        resultOptionsArray(newArray, value)
        this.setState({searchVal: value})
    }

    preventDefault = (event)=> {
        if(this.props.type === 'search') event.preventDefault()
    }

    render(){
        const {refSelect , refSearch, props, state, clickOuter, search, blurCloseOption, preventDefault} = this
        const {selectChildren, type} = props
        const {searchVal} = state
        return (
            <div className='imitate-select' ref={refSelect} tabIndex='-1' 
                                                                // 防止 inp.focus()时，触发blur事件
                onBlur={blurCloseOption} onClick={clickOuter}  onMouseDown={preventDefault}
                style={{cursor: type === 'search' ? 'text' : 'pointer'}}
            >
                {
                    // 通过 placeholder 来展示
                    type === 'search' && <input className='imitate-select-search' type='text' 
                        ref={refSearch} onChange={search} placeholder='search' value={searchVal}
                    />
                }
                {
                    type === 'default' && <span className='imitate-select-value'>{selectChildren}</span>
                }
                <img src={selectPng} />
            </div>
        )
    }
}