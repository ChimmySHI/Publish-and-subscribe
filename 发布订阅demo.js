function Public(){
    //存放订阅者信息
    this.subscribers = [];
 
    //添加订阅者
    this.addSubscriber = function(subscriber){
 
      //保证一个订阅者只能订阅一次
      let isExist = this.subscribers.some(function(item){
        return item == subscriber;
      })
 
      if(!isExist){
        this.subscribers.push(subscriber);
      }
       
      return this;
    }
 
    //发布消息
    this.deliver = function(data){
      this.subscribers.forEach(function(fn){
        fn(data)
      })
 
      return this;
    }
  }

   //订阅者
let a =  function(data){
    //console.log(`订阅者a收到订阅信息：${data}`)
}
let b = function(data){
    //console.log(`订阅者b收到订阅信息：${data}`)
}
let c = function(data){
    //console.log(`订阅者c收到订阅信息：${data}`)
}

  //初始化
let publisher = new Public();
 
//添加订阅者
publisher.addSubscriber(a);
publisher.addSubscriber(b).addSubscriber(c);
 
//公众号发布消息
publisher.deliver('这是公众号推送的第1条新信息！'); 
publisher.deliver('这是公众号推送的第2条新信息！').deliver('这是公众号推送的第3条新信息！');


function Publics() {
  this.handlers = {};
}
Publics.prototype = {
    // 订阅事件
    on: function(eventType, handler){
        var self = this;
        if(!(eventType in self.handlers)) {
           self.handlers[eventType] = [];
        }
        self.handlers[eventType].push(handler);
        return this;
    },
     // 触发事件(发布事件)
    emit: function(eventType){
       var self = this;
       var handlerArgs = Array.prototype.slice.call(arguments,1);
        if(self.handlers[eventType]){
            for(var i = 0; i < self.handlers[eventType].length; i++) {
                self.handlers[eventType][i].apply(self,handlerArgs);
            }
        }
       
       return self;
    },
    // 删除订阅事件
    off: function(eventType, handler){
        var currentEvent = this.handlers[eventType];
        var len = 0;
        if (currentEvent) {
            len = currentEvent.length;
            for (var i = len - 1; i >= 0; i--){
                if (currentEvent[i] === handler){
                    currentEvent.splice(i, 1);
                }
            }
        }
        return this;
    }
};
 
var Publisher = new Publics();
 
//订阅事件a
Publisher.on('a', function(data){
   //console.log(1 + data);
});
Publisher.on('a', function(data){
   //console.log(2 + data);
});
 
//触发事件a
Publisher.emit('a', '我是第1次调用的参数');
 
Publisher.emit('b', '我是第2次调用的参数');　　

//a出现的次数
var s='asasADFGHadDfFFhjkMNJGBHGDsdfghjfghjkdfghjkl';
var n=(s.toLocaleLowerCase().split('a')).length-1;
console.log(n)

function patch(re,s){
    re=eval("/"+re+"/ig")
    return s.match(re).length;
}
var s = 'asasADFGHadDfFFhjkMNJGBHGDsdfghjfghjkdfghjkl';
console.log(patch('a',s)); //弹出2

/*这个字符串中的每个字每出现了多少次*/
var ary = "asasDFGHadDfFFhjkMNJGBHGDsdfghjfghjkdfghjkl";
var obj = {};
var i = 0;

ary1 = ary.toLocaleLowerCase(); //将字符串转为小写

for(let i of ary1){
    key = i;
    if(obj[key])
    {
        //对象中有这个字母
        obj[key]++;
    }
    else
    {
        //对象中没有这个字母,把字母加到对象中
        obj[key] = 1;
    }
}

for(var key in obj) //遍历这个对象
{
    //console.log(key + "这个字母出现了" + obj[key] + "次");
}