import redditSlice from './redditSlice';
import redditReducer, {
    getPosts,
    startGetPosts,
    getPostsSuccess,
    getPostsFail,
    setSearchTerm,
    setSelectedSubreddit,
    startGetComments,
    getCommentSuccess,
    getCommentsFail,
    toggleDarkMode
} from './redditSlice';

describe('testing redditSlice', () => {
    const initialState = {
        posts: [],
        isLoading: false,
        error: false,
        searchTerm: '',
        selectedSubReddits: '/r/Home',
        isLightMode: true
    };

    it('should set posts with payload', () => {
        const payload = [{subreddit: 'home', author_fullname: 'test'}, {subreddit: 'home', author_fullname: 'test1'}];
        const actual = redditReducer(initialState, getPosts(payload));

        expect(actual.posts).toEqual([{subreddit: 'home', author_fullname: 'test'},{subreddit: 'home', author_fullname: 'test1'}])
    });
    it('should set isLoading: true && error: false',() => {
        const actual = redditReducer(initialState, startGetPosts() );

        expect(actual.isLoading).toEqual(true);
        expect(actual.error).toEqual(false);
    });
    it('should set isLoading: false && posts with payload',() => {
        const state = {
            posts: [],
            isLoading: true
        }
        const payload = [{subreddit: 'home', author_fullname: 'test'}, {subreddit: 'home', author_fullname: 'test1'}];
        const actual = redditReducer(state, getPostsSuccess(payload));

        expect(actual.posts).toEqual([{subreddit: 'home', author_fullname: 'test'},{subreddit: 'home', author_fullname: 'test1'}]);
        expect(actual.isLoading).toEqual(false);
    });
    it('should set error: true && isLoading: false', () => {
        const state = {
            isLoading: true,
            error: false
        }
        const actual = redditReducer(state, getPostsFail());

        expect(actual.isLoading).toEqual(false);
        expect(actual.error).toEqual(true);
    });
    it('should se searchTerm', () => {
        const actual = redditReducer(initialState, setSearchTerm('test'));

        expect(actual.searchTerm).toEqual('test')
    });
    it(`should set searchTerm: '' && selectedSubReddits with payload`, () => {
        const payload = '/r/Test';
        const actual = redditReducer(initialState, setSelectedSubreddit(payload));


        expect(actual.selectedSubReddits).toEqual('/r/Test');
    });
    it('should toggle showingComments: true given a post index', () => {
        const state = {
            posts: [
                {subreddit: 'home', author_fullname: 'test', showingComments: false, loadingComments: false, error: false, comments: []},
                {subreddit: 'home', author_fullname: 'test1', showingComments: false, loadingComments: false, error: false, comments: []}
            ]
        }
        const index = 1
        const actual = redditReducer(state, startGetComments(index));

        expect(actual.posts[index]).toEqual({subreddit: 'home', author_fullname: 'test1', showingComments: true, loadingComments: true, error: false, comments: []})
    });
    it('should set loadingComments: false && comments with payload', () => {
        const state = {
            posts: [
                {subreddit: 'home', author_fullname: 'test', showingComments: false, loadingComments: false, error: false, comments: []},
                {subreddit: 'home', author_fullname: 'test1', showingComments: true, loadingComments: true, error: false, comments: []}
            ]
        }
        const payload = {
            index: 1,
            comments: [
                {subreddit_id:"t5_2qs0k", text:'test'},
                {subreddit_id:"t5_2qs0k", text:'test1'}
            ]
        };
        const actual = redditReducer(state, getCommentSuccess(payload));

        expect(actual.posts[1]).toEqual({subreddit: 'home', author_fullname: 'test1', showingComments: true, loadingComments: false, error: false, comments: [{subreddit_id:"t5_2qs0k", text:'test'}, {subreddit_id:"t5_2qs0k", text:'test1'}]})
    });
    it('should set error: true && loadingCOmments: false', () => {
        const state = {
            posts: [
                {subreddit: 'home', author_fullname: 'test', showingComments: false, loadingComments: false, error: false, comments: []},
                {subreddit: 'home', author_fullname: 'test1', showingComments: true, loadingComments: true, error: false, comments: []}
            ]
        }
        const index = 1
        const actual = redditReducer(state, getCommentsFail(index));

        expect(actual.posts[index]).toEqual({subreddit: 'home', author_fullname: 'test1', showingComments: true, loadingComments: false, error: true, comments: []})
    });
    it('should toggle isLightMode to true', () => {
        const state = {
            isLightMode: true
        };
        const actual = redditSlice(state, toggleDarkMode(false));

        expect(actual.isLightMode).toEqual(false);
    })
})