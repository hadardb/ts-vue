/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2019-12-19 13:47:13
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2019-12-19 13:47:37
 */
import { DataType } from "../types"

export default class Watcher {
    vm: Object
    cb: Function
    value: any
    getter: Function

    constructor(vm: Object, expOrFn: string, cb: Function) {
        this.vm = vm
        this.getter = parsePath(expOrFn)!
        this.cb = cb
        this.value = this.get()
    }
    get() {
        let value
        if (this.getter != null) {
            window.target = this
            value = this.getter.call(this.vm, this.vm)
            window.target = undefined!
            
        }
        return value

    }
    update():void {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
}

const bailRE = /[^\w.$]/
function parsePath(path: string): Function | null {
    console.log('bailRE.test(path):' + bailRE.test(path))
    if (bailRE.test(path)) {
        return null
    }
    console.log('path:' + path)
    const segments = path.split('.')
    return function (obj: DataType) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            // 在obj对象上获取 path属性
            console.log('触发两遍，但是get set只触发一遍是因为只监听了一个属性')
            obj = obj[segments[i]]
        }
        console.log('输出obj：'+obj)
        return obj
    }
}