const baseUrl = 'https://jsonplaceholder.typicode.com';

export const getUsers = () => (
  fetch(`${baseUrl}/users`)
    .then(resolve => resolve.json()));

export const getPostsByUserId = id => (
  fetch(`${baseUrl}/posts?userId=${id}`)
    .then(resolve => resolve.json()));

export const sendPost = bodyData => (
  fetch(`${baseUrl}/posts`, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
  })
    .then(resolve => resolve.json()));

export const getPostById = postId => (
  fetch(`${baseUrl}/posts/${postId}`)
    .then(resolve => resolve.json()));

export const getCommentsByPostId = postId => (
  fetch(`${baseUrl}/comments?postId=${postId}`)
    .then(resolve => resolve.json()));

export const editPostByBody = bodyData => (
  fetch(`${baseUrl}/posts/${bodyData.id}`, {
    method: 'PUT',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(resolve => resolve.json()));

export const deletePostById = postId => (
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE',
  }));
