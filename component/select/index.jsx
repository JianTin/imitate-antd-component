import React,{Children, createRef} from 'react'
import {resultChildrenArr} from '../assets.js'
import {ExhibitSelect, OptionsList} from './ui/index.js'

export default class Select extends React.PureComponent {
    constructor(props){
        super(props)
        this.refOptions = createRef()
        this.state = {
            selectValue: null, // 选择的 value
            optionArray: null, // option数据数组
            searchOptionArray: null,
            selectChildren: '', // 选择的 children
            // 后续会拿到 {left, height, width}
            optionPosition: {},
            isOpen: false
        }
        this.resultChildrenArr = resultChildrenArr.bind(this)
    }
    static defaultProps = {
        defaultValue: null,
        value: null,
        onChange: null, // (value)=>{}
        type: 'default', // search / default
        onSearch: null, // (searchArray, searchVal)=>{}
    }
    // 展示的selectValue
    componentWillMount(){
        this.getChildren()
    }
    componentDidUpdate(){
        const {props, state, changOptionState, resultChildrenArr, getChildren} = this
        const {value} = props
        const {selectValue, optionArray} = state
        // 由 props.value 来控制，当不一样时。更新
        if(value && selectValue !== value) changOptionState(value)
        // 当option 数量变换时。重新渲染
        if(resultChildrenArr().length !== optionArray.length) getChildren()
    }


    // 获取 childrenProps
    getChildren = ()=>{
        const childrenArr = this.resultChildrenArr()
        const optionArray = Children.map(childrenArr, (option)=> option.props)
        this.setState({
            optionArray,
            searchOptionArray: optionArray
        }, this.initState)
    }
    // initState children
    initState = () =>{
        const {defaultValue, value} = this.props
        let selectValue = value ? value : defaultValue
        this.changOptionState(selectValue)
    }
    // 获取 option 定位位置
    resultPosition = (optionPosition)=> {
        this.setState({optionPosition})
    }
    
    // 点击option
    clickOption = (event)=> {
        const {value: optionvalue} = event.target.attributes.optionvalue
        const {value, onChange, type} = this.props
        // 触发更改的 chang事件
        if(onChange) onChange(optionvalue)
        // 当value为空，那么就由 内部来控制
        if(!value) this.changOptionState(optionvalue)
        // 关闭下拉框
        this.toggelRunAnimation()
    }
    // 更改option 相关state
    changOptionState = (selectValue)=>{
        const {optionArray} = this.state
        // 得到option对象
        const selectProps = optionArray.find((item)=> item.value === selectValue)
        if(!selectProps) return
        const {value, children} = selectProps
        this.setState({
            selectValue: value,
            selectChildren: children
        })
    }
    // search 情况下，触发的搜索功能
    resultOptionsArray = (array, searchVal)=> {
        const {onSearch} = this.props
        this.setState({
            searchOptionArray: array
        })
        if(onSearch) onSearch(array, searchVal)
    }
    // 回复原先的数组
    recoveryOptionArray = ()=> {
        this.setState({
            searchOptionArray: this.state.optionArray
        })
    }

    // 动画
    // 返回options 相关attribute
    getOptionDomAttribute = ()=> {
        const {classList, style} = this.refOptions.current
        return {
            classList,  style
        }
    }
    // select动画运行
    toggelRunAnimation = ()=>{
        const {classList, style} = this.getOptionDomAttribute()
        let {isOpen} = this.state
        isOpen = !isOpen
        // 每次去除
        classList.remove('imitate-select-out', 'imitate-select-in')
        if(isOpen){
            classList.add('imitate-select-in')
            style.display = 'block'
        } else {
            classList.add('imitate-select-out')
        }
        this.setState({isOpen})
    }
    // 当 option动画结束时, isOpen === false。那么设置 none 
    optionsAnimationEnd = ()=> {
        const {style} = this.getOptionDomAttribute()
        if(!this.state.isOpen) style.display = 'none'
    }

    render(){
        const {state, props, refOptions, clickOption, toggelRunAnimation, optionsAnimationEnd, 
            resultPosition, resultOptionsArray, recoveryOptionArray} = this
        const {selectValue, optionPosition, optionArray, searchOptionArray, selectChildren, isOpen} = state
        const {type} = props
        return(
            <>
                <ExhibitSelect toggelRunAnimation={toggelRunAnimation}
                    selectChildren={selectChildren} resultPosition={resultPosition} 
                    type={type} isOpen={isOpen} optionArray={optionArray}
                    resultOptionsArray={resultOptionsArray} recoveryOptionArray={recoveryOptionArray}
                />
                <OptionsList optionArray={optionArray} searchOptionArray={searchOptionArray} clickOption={clickOption} 
                    ref={refOptions} optionsAnimationEnd={optionsAnimationEnd} selectValue={selectValue} 
                    optionPosition={optionPosition} type={type}
                />
            </>
        )
    }
}

Select.Option = class Option extends React.Component {
    render(){
        return null
    }
}