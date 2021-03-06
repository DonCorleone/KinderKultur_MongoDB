import { Component, OnInit } from '@angular/core';

import { ThingService } from './../../core/services/thing-data.service';
import { Thing } from './../../models/thing';

@Component({
    selector: 'app-home-component',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

    public message: string;
    public things: Thing[] = [];
    public thing: Thing = new Thing();

    constructor(private dataService: ThingService) {
        this.message = 'kinderkultur.ch 2.0';
    }

    ngOnInit() {
        this.getAllThings();
    }

    public addThing() {
        this.dataService
            .add(this.thing)
            .subscribe(() => {
                this.getAllThings();
                this.thing = new Thing();
            }, (error) => {
                console.log(error);
            });
    }

    public deleteThing(thing: Thing) {
        this.dataService
            .delete(thing.id)
            .subscribe(() => {
                this.getAllThings();
            }, (error) => {
                console.log(error);
            });
    }

    private getAllThings() {
        this.dataService
            .getAll()
            .subscribe(
            data => this.things = data,
            error => console.log(error),
            () => console.log('Get all complete')
            );
    }
}
