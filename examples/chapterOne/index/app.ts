
/*
 * @name: defineProperty的介绍与使用 vue3使用 ES6的Proxy收集依赖
 * @Author: Haojin Sun
 * @Date: 2019-12-18 18:37:00
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2019-12-18 18:46:53
 */

let defineReactive = <T>(data: Object, key: string, val: T ): void => {
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
            return val
        },
        set: function (newVal) {
            console.log(val)
            console.log(newVal)
            if (val === newVal) {
                return
            }
            val = newVal
        }
    })
}

let defineReactiveValue = <T>(data: Object, key: string, val: T): void => {
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
        value: val,
        writable: true // 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。
    })
}

let data = {
    name: null
}
defineReactiveValue<string>(data, 'name', '321')
data.name = '3333'
console.log(data)