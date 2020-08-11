import { FuseUtils } from '../utils';

export class ProjektKort
{
    id: string;
    name: string;
    description: string;
    idAttachmentCover: string;
    idMembers: string[];
    idLabels: string[];
    attachments: any[];
    subscribed: boolean;
    checklists: any[];
    checkItems: number;
    checkItemsChecked: number;
    comments: any[];
    activities: any[];
    due: string;

  
    constructor(projektkort)
    {
        this.id = projektkort.id || FuseUtils.generateGUID();
        this.name = projektkort.name || '';
        this.description = projektkort.description || '';
        this.idAttachmentCover = projektkort.idAttachmentCover || '';
        this.idMembers = projektkort.idMembers || [];
        this.idLabels = projektkort.idLabels || [];
        this.attachments = projektkort.attachments || [];
        this.subscribed = projektkort.subscribed || true;
        this.checklists = projektkort.checklists || [];
        this.checkItems = projektkort.checkItems || 0;
        this.checkItemsChecked = projektkort.checkItemsChecked || 0;
        this.comments = projektkort.comments || [];
        this.activities = projektkort.activities || [];
        this.due = projektkort.due || '';
    }
}
