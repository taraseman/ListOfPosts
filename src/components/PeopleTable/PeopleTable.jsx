import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getUsers } from '../../helpers';

export const PeopleTable = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const history = useHistory();

  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    getUsers().then((allUsers) => {
      setUsers(allUsers);
    });
  }, []);

  const openUserPosts = (id, name) => {
    searchParams.set('user-name', name);
    history.push(`${id}?${searchParams.toString()}`);
  };

  return (
    <>
      <h1 className="title">People</h1>
      <table className="table is-fullwidth  is-narrow">
        <thead>
          <tr>
            <th>
              id
            </th>
            <th>
              name
            </th>
            <th>
              email
            </th>
            <th>
              phone
            </th>
            <th>
              posts
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr
              key={user.id}
            >
              <td>{`#${user.id}`}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  type="button"
                  className="PostsList__button button is-info"
                  onClick={() => openUserPosts(user.id, user.name)}
                >
                  Posts
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
