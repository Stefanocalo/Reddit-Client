const API_ROOT = 'https://www.reddit.com';

export const getSubRedditsPosts = async (subreddit) => {
    const response = await fetch(`${API_ROOT}/${subreddit}.json?limit=70`);
    const json = await response.json();

    return json.data.children.map((element) => element.data);
    

};

export const getSubreddits = async () => {
    const response = await fetch(`${API_ROOT}/subreddits.json?limit=30`);
    const json = await response.json();
     
    return json.data.children.map((element) => element.data);
  };

  export const getPostComments = async (permalink) => {
    const response = await fetch(`${API_ROOT}${permalink}.json`);
    const json = await response.json();

  
    return json[1].data.children.map((subreddit) => subreddit.data);
  };

  export const getUserProfile = async (user) => {
    const response = await fetch(`${API_ROOT}/user/${user}/about.json`);
    const json = await response.json();
    return json.data;
  }
  