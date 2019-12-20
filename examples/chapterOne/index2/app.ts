/*
 * @name: 创建dep类  解耦
 * @Author: Haojin Sun
 * @Date: 2019-12-18 19:07:06
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2019-12-18 19:09:53
 */
import Dep from "../../../src/core/Dep"
import Watcher from "../../../src/core/Watcher"
import {DataType} from "../../../src/types"
function defineReactive<T>(data: Object, key: string, val: T) {
    let dep = new Dep()
    Object.defineProperty(data, key, {
        // 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。
        enumerable: true,
        // 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
        configurable: true,
        /**对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。
         * 数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。
         * 存取描述符是由getter-setter函数对描述的属性。
         * 描述符必须是这两种形式之一；不能同时是两者。
         */
        get: function () {
            // 获取属性时 收集依赖
            console.log('我被获取啦')
            dep.depend()
            return val
        },
        set: function (newVal) {
            if (val === newVal) {
                return
            }
            console.log('我被设置啦')
            // 设置属性时  通知依赖更新
            val = newVal
            dep.notify()
        }
    })
}


let data : DataType= {
    name: {
        x: ''
    }
}



defineReactive(data.name, 'x', '123')
let dom = document.createElement('div')
let watch = new Watcher(data, 'name.x', function (oldValue, newValue) {
    console.log(oldValue)
    console.log(newValue)
})
console.log('---下方监听变量-----')
data.name.x = '231'