/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2019-12-19 11:24:32
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2019-12-19 15:57:38
 */
/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2019-12-19 11:24:32
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2019-12-19 11:25:34
 */
import { DepType, WatcherType } from "../types"


export default class Dep implements DepType {
    subs : WatcherType[]
    constructor() {
        this.subs =[]
    }
    addSub(sub: WatcherType) {
        this.subs.push(sub)
        console.log('示例中并没有做相同对象的判断'+this.subs)
    }
    removeSub(sub: WatcherType) {
        remove(this.subs,sub)
    }
    depend() {
        console.log(window.target)
        if (window.target) {   
            console.log(`我去添加依赖${window.target}啦`)
            this.addSub(window.target)
        }
    }
    notify() {
        // 数组深拷贝，也可用concat()
        const subs = this.subs.slice()
        // 通知依赖更新
        for (let i = 0; i < subs.length; i++){
            subs[i].update()
        }
    }

}

function remove(arr: WatcherType[], item: WatcherType) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}
