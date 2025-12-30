import { Component, signal} from "@angular/core";


interface Character{
    id:number;
    name:string;
    power:number;
    
}

@Component({
    templateUrl: './dragonball-page.component.html',

})
export class DragonballPageComponent{


    name = signal('')
    power = signal(0)

    characters = signal<Character[]>([
        {id: 1, name: 'Goku', power:9001},
     //  {id: 2, name: 'Piccolo', power:8001},
     //  {id: 3, name: 'Poppo', power:9000},
     //  {id: 4, name: 'Trunks', power:9767},
     //  {id: 5, name: 'Yamcha', power:455}



    ]);
    addCharacter() {
    if ( !this.name () || !this.power() || this.power() <0) {
        return;
        }
        const newCharacter: Character = {
        id: this.characters().length + 1,
        name: this.name(),
        power: this.power(),
        
        };

       this.characters.update((list) => [... list, newCharacter]); 
    
        this.resetFields();    
    }
  
    resetFields(){
        this.name.set('');
        this.power.set(0)
     }
    

}

