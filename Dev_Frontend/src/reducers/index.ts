import { paramsReducer, ParamsState } from "./paramsReducer";

export interface CombineReducers {
    params: ParamsState,
}

const mainReducer = ({ params }: CombineReducers, action: any) => {
    return {
        params: paramsReducer(params, action),
    };
};

export default mainReducer;