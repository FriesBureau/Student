import { Action } from '@ngrx/store';
import { Besked } from '../../../../../model/besked.model';

export const GET_BESKEDER = '[BESKEDER] GET BESKEDER';
export const GET_BESKEDER_SUCCESS = '[BESKEDER] GET MAILS SUCCESS';
export const GET_BESKEDER_FAILED = '[BESKEDER] GET MAILS FAILED';
export const SET_CURRENT_BESKED = '[BESKEDER] SET CURRENT MAIL';
export const SET_CURRENT_BESKED_SUCCESS = '[MAILS] SET CURRENT MAIL SUCCESS';
export const CHECK_CURRENT_BESKED = '[BESKEDER] CHECK CURRENT MAIL';
export const UPDATE_BESKED = '[BESKEDER] UPDATE MAIL';
export const UPDATE_BESKED_SUCCESS = '[BESKEDER] UPDATE MAIL SUCCESS';
export const UPDATE_BESKEDER = '[BESKEDER] UPDATE MAILS';
export const UPDATE_BESKEDER_SUCCESS = '[BESKEDER] UPDATE MAILS SUCCESS';
export const SET_SEARCH_TEXT = '[BESKEDER] SET SEARCH TEXT';
export const SELECT_ALL_BESKEDER = '[BESKEDER] SELECT ALL MAILS';
export const DESELECT_ALL_BESKEDER = '[BESKEDER] DESELECT ALL MAILS';
export const TOGGLE_IN_SELECTED_BESKEDER = '[BESKEDER] TOGGLE IN SELECTED MAILS';
export const SELECT_BESKEDER_BY_PARAMETER = '[BESKEDER] SELECT MAILS BY PARAMETER';
export const SET_FOLDER_ON_SELECTED_BESKEDER = '[BESKEDER] SET FOLDER ON SELECTED MAILS';
export const ADD_LABEL_ON_SELECTED_BESKEDER = '[BESKEDER] ADD LABEL ON SELECTED MAILS';

/**
 * Get Mails
 */
export class GetBeskeder implements Action
{
    readonly type = GET_BESKEDER;

    constructor()
    {
    }
}

/**
 * Get Mails Success
 */
export class GetBeskederSuccess implements Action
{
    readonly type = GET_BESKEDER_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Mails Failed
 */
export class GetBeskederFailed implements Action
{
    readonly type = GET_BESKEDER_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Set Current Besked
 */
export class SetCurrentBesked implements Action
{
    readonly type = SET_CURRENT_BESKED;

    constructor(public payload: string)
    {
    }
}

/**
 * Set Current Besked Success
 */
export class SetCurrentBeskedSuccess implements Action
{
    readonly type = SET_CURRENT_BESKED_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Check Current Besked
 */
export class CheckCurrentBesked implements Action
{
    readonly type = CHECK_CURRENT_BESKED;

    constructor()
    {
    }
}

/**
 * Update Besked
 */
export class UpdateBesked implements Action
{
    readonly type = UPDATE_BESKED;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Besked Success
 */
export class UpdateBeskedSuccess implements Action
{
    readonly type = UPDATE_BESKED_SUCCESS;

    constructor(public payload: Besked)
    {
    }
}

/**
 * Update Beskeder
 */
export class UpdateBeskeder implements Action
{
    readonly type = UPDATE_BESKEDER;

    constructor(public payload: Besked[])
    {
    }
}

/**
 * Update Beskeder Success
 */
export class UpdateBeskederSuccess implements Action
{
    readonly type = UPDATE_BESKEDER_SUCCESS;

    constructor()
    {
    }
}

/**
 * Set Search Text
 */
export class SetSearchText implements Action
{
    readonly type = SET_SEARCH_TEXT;

    constructor(public payload: string)
    {
    }
}

/**
 * Select All Beskeder
 */
export class SelectAllBeskeder implements Action
{
    readonly type = SELECT_ALL_BESKEDER;

    constructor()
    {
    }
}

/**
 * Deselect All Beskeder
 */
export class DeselectAllBeskeder implements Action
{
    readonly type = DESELECT_ALL_BESKEDER;

    constructor()
    {
    }
}

/**
 * Toggle In Selected Beskeder
 */
export class ToggleInSelectedBeskeder implements Action
{
    readonly type = TOGGLE_IN_SELECTED_BESKEDER;

    constructor(public payload: string)
    {
    }
}

/**
 * Select Beskeder by Parameter
 */
export class SelectBeskederByParameter implements Action
{
    readonly type = SELECT_BESKEDER_BY_PARAMETER;

    constructor(public payload: any)
    {
    }
}

/**
 * Set Folder on Selected Beskeder
 */
export class SetFolderOnSelectedBeskeder implements Action
{
    readonly type = SET_FOLDER_ON_SELECTED_BESKEDER;

    constructor(public payload: string)
    {
    }
}

/**
 * Add label on Selected Beskeder
 */
export class AddLabelOnSelectedBeskeder implements Action
{
    readonly type = ADD_LABEL_ON_SELECTED_BESKEDER;

    constructor(public payload: string)
    {
    }
}

export type BeskederActionsAll
    = GetBeskeder
    | GetBeskederSuccess
    | GetBeskederFailed
    | SetCurrentBesked
    | SetCurrentBeskedSuccess
    | CheckCurrentBesked
    | UpdateBesked
    | UpdateBeskedSuccess
    | UpdateBeskeder
    | UpdateBeskederSuccess
    | SetSearchText
    | SelectAllBeskeder
    | DeselectAllBeskeder
    | ToggleInSelectedBeskeder
    | SelectBeskederByParameter
    | SetFolderOnSelectedBeskeder
    | AddLabelOnSelectedBeskeder;
