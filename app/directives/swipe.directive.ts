import { Directive, ElementRef, OnInit , Input } from '@angular/core';

@Directive({ 
  selector: '[swipe]' 
})
export class SwipeDirective  implements OnInit {
  slider : any ;
  @Input() imgsLen : number;
  @Input() swipeList : string;
  @Input() swipeText : string;

  constructor(private elemt: ElementRef ) {}

  ngOnInit(){
    let self = this.elemt.nativeElement;
    if ( this.imgsLen > 1 ) {
      this.slider = new Slider(self.querySelector(this.swipeList) ,this.imgsLen , 0 , self ,self.querySelector(this.swipeText));
    }
  }
}
/*******************
 *
 *  图片滑动特效
 *
 */
class Slider {
  private scaleW : number;
  private idx : number;
  private startTime : number;
  private startX : number;
  private offsetX : number;
  private target : any;

  constructor( private wrap : any , 
               private len : number , 
               private pre : number,
               private box : any ,
               private num : any
               ){
    //初始化容器
    this.init();
    //绑定事件
    this.bindDOM();
    //初始化位置
    this.goIndex(0);
  }
  /*********
 * 初始化滑动特效容器
 */
  init(){
    if ( typeof window.getComputedStyle != 'undefined') {//w3c
      this.scaleW = parseInt(window.getComputedStyle(this.box , null)['width']);
    }
    this.idx = 0;
    // console.log(this.num , this.wrap);
    this.num.innerHTML = this.idx+1+'/'+this.len;
  }
  /******
 * 绑定图片滑动事件
 */
  bindDOM(){
    let self = this;
    let scaleW = self.scaleW;
    let outer = this.wrap;
    let len = this.len;
    //手指按下
    let startHandler = function(evt:any) {
      self.startTime = Date.now();
      self.startX = evt.touches[0].pageX;
      self.offsetX = 0;
      let target = evt.target;
      while( target !== outer && target.nodeName != 'BODY' ){
        target = target.parentNode;
      }
      self.target = target;
    };
    //手指移动
    let moveHandler = function(evt:any) {
      // evt.preventDefault();
      self.offsetX = (evt.targetTouches[0].pageX - self.startX)+self.scaleW*self.pre;
      outer.style.webkitTransition = '-webkit-transform 0s ease-out';
      let transW = self.offsetX-self.idx*self.scaleW*(1-self.pre*2);
      outer.style.webkitTransform = 'translate3d('+ transW +'px, 0, 0)';
      outer.style.transform = 'translate3d('+ transW +'px, 0, 0)';
    };
    //手指离开
    let endHandler = function(evt:any){
      let boundary = scaleW/6;
      let endTime = Date.now();
      //手指滑动
      let num_now = self.idx+1;
      // console.log(self.num , self.idx);
      if ( endTime - self.startTime > 300 ) {
        if ( self.offsetX >= boundary ) {
          self.goIndex('-1');
          if (num_now > 1 )
            self.num.innerHTML = num_now-1+'/'+self.len;
        }else if ( self.offsetX < 0 && self.offsetX < -boundary ) {
          self.goIndex('+1');
          if ( num_now < len )
            self.num.innerHTML = num_now+1+'/'+self.len;
        }else {
          self.goIndex('0');
        }
      }else{//快速切换
        if ( self.offsetX > 20 ) {
          self.goIndex('-1');
          if (num_now > 1 )
            self.num.innerHTML = num_now-1+'/'+self.len;
        }else if ( self.offsetX < -20 ) {
          self.goIndex('+1');
          if ( num_now < len )
            self.num.innerHTML = num_now+1+'/'+self.len;
        }else {
          self.goIndex('0');
        }
      }
    };
    
    outer.addEventListener('touchstart', startHandler);
    outer.addEventListener('touchmove', moveHandler);
    outer.addEventListener('touchend', endHandler);
  }
  /****************
    图片滑动动作
  */
  goIndex(n:any){
    let idx = this.idx;
    let len = this.len;
    let outer = this.wrap;
    let cidx;
    /**********
      边界值检测
    **/
    if ( typeof n == 'number' ) {
      cidx = idx;
    }else if ( typeof n == 'string' ) {
      cidx = idx + (+n);
    }
    if ( cidx > len-1 ) {
      cidx = len - 1;
    } else if ( cidx < 0 ) {
      cidx = 0;
    }
    this.idx = cidx;
    outer.style.webkitTransition = '-webkit-transform 0.2s ease-out';
    outer.style.transition = 'transform 0.2s ease-out';
    let  transW = (this.idx*this.scaleW*(1-this.pre*2));
    let dir = this.idx === 0 ? 1 : -1;
    if (this.idx === 0 ){
      transW = this.scaleW*this.pre;
    }else {
      transW -= this.scaleW*this.pre;
    }
    outer.style.webkitTransform = 'translate3d('+transW*dir+'px, 0, 0)';
    outer.style.transform = 'translate3d('+transW*dir+'px, 0, 0)';
  };
}
