import { Component, signal } from "@angular/core";

@Component({
    templateUrl: `./hero-page.component.html`
})

export class HeroPageComponent{
name = signal('Ironman') ;
age = signal('22');

getHeroDescription() {
return `${this.name()} - ${this.age()}`;
}
changeHero() {
this.name = signal('Spiderman ') ;
this.age = signal('22');
}

resetForm() {
this.name = signal('Ironman') ;
this.age = signal('52');
}
    
}