export interface Event {
    end: DateObj,
    location?: string;
    start: DateObj;
    summary?: string; 
}

export interface DateObj {
    date: string;
}