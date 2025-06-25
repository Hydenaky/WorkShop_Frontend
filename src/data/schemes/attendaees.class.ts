export class AttendaeeClass {
    public eventAsigned: number;
    public publicId: number;

    constructor(
        public name: string,
        public email: string
    ){}

    fromJson(json: any): AttendaeeClass{
        const att = new AttendaeeClass(
            json.name,
            json.email
        )
        if (json.event) att.eventAsigned = json.event;
        if (json.publicId) att.publicId = json.publicId;
        return att;
    }

    toJson(): any{
        return {
            name: this.name,
            email: this.name,
            ... (this.eventAsigned && { eventAsigned: this.eventAsigned }),
            ... (this.publicId && { publicId: this.publicId })
        }
    }
}