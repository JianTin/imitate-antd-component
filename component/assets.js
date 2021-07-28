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