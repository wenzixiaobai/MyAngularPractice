import { Component, ViewEncapsulation, OnInit, OnDestroy, 
  AfterViewInit, AfterViewChecked, NgZone, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserListLayout } from '../../utils/userListLayout';
import { Http, Headers } from '@angular/http';

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

  constructor(public animal: string, public bail: number, public allocatedTime: Date) { };
}

export class MilkingStatsItem {
  public title: string;
  public value: number;
}

@Component({
  selector: 'app-ctb-milking',
  templateUrl: './milking.template.html',
  styleUrls: ['./milking.css']
})

export class MilkingComponent  implements OnInit, AfterViewInit, AfterViewChecked {
  bodyHeight: number = 750;
  summaryPadding: number = 0;
  summaryDiv: number = 0;
  summaryTh: number = 0;
  summaryThWidth: number = 0;
  contendHeight: number = 0;
  milking: MyMilking = null;
  watchingPosition: number = 10;
  isLoading = true;
  private index: number;
  constructor(private http: Http, private cdr: ChangeDetectorRef) {
    if ('hidden' in document)
			document.addEventListener('visibilitychange', onchange);
    this.onload();
    this.index = 0;
    setInterval(() => {
                this.addNewItem();
                }, 1000);
  }

private onload() {
      this.ngGetHistory();
      this.ngCtbStats();
      this.ngDraftingStats();
}

  private addNewItem() {
      let allocation = new Allocation('Cow' + this.index, this.index, new Date());
      if(this.milking === null) {
        this.milking = new MyMilking(1, '03 Feb AM', 10, 20, 10, []);
      }
      this.milking.allocations.unshift(allocation);
      this.index ++;
      this.ngCtbStats();
  }

onchange() {
  console.log('onchange');
  this.onResize();
}
  private ngCtbStats() {
    let empties = this.milking.allocations.filter(m => m.animal === 'Empty').length;
    let unknown = this.milking.allocations.filter(m => m.animal === 'Unknown').length;
    let validAllocation = this.milking.allocations.filter((m) => m.animal !== 'Empty' && m.animal !== 'Unknown');
    let allocation = validAllocation.map(m => {return [m.animal, validAllocation.filter(a => a.animal === m.animal).length]})
    let uniqueAnimals = new Set(validAllocation.map(m => m.animal));
    let repeatAnimals = new Set(allocation.filter(m => m[1] > 1).map( a => a[0]));

    let now = new Date();
    let oneMinuteBefore = new Date(now.getTime() - 60000);
    let perMinutes = this.milking.allocations.filter(
      m => m.allocatedTime <= now && m.allocatedTime > oneMinuteBefore).length;


    this.milking.ctbStats = [];
    let item = new MilkingStatsItem();
    item.title = 'Cow Count';
    item.value = unknown + uniqueAnimals.size;
    this.milking.ctbStats.push(item);

    item = new MilkingStatsItem();
    item.title = 'Repeats';
    item.value = repeatAnimals.size;
    this.milking.ctbStats.push(item);

    item = new MilkingStatsItem();
    item.title = 'Bails Per Minute';
    item.value = perMinutes;
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
    for (let i = 10; i >= 0; i--) {
      let allocation = new Allocation('Cow' + i, i, new Date());
      allocations.push(allocation);
    }
    allocations.push(new Allocation('Cow5', 5, new Date()));
    allocations.push(new Allocation('Cow5', 5, new Date()));
    allocations.push(new Allocation('Cow6', 6, new Date()));
    this.milking = new MyMilking(1, '03 Feb AM', 10, 20, 10, allocations);

    let theAllocation = 
      allocations.map(m => {return [m.animal, allocations.filter(a => a.animal === m.animal).length]})
    ;

    let uniqueAnimal = new Set(theAllocation.filter(m => m[1] > 1).map( a => a[0]));
    console.log(uniqueAnimal);
  }

  ngOnInit() {
    this.isLoading = false;
    
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.onResize();
    this.cdr.detectChanges();
    //this.onResize();
  }

  ngAfterViewChecked() {
    this.onResize();
  }

  onResize() {
    this.resizeElements();
  }

  resizeElements() {
    let userListLayout = new UserListLayout();
    userListLayout.reLayout();
  }
}
