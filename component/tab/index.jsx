import React,{PureComponent, Component,Children as ChildrenFN, createRef} from 'react'
import {resultChildrenArr} from '../assets'

export default class Tab extends PureComponent {
    constructor(props){
        super(props)
        this.listRef = createRef() // 存储list，用于获取 子元素的 offerLeft 和 width
        this.storePosition = ''
        this.state = {
            tabItem: [], // 渲染的列表
            currentChildren: '', // 当前展示的 children
            selectKey: '', // 每次更改 储存 selectKe
            barStyle: {
                // top / bottom
                offsetLeft: '',
                clientWidth: '', // 可能是bar的为top、bottom 的长度。也可能只是left、right的2px
                // left / right
                offsetTop: '',
                clientHeight: ''
            }
        }
        this.resultChildrenArr = resultChildrenArr.bind(this)
    }
    static defaultProps = {
        defaultKey: '', // 默认 key
        activeKey: '', // 当前选择的key > defaultKey
        onChange: ()=>{}, // 更改标签时触发
        onClick: ()=>{}, // 点击标签时触发
        tabPosition: 'top', // 位置
        extraTabLeft: null,// 额外元素
        extraTabRight: null,// 额外元素
        inkStyle: {}, // 标识的style
        barItemStyle: {} // itemStyle
    }
    componentWillMount(){
        this.storePosition = this.props.tabPosition
        this.initGetChildrenList()
    }
    componentDidUpdate(){
        const {props, state, resultChildrenArr, changSelectTab, initGetChildrenList, storePosition} = this
        const {activeKey, tabPosition} = props
        const {selectKey, tabItem} = state
        const listLength = resultChildrenArr().length
        // activeKey有，并且 内部和外部的 key 不同，更新
        if(activeKey && activeKey !== selectKey){
            changSelectTab(activeKey)
        }
        // position 不一样，使用存储的selectKey更新
        if(storePosition!== tabPosition ){
            this.storePosition = tabPosition
            changSelectTab(selectKey)
        }
        // 数量不同 更新
        if(listLength !== tabItem.length){
            initGetChildrenList()
        }
    }

    // 获取children，对children做操控
    initGetChildrenList = ()=>{
        const {initSelect, resultChildrenArr} = this
        let list = resultChildrenArr()
        let tabItem = []
        ChildrenFN.forEach(list ,({key, props})=>{
            // 拿到 TabPane 的key、tab、children
            const obj = Object.assign({key}, props)
            tabItem.push(obj)
        })
        this.setState({tabItem}, initSelect)
    }

    // 获取初始化的 children
    initSelect = ()=> {
        const {defaultKey, activeKey} = this.props
        const {tabItem} = this.state
        // 以 activeKey 为准
        // 如果没提供 activeKey 和 defaultKey，默认第一个
        let currentKey = activeKey ? activeKey : defaultKey
        currentKey = currentKey ? currentKey : tabItem[0].key
        // 提供了，activeKey 调用方法
        this.changSelectTab(currentKey)
    }

    // clickTab
    tabClick = (event)=>{
        const key = event.target.id
        // 有activeKey 就不需要触发 更改select事件
        // key 和 selectKey 一样，那么不需要触发
        const {activeKey, onClick} = this.props
        const {selectKey} = this.state
        if(!activeKey && key !== selectKey) this.changSelectTab(key)
        onClick(key, event)
    }

    // 更改 选择的tab
    changSelectTab = (newKey) => {
        const {tabItem} = this.state
        const {activeKey, onChange} = this.props
        // 选中的 selectIndex
        let selectIndex = ''
        let selectKey = ''
        // 以 activeKey 为主
        newKey = activeKey ? activeKey : newKey
        const selectTab = tabItem.find(({key}, index)=>{
            selectIndex = index
            selectKey = key
            return newKey === key 
        })
        // ink 移动
        // 以及 children 切换
        if(selectTab){
            onChange(newKey)
            this.setState({currentChildren: selectTab.children, selectKey})
            this.animationBar(selectIndex)
        }
    }

    // 更改bar的距离
    animationBar=(index)=>{
        const {tabPosition} = this.props
        const node = this.listRef.current.childNodes[index]
        const {clientWidth, offsetLeft, clientHeight, offsetTop} = node
        let barStyle = ''
        // 定义不同方向的 bar 如何设置
        switch(tabPosition){
            case 'left' :
            case 'right':
                barStyle = {
                    clientHeight,
                    offsetTop,
                    clientWidth: '2px',
                    offsetLeft: ''
                }
            break;
            case 'top' :
            case 'bottom':
                barStyle = {
                    clientHeight: '2px',
                    offsetTop: '',
                    clientWidth,
                    offsetLeft
                }
            break;
        }
        this.setState({ barStyle })
    }

    render(){
        const {state, tabClick, listRef, props} = this
        const {tabPosition, extraTabLeft, extraTabRight, inkStyle, barItemStyle} = props
        const {currentChildren, tabItem, barStyle, selectKey} = state
        const {offsetLeft, clientWidth, offsetTop, clientHeight} = barStyle
        return <>
            <div className={`imitate-tab imitate-tab-${tabPosition}`}>
                <div className='imitate-tab-header'>
                    {extraTabLeft}
                    <div className='imitate-tab-list' onClick={tabClick} ref={listRef}>
                        {
                            tabItem.map(({key, tab})=>
                                <div className={`imitate-tab-item ${selectKey === key && 'imitate-tab-item-active'}`} 
                                    style={barItemStyle}
                                    key={key} id={key}
                                >
                                    {tab}
                                </div>
                            )
                        }
                    </div>
                    {extraTabRight}
                    <div className='imitate-tab-ink-animated'
                        style={{width: clientWidth, left:offsetLeft, height: clientHeight, top: offsetTop, ...inkStyle}}
                    ></div>
                </div>
                <div className='imitate-tab-body'>
                    {currentChildren}
                </div>
            </div>
        </>
    }
}

Tab.TabPane = class extends Component {
    render(){
        return <></>
    }
}