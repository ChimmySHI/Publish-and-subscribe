
	const eventProxy = {
        // onObj 存放多个监听事件的对象
        // oneObj 存放多个监听事件的对象,获取一次清空
        onObj: {},
        oneObj: {},
        //监听事件
        $on: function(key, fn) {
            // 当前请求事件在对象中是否存在
            //不存在 返回一个[]
            if (this.onObj[key] === undefined) {
                this.onObj[key] = [];
            }
            //将事件处理函数添加到对应的key
            this.onObj[key].push(fn);
        },
        $once: function(key, fn) {
    
            if (this.oneObj[key] === undefined) {
                this.oneObj[key] = [];
            }
    
            this.oneObj[key].push(fn);
        },
        // 移除事件监听
        $remove: function(key) {
            this.onObj[key] = [];
            this.oneObj[key] = [];
        },
        // 触发器或者发射器
        $emit: function() {
            let key, args;
    
            if (arguments.length == 0) {
                return false;
            }
    
            //trigger("update",data1,data2,data3)
    
            // 获取trigger函数的arguments，得到类数组
            // key 获取传参序列的第一项
            key = arguments[0]; //onObj[arguments[0]
            //类数组没有数组的slice,通过call改变this指向，让类数组继承数组的slice方法，完成截取功能
            args = [].concat(Array.prototype.slice.call(arguments, 1)); //data1,data2,data3
    
            // console.log(this.onObj[key][0]())
            if (this.onObj[key] !== undefined &&
                this.onObj[key].length > 0) {
                for (let i in this.onObj[key]) {
                    // console.log(args)
                    this.onObj[key][i].call(null, args);
                }
            }
            if (this.oneObj[key] !== undefined &&
                this.oneObj[key].length > 0) {
                for (let i in this.oneObj[key]) {
                    // null 继承 this.oneObj[key][i]函数并调用，参数是args
                    this.oneObj[key][i].apply(null, args);
                    // console.log(args)
                    this.oneObj[key][i] = undefined;
                }
                this.oneObj[key] = [];
            }
        }
    };
    eventProxy.$on("update", function(val) {
        console.log(val)
    })
    eventProxy.$once("update", function(val) {
        console.log(val)
    })
    eventProxy.$emit("update", 1, 2, 3)