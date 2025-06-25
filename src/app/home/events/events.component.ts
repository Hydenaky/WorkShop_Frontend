import { Component, OnInit } from '@angular/core';
import { resources } from '../../../resources/resources';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { EventClass } from '../../../data/schemes/events.class';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [resources],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  events: EventClass[] = [];
  visible: boolean = false;
  form: FormGroup;
  data: any;
  constructor(private formBuilder: FormBuilder, private homeService: HomeService) {
    this.form = this.formBuilder.group({
      title: [''],
      description: [''],
      date: [null],
      days: [0, [Validators.min(0), Validators.max(31)]],
      hours: [0, [Validators.min(0), Validators.max(24)]],
      minutes: [0, [Validators.min(0), Validators.max(60)]]
    });

    this.homeService.$events.subscribe(events => { 
      this.events = events 
    });
  }

  ngOnInit(): void {
    this.homeService.getEvnts()
  }

  showDialog(data: any) {
    if (data === false) {
      this.form.reset({
        title: '',
        description: '',
        days: 0,
        hours: 0,
        minutes: 0
      });
      this.data = false;
    } else {
      this.data = data;

      this.form.patchValue({
        title: data.title || '',
        description: data.description || '',
        date: data.date ? new Date(data.date) : null,
        days: data.date_interval?.days || 0,
        hours: data.date_interval?.hours || 0,
        minutes: data.date_interval?.minutes || 0
      });
    }
    this.visible = true;
  }

  addEvnt() {
    const date_interval: string = `${this.form.value.days} days ${this.form.value.hours} hours ${this.form.value.minutes} minutes`;

    try {
      const date = this.form.value.date.toISOString()
      const data = new EventClass(
        this.form.value.title,
        this.form.value.description,
        date,
        date_interval
      )
      this.homeService.addEvnt(data);
    } catch (error) {
      return null
    }
  }

  getEvnts() {
    this.homeService.getEvnts()
  }

  updateEvnt(id: number) {
    const date_interval: string = `${this.form.value.days} days ${this.form.value.hours} hours ${this.form.value.minutes} minutes`;

    try {
      const date = this.form.value.date.toISOString()
      const data = new EventClass(
        this.form.value.title,
        this.form.value.description,
        date,
        date_interval
      );
      data.publicId = id;
      this.homeService.updateEvnt(id, data);
      this.getEvnts()
    } catch (error) {
      return null
    }
  }

  deleteEvnt(id: number) {
    this.homeService.deleteEvnt(id);
    this.getEvnts()
  }

  getAttd(id: number){
    this.homeService.eventSelected = id;
    this.homeService.getAttd(id)
  }
}
