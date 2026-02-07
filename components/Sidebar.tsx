"use client"

import Link from 'next/link'
import { ArrowTrendingUpIcon, BookmarkIcon, HomeIcon, MagnifyingGlassIcon, QuestionMarkCircleIcon, Squares2X2Icon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React, { useState } from 'react'
import LogoutButton from './LogoutButton'

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
        {/* Mobile hamburger menu button - visible only on screens < 764px */}
        <button
          onClick={toggleSidebar}
          className='lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg  text-black hover:bg-gray-300 transition'
          aria-label='Toggle sidebar'
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

        </button>

        {/* Overlay for mobile - visible when sidebar is open */}
        {isSidebarOpen && (
          <div
            className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar - slides away on screens smaller than 764px (lg breakpoint) */}
        <nav className={`fixed lg:sticky top-0 left-0 h-screen flex lg:flex p-3 border border-gray-200 shadow-none w-[300px] md:w-[250px] transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:w-[250px] lg:border-r lg:shadow-none pl-5 bg-white`}>
            {/* Close button for mobile */}
            <button
              onClick={closeSidebar}
              className='lg:hidden absolute top-4 right-4 p-1'
              aria-label='Close sidebar'
            >
              <XMarkIcon className='h-6 w-6' />
            </button>

            <div className='relative h-full md:pr-12 w-full'>
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
                    <SidebarLink Icon={MagnifyingGlassIcon} text="Search" href="" disabled/>
                    <SidebarLink Icon={ArrowTrendingUpIcon} text="Trending" href="" disabled/>
                </ul>

                <div className='p-3 mt-8 text-[12px]'>EXTRAS</div>
                <ul className='cursor-pointer'>
                    <SidebarLink Icon={QuestionMarkCircleIcon} text="Help & Support" href="" disabled/>
                    <SidebarLink Icon={Cog6ToothIcon} text="Settings" href="/settings"/>
                    <LogoutButton text="Log out" />
                </ul>
            </div>
        </nav>

        {/* Optional: Add navigation link handlers to close sidebar on mobile */}
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
    disabled?: boolean;
}

function SidebarLink({text, Icon, href, disabled = false}: SidebarLinkProps) {
    if (disabled) {
        return (
            <li className='flex items-center  space-x-3 p-2.5 rounded-lg transition-colors cursor-not-allowed'>
                <Icon className='h-[20px]'/>
                <span className='text-[14px] text-nowrap '>
                    {text}
                </span>
            </li>
        )
    }
    
    return (
        <Link href={href} className='w-full'>
            <li className='flex items-center space-x-3 p-2.5 rounded-lg transition-colors hover:bg-purple-100 hover:text-purple-800'>
                <Icon className='h-[20px] hover:text-purple-800'/>
                <span className='text-[14px] text-nowrap'>
                    {text}
                </span>
            </li>
        </Link>
    )
}