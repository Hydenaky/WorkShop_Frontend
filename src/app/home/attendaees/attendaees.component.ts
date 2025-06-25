import { Component } from '@angular/core';
import { resources } from '../../../resources/resources';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AttendaeeClass } from '../../../data/schemes/attendaees.class';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-attendaees',
  standalone: true,
  imports: [resources],
  templateUrl: './attendaees.component.html',
  styleUrl: './attendaees.component.scss'
})
export class AttendaeesComponent {
  attendaees = [];
  visible: boolean = false;
  form: FormGroup;
  data: any;

  constructor(private formBuilder: FormBuilder, private homeService: HomeService) {
    this.form = this.formBuilder.group({
      event: 0,
      name: [''],
      email: ['']
    })

    homeService.$attds.subscribe(e => this.attendaees = e)
  }

  showDialog(data: any) {
    if (data === false) {
      this.form.reset({
        event: 24,
        name: 'R',
        email: 'R'
      });
      this.data = false;
    } else {
      this.data = data;

      this.form.patchValue({
        event: data.eventAsigned || 0,
        name: data.name || '',
        email: data.email || ''
      });
    }
    this.visible = true;
  }

  saveAttd() {
    const att = new AttendaeeClass(
      this.form.value.name,
      this.form.value.email
    )
    att.eventAsigned = this.form.value.event;
    console.log(att);
    
    this.homeService.addAttd(att);
  }

  getAttd() {
    const event = this.homeService.eventSelected;
    this.homeService.getAttd(event);
  }

  updateAtt(id: number) {
    console.log('B');
    try {
      const data = new AttendaeeClass(
        this.form.value.name,
        this.form.value.email
      )
      data.eventAsigned = this.form.value.event;
      data.publicId = id;
      
      this.homeService.updateAttd(id, data)
    } catch (error) {
      return null
    }
  }

  deleteEvnt(id: number, eventId: number) {
    this.homeService.deleteAtt(id, eventId)
  }
}
