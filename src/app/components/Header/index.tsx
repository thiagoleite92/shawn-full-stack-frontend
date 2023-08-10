'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BsArrowLeft, BsGithub } from 'react-icons/bs';

export default function Header() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <header className="flex items-center justify-evenly gap-4 border-b border-cyan-600  py-4 text-lg ">
      {pathname === '/' ? (
        ''
      ) : (
        <Link href={'/'}>
          <BsArrowLeft size={48} />
          Back to List
        </Link>
      )}
      <BsGithub size={48} />
      <h1 className="">
        {pathname?.includes('details')
          ? 'User Details'
          : pathname?.includes('repos')
          ? 'User Repositores'
          : 'Users List'}
      </h1>
    </header>
  );
}
