const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';


let initialState = { 
    total_results: 0,
    total_pages: 0,
    current_page: 1
};



const pagination_reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TOTAL_PAGES:
            return {
                ...state,
                total_results: action.payload.total_results,
                total_pages: action.payload.total_pages
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                current_page: action.payload
            };

      
        default:
            return state;
    }
}




const setTotalPagesAC = (payload) => ({ type: SET_TOTAL_PAGES, payload });
const setCurrentPageAC = (payload) => ({ type: SET_CURRENT_PAGE, payload });



export const setTotalPages = (payload) => (dispatch) => {
    // console.log(payload);
    dispatch(setTotalPagesAC(payload));
}

export const setCurrentPage = (payload) => (dispatch) => {
    // console.log('currPage=', payload);
    dispatch(setCurrentPageAC(payload));
}



export default pagination_reducer;