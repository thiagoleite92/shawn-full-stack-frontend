'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import UserService from '../../../services/UserService';
import { UserDetailsType } from '../../../../@types/User';
import Img from '../../../components/Img';
import Link from 'next/link';

interface ProfileProps {
  params: {
    username: string;
  };
}

export default function Page({ params: { username } }: ProfileProps) {
  const api = useMemo(() => new UserService(), []);

  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUserDetails = useCallback(
    async (username: string) => {
      setIsLoading(true);

      try {
        const response = await api.getUserDetails(username);

        const { user } = response;

        setUserDetails(user);
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

    fetchUserDetails(username);
  }, [fetchUserDetails, username]);

  return (
    <main className="flex flex-1 justify-center">
      {isLoading && <span>Loading...</span>}

      {!isLoading && (
        <section className="flex w-11/12 flex-col py-3 sm:items-center sm:justify-center sm:gap-8">
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
            <div className="flex flex-col items-center gap-4 ">
              <Img
                src={userDetails?.avatar_url || ''}
                alt="Profile Image"
                width={300}
                height={300}
                customClass="border border-cyan rounded-full p-2 border-cyan-600"
              />
              <span className="border-b border-cyan-600">
                {userDetails?.name}
              </span>
            </div>

            <div className="flex flex-col justify-start gap-4 ">
              {userDetails?.id && (
                <span className="flex gap-4">
                  <strong>ID: </strong>
                  {userDetails?.id}
                </span>
              )}

              {userDetails?.location && (
                <span className="flex gap-4">
                  <strong>Location: </strong>
                  {userDetails?.location}
                </span>
              )}

              {userDetails?.followers && (
                <span className="flex gap-4">
                  <strong>Followers: </strong>
                  {userDetails?.followers}
                </span>
              )}

              {userDetails?.following && (
                <span className="flex gap-4">
                  <strong>Following: </strong>
                  {userDetails?.following}
                </span>
              )}

              {userDetails?.twitter_username && (
                <span className="flex gap-4">
                  <strong>Twitter: </strong>
                  {userDetails?.twitter_username}
                </span>
              )}

              <Link
                href={`/profile/${userDetails?.login}/repos`}
                className="flex gap-4 border-b border-cyan-600 hover:text-cyan-100"
              >
                <strong>Repositories: </strong>
                {userDetails?.public_repos}
              </Link>

              {userDetails?.blog && (
                <a
                  href={userDetails?.blog}
                  className="border-b border-cyan-600 hover:text-cyan-100"
                  target="_blank"
                >
                  <span className="flex gap-4">
                    <strong>Personal Web-Site: </strong>

                    {userDetails?.blog}
                  </span>
                </a>
              )}
              <a
                href={userDetails?.html_url}
                className="border-b border-cyan-600 hover:text-cyan-100"
                target="_blank"
              >
                <span className="flex gap-4  ">
                  <strong>Oficial Github Profile: </strong>

                  {userDetails?.html_url}
                </span>
              </a>
            </div>
          </div>

          {userDetails?.bio && (
            <div>
              <strong>About me: </strong>
              <p>{userDetails?.bio}</p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
