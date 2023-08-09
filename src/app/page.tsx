'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import UserService from './services/UserService';
import { UserType } from '../@types/User';

export default function Home() {
  const api = useMemo(() => new UserService(), []);

  const [usersList, setUsersList] = useState<Array<UserType> | []>([]);
  const [nextPage, setNextPage] = useState<string>('');

  const fetchUsersList = useCallback(async () => {
    try {
      const { list, nextLink } = await api.getUsersList();

      setUsersList(list);
      setNextPage(nextLink);
    } catch (error) {}
  }, [api]);

  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);

  return (
    <ul>
      {usersList?.length > 0 &&
        usersList?.map(({ id, login, avatar_url }) => (
          <li key={id}>{login}</li>
        ))}
    </ul>
  );
}
