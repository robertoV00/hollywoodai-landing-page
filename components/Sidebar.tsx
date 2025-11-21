import { ArrowTrendingUpIcon, BookmarkIcon, HomeIcon, MagnifyingGlassIcon, QuestionMarkCircleIcon, Squares2X2Icon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import React from 'react'

export default function Sidebar() {
  return (
    <>
        <div>
            <h4>LINKS</h4>
            <ul>
                <SidebarLink Icon={Squares2X2Icon} text="Dashboard"/>
                <SidebarLink Icon={BookmarkIcon} text="Favorites"/>
                <SidebarLink Icon={MagnifyingGlassIcon} text="Search"/>
                <SidebarLink Icon={ArrowTrendingUpIcon} text="Trending"/>
            </ul>

            <h4>EXTRAS</h4>
            <ul>
                <SidebarLink Icon={QuestionMarkCircleIcon} text="Help & Support"/>
                <SidebarLink Icon={Cog6ToothIcon} text="Settings"/>
                <SidebarLink Icon={UserCircleIcon} text="Log out"/>
            </ul>
        </div>

    </>
  )
}


function SidebarLink({text, Icon}) {
    return <li>
            <Icon />
            {text}
        </li>
}