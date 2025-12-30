import { Component, inject, signal} from "@angular/core";
import { CharacterListComponent } from "../dragonball/character-list/character-list";
import { CharacterAdd } from "../dragonball/character-add/character-add";
import { DragonballService } from "../../services/dragonball.service";

interface Character{
    id:number;
    name:string;
    power:number;
    
}

@Component({
    templateUrl: './dragonball-super-page.component.html',
    selector: 'dragonball-super',
    imports: [CharacterListComponent, CharacterAdd],
})
export class DragonballSuperPageComponent{    
        public dragonballService = inject(DragonballService);
        
      }
    

