import subredditReducer, {
    startGetSubreddits,
    getSubredditsSuccess,
    getSubredditsFail
} from './subRedditSlice';

describe('testing sub<redditSlice', () => {
    const initialState = {
        subreddits: [],
        isLoading: false,
        error: false
    };
    
    it('should set isLoading: true', () => {
        const actual = subredditReducer(initialState, startGetSubreddits());

        expect(actual.isLoading).toEqual(true);
    });
    it('should set isLoading: false && subreddit with payload', () => {
        const state = {
            subreddits: [],
            isLoading: true,
            error: false
        };
        const payload = [
            {title: 'Ask_reddit'},
            {title: 'test_reddit'}
        ];
        const actual = subredditReducer(state, getSubredditsSuccess(payload));

        expect(actual).toEqual({
            subreddits: [
                {title: 'Ask_reddit'},
                {title: 'test_reddit'}
            ],
            isLoading: false,
            error: false
        })
    });
    it('should set isLoading: false && error: true', () => {
        const state = {
            subreddits: [],
            isLoading: true,
            error: false
        };
        const actual = subredditReducer(state, getSubredditsFail());

        expect(actual).toEqual({
            subreddits: [],
            isLoading: false,
            error: true
        })
    })
})