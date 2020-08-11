import Timestamp = firestore.Timestamp;
import { firestore } from 'firebase/app';

export class Dokumenter {
    extension: string;
    location: string;
    modified: Timestamp;
    name: string;
    offline: boolean;
    opened: Timestamp;
    owner: string;
    path: string;
    dokumentid: string;
    vis: string;
    size: string;
    type: string;

    constructor(dokument?)
    {
        {  
     dokument = dokument || {};
            this.extension = dokument.extension;
            this.location = dokument.location;
            this.modified = dokument.modified;
            this.dokumentid = dokument.dokumentid;
            this.name = dokument.name;      
            this.offline = dokument.offline;
            this.opened = dokument.opened;
            this.owner = dokument.owner;
            this.path = dokument.path;
            this.vis = dokument.vis;
            this.size = dokument.size;
            this.type = dokument.type;
        }
    }
}

 