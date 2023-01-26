import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getSubRedditsPosts, getPostComments, getUserProfile } from "../api/api";


const initialState = {
    posts: [],
    isLoading: false,
    error: false,
    searchTerm: '',
    selectedSubReddits: '/r/Home',
    isLightMode: true
};

const redditSlice = createSlice({
    name: 'reddit',
    initialState: initialState,
    reducers: {
        getPosts: (state, action) => {
            state.posts = action.payload;
        },
        startGetPosts: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        getPostsSuccess: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        getPostsFail: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        getAuthorSuccess: (state,action) => {
            state.posts[action.payload.index].author_data = action.payload.author
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSelectedSubreddit: (state, action) => {
            state.selectedSubReddits = action.payload;
            state.searchTerm = '';
        },
        toggleShowingComments: (state, action) => {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
        },
        startGetComments: (state, action) => {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;

            if(!state.posts[action.payload].showingComments) {
                return
            } else {
                state.posts[action.payload].showingComments = true;
                state.posts[action.payload].error = false;
            };
            state.posts[action.payload].loadingComments = true;
            state.posts[action.payload]. error = false;
        },
        getCommentSuccess: (state, action) => {
            state.posts[action.payload.index].loadingComments = false;
            state.posts[action.payload.index].comments = action.payload.comments;
            
        },
        getCommentsFail: (state, action) => {
            state.posts[action.payload].loadingComments = false;
            state.posts[action.payload].error = true;
        },
        toggleDarkMode: (state, action) => {
            state.isLightMode = action.payload;
            
        }
    }
})

export const {
    getPosts,
    startGetPosts,
    getPostsSuccess,
    getPostsFail,
    setSearchTerm,
    setSelectedSubreddit,
    toggleShowingComments,
    startGetComments,
    getCommentSuccess,
    getCommentsFail,
    getAuthorSuccess,
    toggleDarkMode
} = redditSlice.actions;

export default redditSlice.reducer;


// Thunk to get subReddits

export const fetchPosts = (subreddit) => async (dispatch) => {
    try {
      dispatch(startGetPosts());
      const posts = await getSubRedditsPosts(subreddit);
      //hHiding comment as default
      const postsWithMetadata = posts.map((post) => ({
        ...post,
        author_data: [],
        showingComments: false,
        comments: [],
        loadingComments: false,
        error: false,
      }));
      dispatch(getPostsSuccess(postsWithMetadata));
    } catch(error) {
      dispatch(getPostsFail());
    }
  };

  export const fetchAuthor = (index, authorName) => async(dispatch) => {
    try{
        const author = await getUserProfile(authorName);
        const payload = {
            index: index,
            author: author
        }
        dispatch(getAuthorSuccess(payload));

    }catch(error) {
        console.log(error);
    }
    
  }


  export const fetchComment = (index, permalink) => async (dispatch) => {
    try {
        dispatch(startGetComments(index));
        const comments = await getPostComments(permalink);
        dispatch(getCommentSuccess({index: index, comments: comments}));
        
    } catch(error) {
        dispatch(getCommentsFail(index));
        console.log(error);
    }
  };

  export const selectPosts = (state) => state.reddit.posts;
  export const selectSearchTerm = (state) => state.reddit.searchTerm;
  export const selectSelectedSubReddits = (state) => state.reddit.selectedSubReddits;

  export const selectFilteredPosts = createSelector(
    [selectPosts, selectSearchTerm],
    (posts, searchTerm) => {
      if (searchTerm !== '') {
        return posts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      return posts;
    }
  );
  

  
  