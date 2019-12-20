/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2019-12-19 15:42:56
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2019-12-19 19:44:32
 */
interface Window {
  target: WatcherType;
}

// 在.d.ts 文中中引用其他文件报错  要有两个WatcherType 怎么解决
interface WatcherType{
  vm: Object
  cb: Function
  value: any
  getter: Function
  get(): any
  update(): void
}