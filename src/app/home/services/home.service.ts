import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendaeeClass } from '../../../data/schemes/attendaees.class';
import { BehaviorSubject, catchError, firstValueFrom, Observable, tap } from 'rxjs';
import { EventClass } from '../../../data/schemes/events.class';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private eventSubject = new BehaviorSubject<EventClass[]>([]);
  public $events = this.eventSubject.asObservable();

  private attdSubject = new BehaviorSubject<AttendaeeClass[]>([]);
  public $attds = this.attdSubject.asObservable();

  eventSelected: number;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  // Método auxiliar para asegurar que sea array
  private ensureArray(data: any): any[] {
    if (Array.isArray(data)) {
      return data;
    }
    if (typeof data === 'object' && data !== null) {
      return Object.values(data);
    }
    return [];
  }

  async addEvnt(evnt: EventClass): Promise<any> {
    evnt.createdByUser = this.authService.username;
    try {
      const result = await firstValueFrom(
        this.httpClient.post<EventClass>('http://localhost:3000/event/addEvnt', evnt.toJson())
      );
      if (result === null) {
        return console.log('failed');
      } else {
        this.eventSubject.next([...this.eventSubject.value, result]);
        this.getEvnts()
        return result;
      }
    }
    catch (error) {
      console.error('Error en signIn:', error);
    }
  }

  async getEvnts(): Promise<void> {
    this.eventSubject.next([])
    const payload = new EventClass(
      '', '', '', ''
    );
    payload.createdByUser = this.authService.username;

    try {
      const result = await firstValueFrom(
        this.httpClient.post('http://localhost:3000/event/getEvnts', payload.toJson())
      );

      if (result === null) {
        console.log('Failed to get events');
        return;
      }

      const eventsArray = this.ensureArray(result);

      eventsArray.forEach((event: any) => {
        const e = new EventClass(event.title, event.description, event.date, event.date_interval);
        if (event.publicId) e.publicId = event.publicId;
        this.eventSubject.next([...this.eventSubject.value, e]);
      });

    } catch (error) {
      console.error('Error getting events:', error);
    }
  }

  async updateEvnt(id: number, evnt: EventClass) {
    evnt.createdByUser = this.authService.username;
    try {
      const result = await firstValueFrom(
        this.httpClient.post<EventClass>('http://localhost:3000/event/updateEvnt', evnt.toJson())
      );
      if (result === null) {
        return console.log('failed');
      } else {
        this.getEvnts();
        return result;
      }
    }
    catch (error) {
      console.error('Error en signIn:', error);
    }
  }

  public deleteEvnt(id: number) {
    this.httpClient.delete(`http://localhost:3000/event/${id}`).subscribe(data => {
      this.getEvnts()
    });
  }


  //Attendaees
  async addAttd(attd: AttendaeeClass): Promise<any> {
    try {
      const result = await firstValueFrom(
        this.httpClient.post<AttendaeeClass>('http://localhost:3000/attendee/addAttd', attd.toJson())
      );
      if (result === null) {
        return console.log('failed');
      } else {
        this.getAttd(attd.eventAsigned)
        return result;
      }
    }
    catch (error) {
      console.error('Error en signIn:', error);
    }
  }

  async getAttd(id: number): Promise<void> {
    this.attdSubject.next([]);
    try {
      const result = await firstValueFrom(
        this.httpClient.get(`http://localhost:3000/attendee/${id}`)
      );

      if (result === null) {
        console.log('Failed to get attendaes');
        return;
      }
      console.log(result);

      const attendaeesArray = this.ensureArray(result);

      attendaeesArray.forEach((att: any) => {
        const e = new AttendaeeClass(att.name, att.email);
        if (att.eventAsigned) e.eventAsigned = att.eventAsigned.publicId;
        if (att.publicId) e.publicId = att.publicId;
        this.attdSubject.next([...this.attdSubject.value, e]);
        console.log(this.attdSubject.value);

      });

    } catch (error) {
      console.error('Error getting events:', error);
    }
  }

  async updateAttd(id: number, att: AttendaeeClass) {
    try {
      const result = await firstValueFrom(
        this.httpClient.post<EventClass>('http://localhost:3000/attendee/updateAtt', att.toJson())
      );
      if (result === null) {
        return console.log('failed');
      } else {
        this.getAttd(att.eventAsigned)
        return result;
      }
    }
    catch (error) {
      console.error('Error en signIn:', error);
    }
  }
  async deleteAttd(id: number) { }

  public deleteAtt(id: number, eventId: number) {
    this.httpClient.delete(`http://localhost:3000/attendee/${id}`).subscribe(data => {
      this.getAttd(eventId)
    });
  }
}
