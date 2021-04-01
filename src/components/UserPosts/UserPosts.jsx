import React, { useState, useEffect, useContext } from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { Popup } from '../Popup';
import { PostsContext } from '../PostsContext';

import { getPostsByUserId, sendPost } from '../../helpers';

import './UserPosts.scss';

export const UserPosts = () => {
  const match = useRouteMatch('/:userId');
  const { userId } = match.params;

  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');

  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const userName = searchParams.get('user-name');

  const { posts, setPosts } = useContext(PostsContext);

  useEffect(() => {
    getPostsByUserId(userId).then((allPosts) => {
      if (posts.length > 0) {
        setPosts(posts);
      } else {
        setPosts(allPosts);
      }
    });
  }, []);

  const submitForm = (event) => {
    event.preventDefault();
    setPopupVisibility(false);

    const newPost = {
      userId,
      title,
      body: postText,
    };

    sendPost(newPost).then((post) => {
      setPosts([...posts, post]);
    });
    setTitle('');
    setPostText('');
  };

  const inputTitle = (event) => {
    setTitle(event.target.value);
  };

  const inputPostText = (event) => {
    setPostText(event.target.value);
  };

  const openDetails = (postId) => {
    searchParams.set('postId', postId);
    history.push(`/info${match.url}/?${searchParams.toString()}`);
  };

  return (
    <article
      className="user-posts"
    >
      <h1
        className="title"
      >
        {`${userName} posts:`}
      </h1>
      <hr />
      <ul>
        {posts.map(post => (
          <li
            key={post.id}
            className="box"
          >
            <h2
              className="title"
            >
              {post.title}
            </h2>
            <p
              className="text"
            >
              {post.body}
            </p>
            <br />
            <button
              type="button"
              className="button"
              onClick={() => openDetails(post.id)}
            >
              DETAILS
            </button>
            <br />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="button is-medium is-fullwidth is-info user-posts__button"
        onClick={() => setPopupVisibility(true)}
      >
        Add new
      </button>
      <Popup
        trigger={isPopupVisible}
        setPopupVisibility={setPopupVisibility}
      >
        <h3 className="title">Add new post</h3>
        <form
          onSubmit={submitForm}
        >
          <label className="label" htmlFor="title-1">Title</label>
          <div className="control">
            <input
              id="title-1"
              className="input"
              type="text"
              placeholder="write your title..."
              value={title}
              onChange={inputTitle}
              required
            />
          </div>
          <label className="label" htmlFor="textarea-1">Post</label>
          <div className="control">
            <textarea
              id="textarea-1"
              className="textarea"
              type="email"
              placeholder="write your post..."
              value={postText}
              onChange={inputPostText}
              required
            />
          </div>
          <button
            type="submit"
            className="button is-medium is-fullwidth is-info"
          >
            Send
          </button>
        </form>
      </Popup>
    </article>
  );
};
