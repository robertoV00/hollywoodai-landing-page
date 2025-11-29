import { ArrowTrendingUpIcon, BookmarkIcon, HomeIcon, MagnifyingGlassIcon, QuestionMarkCircleIcon, Squares2X2Icon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'

export default function Sidebar() {
  return (
    <>
        <nav className='h-screen md:flex sm:hidden sticky top-0 p-3 border border-gray-200 shadow-none w-[300px] md:w-[250px] transition'>
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
                <ul>
                    <SidebarLink Icon={Squares2X2Icon} text="Dashboard"/>
                    <SidebarLink Icon={BookmarkIcon} text="Favorites"/>
                    <SidebarLink Icon={MagnifyingGlassIcon} text="Search"/>
                    <SidebarLink Icon={ArrowTrendingUpIcon} text="Trending"/>
                </ul>

                <div className='p-3 mt-8 text-[12px]'>EXTRAS</div>
                <ul>
                    <SidebarLink Icon={QuestionMarkCircleIcon} text="Help & Support"/>
                    <SidebarLink Icon={Cog6ToothIcon} text="Settings"/>
                    <SidebarLink Icon={UserCircleIcon} text="Log out"/>
                </ul>
            </div>
        </nav>

    </>
  )
}

interface SidebarLinkProps {
    text: string;
    Icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
} & React.RefAttributes<SVGSVGElement>>;
}


function SidebarLink({text, Icon}: SidebarLinkProps) {
    return <li className='flex items-center space-x-3 p-2.5'>
            <Icon className='h-[20px]'/>
            <span className='text-[14px] text-nowrap'>
                {text}
            </span>
        </li>
}