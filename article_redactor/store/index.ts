
export enum ActionTypes {
    SET_BLOCK = 'SET_BLOCK',
    APPEND_BLOCKS = 'APPEND_BLOCKS',
    DELETE_BLOCK = "DELETE_BLOCK",
    SET_STATE = "SET_STATE",
}

type SetBlockAction = {
    type: typeof ActionTypes.SET_BLOCK
    block: Partial<IBlock> & { id: string }
}

type RemoveBlockAction = {
    type: typeof ActionTypes.DELETE_BLOCK,
    id: string
}

type SetStateAction = {
    type: typeof ActionTypes.SET_STATE,
    state: any
}

type AppendBlocksAction = {
    type: typeof ActionTypes.APPEND_BLOCKS,
    blocks: Array<Partial<IBlock> & { id: string }>
}

export type ReducerAction = SetBlockAction | RemoveBlockAction | SetStateAction | AppendBlocksAction

export type BlockTypes =
    | "text"
    | "audio"
    | "video"
    | "image"
    | "attachment"
    | "question"
    | "answer"
    | "progress"
    | "loader";

export interface IBlock {
    id: string,
    text?: string,
    file?: {
        id: string
        path: string
    }
    type: BlockTypes,
    question?: string,
    answers?: Array<{
        answer: string
    }>
    isCorrect?: boolean,
    answer: string
    progress?: number
}

type IInitialState =  {
        [key: string]: IBlock
}

export const initialState: IInitialState  = {}

export function reducer(state = initialState, action: ReducerAction) {
    switch (action.type) {
        case ActionTypes.SET_BLOCK:
            return {
                ...state,
                [action.block.id]: {
                    ...state[action.block.id],
                    ...action.block
                }
            }
        case ActionTypes.DELETE_BLOCK:
            const state_clone = {...state}
            delete state_clone[action.id]
            return state_clone
        case ActionTypes.SET_STATE:
            return action.state
        case ActionTypes.APPEND_BLOCKS:
            return {
                ...state,
                ...action.blocks
            }
        default:
            return state
    }
}
