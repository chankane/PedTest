import { Component } from '@angular/core';
import { NgZone } from '@angular/core';
import { Pedometer, IPedometerData } from '@ionic-native/pedometer';

import{ StepsData } from './steps-data'

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';

//import { DailyPedometer } from './daily-pedometer'
import{ Scheduler } from './scheduler'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@Injectable()
export class HomePage {

  steps: number = 0
  history: StepsData[] = []

  // // Pedomerter
  constructor(private ngZone: NgZone, private pedometer: Pedometer, private storage: Storage, private backgroundMode: BackgroundMode) {
    //backgroundMode.enable()
    this.startScan()
    new Scheduler().start(this.onHourChanged, this.onDateChanged)
    this.readHistory()
  }

  h1(){
    alert("hi")
  }

  h2(){}

  /*constructor(private dailyPedometer: DailyPedometer, private ngZone: NgZone) {
    alert("out")
    //this.steps = dailyPedometer.steps
    //new Scheduler().start(this.h1, this.h2)
  }*/

  private onHourChanged() {
    let prev: Date = new Date()
    //alert(this.toDateTime(prev))
    this.ngZone.run(() => {
      prev.setHours(prev.getHours() - 1)
      //this.write(prev, this.steps)
      //this.history[prev.getHours()] = <StepsData>{dateTime: this.toDateTime(prev), steps: this.steps}
    })
  }

  private onDateChanged() {
    this.ngZone.run(() => {
    this.steps = 0
    })
  }

  /*constructor(private pedometer: Pedometer, private storage: Storage/*, private backgroundMode: BackgroundMode) {
    //backgroundMode.enable()
    this.startScan()
    new Scheduler().start(this.onHourChanged, this.onDateChanged)
    this.readHistory()
  }*/

  private startScan() {
    this.pedometer.startPedometerUpdates().subscribe((data: IPedometerData) => {
      this.onStep(data.numberOfSteps)
    })
  }

  private onStep(steps: number) {
    this.ngZone.run(() => {
    this.steps = steps
    })
  }

  private write(date: Date, step: number) {
    this.storage.set(this.toDateTime(date).toString(), step)
    alert('writed')
  }

  private async readHistory() {
    let date = new Date()
    for(let i=0; i<24; i++){
      date.setHours(i)
      await this.storage.get(this.toDateTime(date).toString()).then((val) => {
        if(null == val){
          val = 0
        }
        this.history[i] = <StepsData>{dateTime: this.toDateTime(date), steps: <number>val}
      });
    }
  }

  // Date to number
  private toDateTime(date: Date): number{
    return date.getFullYear() * 1000000 + (date.getMonth() + 1) * 10000 + date.getDate() * 100 + date.getHours()
  }
}
