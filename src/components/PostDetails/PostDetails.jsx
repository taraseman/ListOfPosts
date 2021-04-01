import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  getPostById,
  getCommentsByPostId,
  editPostByBody,
  deletePostById,
} from '../../helpers';

import { Popup } from '../Popup';
import { PostsContext } from '../PostsContext';

import './PostDetails.scss';

export const PostDetails = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const location = useLocation();

  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [newComment, inputNewComment] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get('postId');
  const userName = searchParams.get('user-name');

  useEffect(() => {
    getPostById(postId);
    const postFromContext = posts
      .find(currentPost => currentPost.id === +postId);

    setPost(postFromContext);
    getCommentsByPostId(postId)
      .then(chosenComments => setComments(chosenComments));
  },
  []);

  const deletePost = (id) => {
    deletePostById(id);
    setPosts(
      posts.filter(postDel => postDel.id !== +id),
    );
  };

  const submitForm = () => {
    editPostByBody({
      ...post,
      title,
      body: newComment,
    }).then((editedPost) => {
      setPost(editedPost);
      setPosts(
        posts.map(curPost => (curPost.id === +postId ? editedPost : curPost)),
      );

      setPopupVisibility(false);
    });
  };

  const editPost = (oldTitle, oldPost) => {
    setTitle(oldTitle);
    inputNewComment(oldPost);

    setPopupVisibility(true);
  };

  return (
    <article className="post">
      <Link
        to="/"
        className="post__link-to-home"
      >
        HOME
      </Link>
      <div className="box">
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{`${post.title}`}</strong>
                <br />
                {post.body}
                <p className="post__user-name">
                  <small>{`${userName} [#${post.userId}]`}</small>
                </p>
              </p>
            </div>
          </div>
        </article>
        <button
          type="button"
          className="button is-small is-info post__button"
          onClick={() => editPost(post.title, post.body)}
        >
          EDIT
        </button>
        <Link to="/">
          <button
            type="button"
            className="button is-small is-info is-light post__button"
            onClick={() => deletePost(post.id)}
          >
            DELETE
          </button>
        </Link>
      </div>
      <h2 className="title is-4">
        Comments:
      </h2>
      <ul className="post__comments">
        {comments.map(comment => (
          <li
            key={comment.id}
            className="box"
          >
            <strong>{comment.name}</strong>
            <p>
              {comment.body}
            </p>
            <a href={`mailto:${comment.email}`}>{comment.email}</a>
          </li>
        ))}
      </ul>
      <Popup
        trigger={isPopupVisible}
        setPopupVisibility={setPopupVisibility}
      >
        <h3 className="title">Edit</h3>
        <form
          onSubmit={submitForm}
        >
          <label className="label" htmlFor="title-11">Title</label>
          <div className="control">
            <input
              id="title-11"
              className="input"
              type="text"
              placeholder="write your title..."
              value={title}
              onChange={event => setTitle(event.target.value)}
              required
            />
          </div>
          <label className="label" htmlFor="textarea-11">Comment</label>
          <div className="control">
            <textarea
              id="textarea-11"
              className="textarea"
              type="email"
              placeholder="write your comment..."
              value={newComment}
              onChange={event => inputNewComment(event.target.value)}
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
