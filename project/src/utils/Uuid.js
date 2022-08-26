import { v4 as uuidv4 } from 'uuid';
//生成一个随机字符串，当作游客ID，游客身份本地持久保存
export  const getUuid = ()=>{
    //看一下本地有没有uuid
    let get_uuid = localStorage.getItem('UUID')
    //没有
    if(!get_uuid){
        //生成一个
        get_uuid = uuidv4()
        //进行本地保存
        localStorage.setItem('UUID',get_uuid)
    }
    return get_uuid
}