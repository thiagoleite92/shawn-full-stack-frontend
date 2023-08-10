'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import UserService from '../../../services/UserService';
import { RepositoryType } from '../../../../@types/Repositories';
import Link from 'next/link';
import dayjs from 'dayjs';
import { BsCalendar2Date, BsFillKeyFill } from 'react-icons/bs';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { MdUpdate } from 'react-icons/md';
interface ProfileProps {
  params: {
    username: string;
  };
}

export default function Page({ params: { username } }: ProfileProps) {
  const api = useMemo(() => new UserService(), []);

  const [repos, setRepos] = useState<RepositoryType[] | null>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserRepos = useCallback(
    async (username: string) => {
      setIsLoading(true);

      try {
        const response = await api.getUserRepos(username);

        const { repos } = response;

        setRepos(repos);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [api]
  );

  useEffect(() => {
    if (!username) return;

    fetchUserRepos(username);
  }, [fetchUserRepos, username]);

  return (
    <main className="flex flex-1 justify-center">
      {isLoading && <span>Loading...</span>}

      {!isLoading && (
        <section className="flex h-[540px] flex-col  gap-8 overflow-y-auto p-8 md:grid md:grid-cols-4">
          {repos?.map((repo) => {
            return (
              <div
                key={repo?.id}
                className="flex w-full flex-col items-start justify-center rounded-lg border border-cyan-600 bg-cyan-900 p-4"
              >
                <div className="flex flex-col gap-4 space-x-2">
                  {repo?.owner && (
                    <Link
                      href={`/profile/${repo?.owner}/details`}
                      className="flex items-center gap-2 hover:text-cyan-100"
                    >
                      <BsFillKeyFill size={24} />
                      {repo?.owner}
                    </Link>
                  )}

                  {repo?.fullname && (
                    <span className="flex items-center gap-2">
                      <RiGitRepositoryLine size={24} />
                      {repo?.fullname}
                    </span>
                  )}

                  {repo?.createdAt && (
                    <span className="flex items-center gap-2">
                      <BsCalendar2Date size={24} />
                      {dayjs(repo?.createdAt).format('MMM/DD/YY hh:mm A')}
                    </span>
                  )}

                  {repo?.updatedAt && (
                    <span className="flex items-center gap-2">
                      <MdUpdate size={24} />
                      {dayjs(repo?.updatedAt).format('MMM/DD/YY hh:mm A')}
                    </span>
                  )}
                </div>

                <a
                  href={repo?.cloneUrl}
                  className="mt-4 self-center rounded-md border border-cyan-600 bg-cyan-900 p-4 hover:bg-cyan-400 hover:text-cyan-900"
                  target="_blank"
                >
                  Click to Visit
                </a>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}
