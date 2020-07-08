export const addTodo=(text)=>{
    return {
        type:'CHANGENUM',
        text:text
    }
}
export const changeName=(text)=>{
    return {
        type:'CHANGENAME',
        value:text
    }
}
export const addNum=()=>{
    return {
        type:'ADDNUM',
        value:1
    }
}