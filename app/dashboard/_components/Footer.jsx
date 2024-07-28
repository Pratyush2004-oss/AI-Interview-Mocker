import { FileQuestion, HelpCircle, Home, ShieldPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
  
const Footer = () => {
    const path = usePathname();
    useEffect(() => {

    }, [path])
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
            icon: FileQuestion,
            path: '/dashboard/questions'
        },
        {
            id: 3,
            name: "Upgrade",
            icon: ShieldPlus,
            path: '/dashboard/upgrade'
        },
        {
            id: 4,
            name: "How it works",
            icon: HelpCircle,
            path: '/dashboard/work'
        },
    ]
    return (
        <div className='w-full fixed bottom-0 bg-secondary p-2 shadow-sm'>
            <ul className='flex items-center justify-evenly p-2 sm:hidden'>
                {menuitem.map((item, idx) => (
                    <Link href={item.path} data-tip={item.name} className={`tooltip ${path == item.path ? "text-primary tooltip-open font-bold" : ""} hover:text-primary hover:font-bold transition-all cursor-pointer`} key={idx}><item.icon /></Link>
                ))}
            </ul>
        </div>
    )
}

export default Footer