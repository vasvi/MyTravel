import { EventObject } from '../model/event.model';

export const newEventMock: EventObject = Object.assign({}, {
    location: 'Jaipur, Rajasthan',
    end: {
      date: '05/23/2020'
    },
    start: {
      date: '05/25/2020'
    },
    summary: 'Trip to Jaipur'
  });
export const CreateEventMockObj = {
    "kind": "calendar#event",
    "etag": "\"3177326547495000\"",
    "id": "motup0ouv16krcer7nh2l0g65g",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=bW90dXAwb3V2MTZrcmNlcjduaDJsMGc2NWcgdmFzdmkuY2hhd2xhQGdsb2JhbGxvZ2ljLmNvbQ",
    "created": "2020-05-05T07:21:13.000Z",
    "updated": "2020-05-05T07:21:13.778Z",
    "summary": "Trip to Jaipur",
    "location": "Jaipur, Rajasthan, India",
    "creator": {
     "email": "vasvi.chawla@globallogic.com",
     "self": true
    },
    "organizer": {
     "email": "vasvi.chawla@globallogic.com",
     "self": true
    },
    "start": {
     "date": "2020-05-29"
    },
    "end": {
     "date": "2020-05-31"
    },
    "iCalUID": "motup0ouv16krcer7nh2l0g65g@google.com",
    "sequence": 0,
    "reminders": {
     "useDefault": false,
     "overrides": [
      {
       "method": "popup",
       "minutes": 10
      }
     ]
    }
   }