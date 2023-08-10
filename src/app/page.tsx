'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import UserService from './services/UserService';
import { UserType } from '../@types/User';
import InfiniteScroll from 'react-infinite-scroll-component';
import UsersList from './components/UsersList';

export default function Home() {
  const api = useMemo(() => new UserService(), []);

  const [usersList, setUsersList] = useState<Array<UserType> | []>([]);
  const [sinceId, setSinceId] = useState<string>('');

  const fetchUsersList = useCallback(async () => {
    try {
      const { list, sinceId: id } = await api.getUsersList();

      setUsersList(list);
      setSinceId(id);
    } catch (error) {}
  }, [api]);

  const fetchMoreUsers = useCallback(async () => {
    try {
      const { list, sinceId: id } = await api.getUsersList(sinceId);

      setUsersList((oldState: UserType[]) => {
        return [...oldState, ...list];
      });
      setSinceId(id);
    } catch (error) {}
  }, [api, sinceId]);

  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);

  return (
    <main className="flex flex-1 justify-center">
      <InfiniteScroll
        dataLength={usersList.length}
        next={fetchMoreUsers}
        hasMore={true}
        loader={
          <h4 className="mx-auto my-4 flex justify-center">Loading...</h4>
        }
        height={600}
        className="w-[375px] px-4 sm:w-[1024px]"
      >
        <UsersList usersList={usersList} />
      </InfiniteScroll>
    </main>
  );
}
