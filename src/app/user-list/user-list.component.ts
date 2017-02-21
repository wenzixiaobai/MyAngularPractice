import { Component, ViewEncapsulation, ElementRef, OnInit, OnDestroy, AfterViewInit, AfterContentChecked, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserListLayout } from '../utils/userListLayout';

export class MyMilking {
  public allocations: Allocation[] = [];
  public ctbStats: MilkingStatsItem[] = [];
  public draftStats: MilkingStatsItem[] = [];

  constructor(public id: number, public session: string, public bailCount: number,
    public herdCount: number, public allocatedCount: number, data: any[]) {

    this.allocations = data;
  }
}

export class Allocation {
  public isUnknown: boolean;
  public isUnlinked: boolean;
  public time: string;

  constructor(public animal: string, public bail: number) { };
}

export class MilkingStatsItem {
  public title: string;
  public value: number;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit, AfterViewInit, AfterContentChecked {
  bodyHeight: number = 750;
  summaryPadding: number = 0;
  summaryDiv: number = 0;
  summaryTh: number = 0;
  summaryThWidth: number = 0;
  contendHeight: number = 0;
  milking: MyMilking = null;
  el: HTMLElement;

  isLoading = true;
  constructor(private elementRef: ElementRef) {
    this.el = elementRef.nativeElement;

    let allocations = [];
    for (let i = 0; i < 20; i++) {
      let allocation = new Allocation('Cow' + i, i);
      allocations.push(allocation);
    }

    this.milking = new MyMilking(1, '03 Feb AM', 10, 20, 10, allocations);
    this.ngCtbStats();
    this.ngDraftingStats();

  }

  private ngCtbStats() {
    this.milking.ctbStats = [];
    let item = new MilkingStatsItem();
    item.title = 'Cow Count';
    item.value = 80000;
    this.milking.ctbStats.push(item);

    item = new MilkingStatsItem();
    item.title = 'Repeats';
    item.value = 20000;
    this.milking.ctbStats.push(item);

    item = new MilkingStatsItem();
    item.title = 'Bails Per Minute';
    item.value = 3;
    this.milking.ctbStats.push(item);
  }

  private ngDraftingStats() {
    this.milking.draftStats = [];
    let item = new MilkingStatsItem();
    item.title = 'Draft Left';
    item.value = 4;
    this.milking.draftStats.push(item);

    item = new MilkingStatsItem();
    item.title = 'Draft Right';
    item.value = 5;
    this.milking.draftStats.push(item);

    item = new MilkingStatsItem();
    item.title = 'Total Exit';
    item.value = 6;
    this.milking.draftStats.push(item);
  }

  ngOnInit() {
    this.isLoading = false;
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.onResize();
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
  }

  onResize() {
    this.resizeElements();
  }

  resizeElements() {
    let userListLayout = new UserListLayout();
    userListLayout.reLayout();
  }

  private Adjust() {
    let summay = this.el.querySelector('div[class="table-wrapper"]');
    let basicHeight = window.innerHeight - 140;
    let summaryHeight = <number><any>(window.getComputedStyle(summay, null).getPropertyValue('height').replace('px', ''));
    this.bodyHeight = (basicHeight - summaryHeight);


    let summayHidden = this.el.querySelector('th[class="panel panel-heading summary-hidden"]');
    this.summaryTh = <number><any>(window.getComputedStyle(summayHidden, null).getPropertyValue('height').replace('px', ''));


    let summayDivEl = this.el.querySelector('div[class="div-summary"]');
    let summaryDivHeight = <number><any>(window.getComputedStyle(summayDivEl, null).getPropertyValue('height').replace('px', ''));
    let summayHiddenDiv = this.el.querySelector('div[class="div-summary-hidden"]');
    let summaryDivHiddenHeight = <number><any>(window.getComputedStyle(summayHiddenDiv, null).getPropertyValue('height').replace('px', ''));

    this.summaryDiv = <number><any>(window.getComputedStyle(summayDivEl, null).getPropertyValue('height').replace('px', ''));
    let paddingtop = <number><any>window.getComputedStyle(summayHidden, null).getPropertyValue('padding-top').replace('px', '');
    let paddingbottom = <number><any>window.getComputedStyle(summayHidden, null).getPropertyValue('padding-bottom').replace('px', '');
    this.summaryThWidth = <number><any>(window.getComputedStyle(summayHidden, null).getPropertyValue('width').replace('px', ''));


  }
}
