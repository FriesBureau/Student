export class Lektion {
    id?: string;
    titel?: string;
    korrektsvar?: boolean;
    nexttrin?:string;
    niveauid?: string;
    trin?: string;
    svar?: Svar[];
  }
  
  export interface Svar {
    svar?: string;
    label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  }
  