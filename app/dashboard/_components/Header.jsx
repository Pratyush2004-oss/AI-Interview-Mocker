import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
    const path = usePathname();
    useEffect(()=>{

    },[path])
    const menuitem = [
        {
            id: 1,
            name: "Dashboard",
            icon: Home,
            path: '/dashboard'
        },
        {
            id: 2,
            name: "Questions",
            icon: Home,
            path: '/dashboard/questions'
        },
        {
            id: 3,
            name: "Upgrade",
            icon: Home,
            path: '/dashboard/upgrade'
        },
        {
            id: 4,
            name: "How it works",
            icon: Home,
            path: '/dashboard/work'
        },
    ]
    return (
        <div className='flex sticky top-0 items-center justify-between bg-secondary shadow-sm px-1'>
            <Image src={'/AI-Mock-logo.png'} width={80} height={70} alt='logo' className='rounded-lg'></Image>
            <ul className='sm:flex gap-6 hidden'>
                {menuitem.map((item, idx) => (
                    <Link href={item.path} className={`${path == item.path ? "text-primary font-bold" : "" } hover:text-primary hover:font-bold transition-all cursor-pointer`} key={idx}>{item.name}</Link>
                ))}
            </ul>
            <UserButton />
        </div>
    )
}

export default Header