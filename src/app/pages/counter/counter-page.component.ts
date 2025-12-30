import {Component, signal} from '@angular/core'



@Component({
    templateUrl: `./counter-page.component.html`,

    styles:`
    button{
    padding:10px;
    margin: 5px, 10px;
    width:75px
    
    }
    `
})
export class CounterPageComponent{
counter =10;

counterSignal = signal(10)

constructor() {
    setInterval(() => {
    console.log('Tick');
    }, 2000);

}

aumentar(value:number) {
    this.counter += value;

}

decrementar(value:number) {
    this.counter -= value;
}
reset(){
    this.counter =10;
}
}
