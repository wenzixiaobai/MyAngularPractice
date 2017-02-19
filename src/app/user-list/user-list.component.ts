import { Component, OnInit, Directive, ElementRef, HostListener, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

@HostListener('scroll') scrolling(){
    console.log('scrolling');
  }



  @HostListener('onClick', ['$event'])
  onClick($event: Event): void {
    console.log($event.srcElement.scrollLeft, $event.srcElement.scrollTop);
    // (event.srcElement.position
    // this.thead.style.left = this.tbody.scrollLeft * -1 + 'px';
    // for (let th of this.firstColumns) {
    //     th.style.left = this.tbody.scrollLeft + 'px';
    // }
  }
}
