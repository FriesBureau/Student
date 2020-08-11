import { FuseUtils } from '../utils';

export class ProjektListe
{
    id: string;
    name: string;
    idCards: string[];

    /**
     * Constructor
     *
     * @param list
     */
    constructor(projektliste)
    {
        this.id = projektliste.id || FuseUtils.generateGUID();
        this.name = projektliste.name || '';
        this.idCards = [];
    }
}
