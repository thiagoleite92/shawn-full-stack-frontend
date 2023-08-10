'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import UserService from '../../../services/UserService';
import { RepositoryType } from '../../../../@types/Repositories';
import Link from 'next/link';

interface ProfileProps {
  params: {
    username: string;
  };
}

export default function Page({ params: { username } }: ProfileProps) {
  const api = useMemo(() => new UserService(), []);

  const [repos, setRepos] = useState<RepositoryType[] | null>([
    {
      id: 675824813,
      fullname: 'thiagoleite92/Fastify-api',
      private: false,
      owner: 'thiagoleite92',
      createdAt: '2023-08-07T20:16:08Z',
      updatedAt: '2023-08-07T20:16:23Z',
      cloneUrl: 'https://github.com/thiagoleite92/Fastify-api.git',
      language: 'TypeScript',
    },
    {
      id: 670427677,
      fullname: 'thiagoleite92/frontend-posts',
      private: false,
      owner: 'thiagoleite92',
      createdAt: '2023-07-25T03:17:45Z',
      updatedAt: '2023-07-25T03:21:15Z',
      cloneUrl: 'https://github.com/thiagoleite92/frontend-posts.git',
      language: 'TypeScript',
    },
    {
      id: 670293529,
      fullname: 'thiagoleite92/backend-posts',
      private: false,
      owner: 'thiagoleite92',
      createdAt: '2023-07-24T18:10:33Z',
      updatedAt: '2023-07-24T18:13:36Z',
      cloneUrl: 'https://github.com/thiagoleite92/backend-posts.git',
      language: 'TypeScript',
    },
    {
      id: 654449418,
      fullname: 'thiagoleite92/calc-resisted-exercise-intensity',
      private: false,
      owner: 'thiagoleite92',
      createdAt: '2023-06-16T06:46:18Z',
      updatedAt: '2023-06-16T06:46:56Z',
      cloneUrl:
        'https://github.com/thiagoleite92/calc-resisted-exercise-intensity.git',
      language: 'TypeScript',
    },
    {
      id: 636787861,
      fullname: 'thiagoleite92/desafio-desenvolvedor-junior-3',
      private: false,
      owner: 'thiagoleite92',
      createdAt: '2023-05-05T16:37:52Z',
      updatedAt: '2023-05-07T23:30:57Z',
      cloneUrl:
        'https://github.com/thiagoleite92/desafio-desenvolvedor-junior-3.git',
      language: 'TypeScript',
    },
    {
      id: 632637369,
      fullname: 'thiagoleite92/angular-flights',
      private: false,
      owner: 'thiagoleite92',
      createdAt: '2023-04-25T20:27:36Z',
      updatedAt: '2023-04-25T20:28:05Z',
      cloneUrl: 'https://github.com/thiagoleite92/angular-flights.git',
      language: 'TypeScript',
    },
    {
      id: 626676494,
      fullname: 'thiagoleite92/colab-users',
      private: false,
      owner: 'thiagoleite92',
      createdAt: '2023-04-12T00:21:14Z',
      updatedAt: '2023-04-15T01:59:34Z',
      cloneUrl: 'https://github.com/thiagoleite92/colab-users.git',
      language: 'JavaScript',
    },
    {
      id: 619014789,
      fullname: 'thiagoleite92/nestjs-flights',
      private: false,
      owner: 'thiagoleite92',
      createdAt: '2023-03-26T02:12:11Z',
      updatedAt: '2023-04-11T00:58:34Z',
      cloneUrl: 'https://github.com/thiagoleite92/nestjs-flights.git',
      language: 'TypeScript',
    },
  ]);

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
                <div className="flex flex-col gap-2">
                  {repo?.owner && (
                    <Link
                      href={`/profile/${repo?.owner}/details`}
                      className="hover:text-cyan-100"
                    >
                      <strong>Owner: </strong>
                      {repo?.owner}
                    </Link>
                  )}

                  {repo?.fullname && (
                    <span>
                      <strong>Repository: </strong>
                      {repo?.fullname}
                    </span>
                  )}

                  {repo?.createdAt && (
                    <span>
                      <strong>Created: </strong>
                      {repo?.createdAt}
                    </span>
                  )}

                  {repo?.updatedAt && (
                    <span>
                      <strong>Updated: </strong>
                      {repo?.updatedAt}
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
