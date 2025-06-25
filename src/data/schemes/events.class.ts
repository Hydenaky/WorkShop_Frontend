export class EventClass {
    public createdByUser: string;
    public publicId: number;
    constructor(
        public title: string,
        public description: string,
        public date: string,
        public date_interval: string
    ) { }

    fromJson(json: any): EventClass {
        const event = new EventClass(
            json.title,
            json.description,
            json.date,
            json.date_interval)
        if (json.publicId) event.publicId = json.publicId;
        return event;
    }

    toJson(): any {
        return {
            title: this.title,
            description: this.description,
            date: this.date,
            date_interval: this.date_interval,
            ... (this.createdByUser && { createdByUser: this.createdByUser })
        }
    }
}