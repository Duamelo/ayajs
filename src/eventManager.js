/**
 * @class EventManager
 */
 class EventManager
 {
      constructor(){
  
          this.events = [];
      }
  
      add(target, event, callback){
          this.events.push([target, event, callback]);
      }
  
      clear(){
          this.destroy();
          this.events = [];
      }
  
      destroy(){
          for(var i = 0; i < this.events.length; i++)
          {
              var event = this.events[i];
              event[0].removeEventListener(event[1], event[2]);
          }
      }
  
      create(){
          for(var i = 0; i < this.events.length; i++)
          {
              var event = this.events[i];
              event[0].addEventListener(event[1], event[2]);
          }
      }
 }
 export {EventManager};