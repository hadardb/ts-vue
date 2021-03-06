/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2019-12-18 19:40:59
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2019-12-20 09:50:01
 */

export interface DepType {
    subs: WatcherType[]
    addSub(sub: WatcherType): void
    removeSub(sub: WatcherType): void
    depend(): void
    notify(): void
}



export interface DataType extends Object{
    [propName: string]: any
}


