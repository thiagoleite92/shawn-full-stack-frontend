import React from 'react';
import { UserType } from '../../../@types/User';
import Img from '../Img';
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';
import { RiGitRepositoryLine } from 'react-icons/ri';

interface UsersListProps {
  usersList: UserType[];
}

export default function UsersList({ usersList }: UsersListProps) {
  return (
    <ul className="flex w-full flex-col justify-center space-y-4">
      {usersList?.map(({ login, avatar_url, id }) => {
        return (
          <li
            className="h-fit w-full items-center justify-around border border-cyan-800 p-4 sm:flex sm:w-full"
            key={id}
          >
            <Img
              src={avatar_url}
              alt="Profile Image"
              width={180}
              height={120}
              customClass="rounded-full border border-cyan-400 p-4"
            />

            <div className="flex  flex-col gap-4">
              <span className="flex gap-4">
                <strong>Username: </strong> {login}
              </span>
              <span className="flex gap-4">
                <strong>ID: </strong> {id}
              </span>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 ">
              <strong className="flex gap-4">Click to view more</strong>
              <Link
                className="flex items-center gap-4 rounded-md bg-cyan-900 px-5 py-2 hover:text-cyan-100"
                href={`/profile/${login}/details`}
              >
                See Profile <AiOutlineUser size={24} />
              </Link>
              <Link
                className="flex items-center gap-4 rounded-md bg-cyan-900 px-5 py-2 hover:text-cyan-100"
                href={`/profile/${login}/repos`}
              >
                See Repos <RiGitRepositoryLine size={24} />
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
