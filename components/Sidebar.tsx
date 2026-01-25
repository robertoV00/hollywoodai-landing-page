import Link from 'next/link'
import { ArrowTrendingUpIcon, BookmarkIcon, HomeIcon, MagnifyingGlassIcon, QuestionMarkCircleIcon, Squares2X2Icon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'
import LogoutButton from './LogoutButton'

export default function Sidebar() {
  return (
    <>
        <nav className='h-screen md:flex sm:hidden sticky top-0 p-3 border border-gray-200 shadow-none w-[300px] md:w-[250px] transition pl-5'>
            <div className='relative h-full md:pr-12'>
                <div className='py-3 pl-2 mb-3'>
                    <Image 
                    src={'/assets/logo-dark.png'}
                    width={144}
                    height={48}
                    alt='Logo'
                    />
                </div>
                <div className='p-3 text-[12px]'>LINKS</div>
                <ul className='cursor-pointer'>
                    <SidebarLink Icon={Squares2X2Icon} text="Dashboard" href="/dashboard"/>
                    <SidebarLink Icon={BookmarkIcon} text="Favorites" href="/favorites"/>
                    <SidebarLink Icon={MagnifyingGlassIcon} text="Search" href="/search" />
                    <SidebarLink Icon={ArrowTrendingUpIcon} text="Trending" href="/trending"/>
                </ul>

                <div className='p-3 mt-8 text-[12px]'>EXTRAS</div>
                <ul className='cursor-pointer'>
                    <SidebarLink Icon={QuestionMarkCircleIcon} text="Help & Support" href="/help"/>
                    <SidebarLink Icon={Cog6ToothIcon} text="Settings" href="/settings"/>
                    <LogoutButton text="Log out" />
                </ul>
            </div>
        </nav>
    </>
  )
}

interface SidebarLinkProps {
    text: string;
    href: string;
    Icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
} & React.RefAttributes<SVGSVGElement>>;
}

function SidebarLink({text, Icon, href}: SidebarLinkProps) {
    return (
        <Link href={href}>
            <li className='flex items-center space-x-3 p-2.5 rounded-lg transition-colors hover:bg-purple-100 hover:text-purple-800'>
                <Icon className='h-[20px] hover:text-purple-800'/>
                <span className='text-[14px] text-nowrap'>
                    {text}
                </span>
            </li>
        </Link>
    )
}