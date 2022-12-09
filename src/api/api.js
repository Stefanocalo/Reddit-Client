const API_ROOT = 'https://www.reddit.com';

export const getSubRedditsPosts = async (subreddit) => {
    const response = await fetch(`${API_ROOT}/${subreddit}.json`);
    const json = await response.json();

    

};

export const getSubreddits = async () => {
    const response = await fetch(`${API_ROOT}/subreddits.json`);
    const json = await response.json();
     
    return json.data.children.map((element) => element.data);
  };

  export const getPostComments = async (permalink) => {
    const response = await fetch(`${API_ROOT}${permalink}.json`);
    const json = await response.json();

    console.log(json);
  
    //return json[1].data.children.map((subreddit) => subreddit.data);
  };
  