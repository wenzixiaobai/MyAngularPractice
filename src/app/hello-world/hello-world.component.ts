import { Component, OnInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

@HostListener('scroll', ['$event'])
onScroll(event: Event): void {
    // this.thead.style.left = this.tbody.scrollLeft * -1 + 'px';
    // for (let th of this.firstColumns) {
    //     th.style.left = this.tbody.scrollLeft + 'px';
    // }
}

}
