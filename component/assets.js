// 管理index

export let messageIndex  = 10000;
let index = 1000;

export function getIndex(){
    index = index+1
    return index
}

export function resultChildrenArr(){
    const {children} = this.props
    return Array.isArray(children) ? children : [children]
}

// 兼容 mouse和touch
export function compatiblePcMobile(event){
    const {type} = event
    // 获取特定的属性
    const getKeyArray = ['target', 'clientX', 'clientY', 'pageX', 'pageY', 'screenX', 'screenY']
    function getAssetsAttribute(event){
        return getKeyArray.reduce((prev, key)=>{
            let val = event[key]
            const tarsformVal = Number(val)
            if(typeof tarsformVal === 'number' && !isNaN(tarsformVal)) val = tarsformVal.toFixed(0) ;
            prev[key] = val;
            return prev
        }, {})
    }
    // 根据事件类型 获取，touch 可能有多个
    return type.includes('mouse') ? getAssetsAttribute(event) 
    :
    Array.from(event.targetTouches)
        .map(touchEvent=> getAssetsAttribute(touchEvent))
}