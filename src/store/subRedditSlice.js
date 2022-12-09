import { createSlice  } from "@reduxjs/toolkit";
import { getSubreddits } from "../api/api";

const initialState = {
    subreddits: [],
    isLoading: false,
    error: false
};

const subRedditSlice = createSlice({
    name: 'subreddit',
    initialState: initialState,
    reducers: {
        startGetSubreddits: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        getSubredditsSuccess: (state, action) => {
            state.isLoading = false;
            state.subreddits = action.payload;
        },
        getSubredditsFail: (state) => {
            state.isLoading = false;
            state.error = true;
        }
    }
});

export const {
    startGetSubreddits,
    getSubredditsSuccess,
    getSubredditsFail
} = subRedditSlice.actions;

export default subRedditSlice.reducer;

export const selectSubReddits = (state) => state.subreddit.subreddits;

// thunk to get subReddits

export const fetchSubReddits =() => async (dispatch) => {

    try {
        dispatch(startGetSubreddits());
        const subreddits = await getSubreddits();
        dispatch(getSubredditsSuccess(subreddits))
    } catch(error) {
        dispatch(getSubredditsFail());
    }

}   