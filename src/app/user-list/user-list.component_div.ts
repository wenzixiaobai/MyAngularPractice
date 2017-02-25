import { Component, ViewEncapsulation, OnInit, OnDestroy, AfterViewInit, AfterContentChecked, NgZone } from '@angular/core';
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
  watchingPosition: number = 2;
  isLoading = true;
  private index: number;
  constructor() {
    this.ngGetHistory();
    this.ngCtbStats();
    this.ngDraftingStats();
    this.index = 0;
    setInterval(() => {
                this.addNewItem();
                }, 1000);
  }

  private addNewItem() {
      let allocation = new Allocation('Cow_' + this.index, this.index);
      this.milking.allocations.unshift(allocation);
      this.index ++;
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

  private ngGetHistory() {
    let allocations = [];
    for (let i = 0; i < 1; i++) {
      let allocation = new Allocation('Cow' + i, i);
      allocations.push(allocation);
    }

    this.milking = new MyMilking(1, '03 Feb AM', 10, 20, 10, allocations);
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
}
