import React, { useState, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';

import { PeopleTable } from './components/PeopleTable';
import { UserPosts } from './components/UserPosts';
import { PostDetails } from './components/PostDetails';
import { PostsContext } from './components/PostsContext';
import 'bulma';

function App() {
  const [posts, setPosts] = useState([]);

  const contextValue = useMemo(() => (
    {
      posts,
      setPosts,
    }
  ), [posts]);

  return (
    <div className="App">
      <PostsContext.Provider value={contextValue}>
        <Switch>
          <Route path="/" component={PeopleTable} exact />
          <Route path="/info" component={PostDetails} />
          <Route path="/" component={UserPosts} />
        </Switch>
      </PostsContext.Provider>
    </div>
  );
}

export default App;
