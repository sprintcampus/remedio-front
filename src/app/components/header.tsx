"use client"

import VerticalNavigation from './nav'
import { useState } from 'react'

export default function HeaderApp() {
    const [showVerticalNav, setShowVerticalNav] = useState(false)

    function onClickMenu() {
        setShowVerticalNav(!showVerticalNav)
    }

    return (
        <div>
            <header className="
                h-24 
                sm:h-32 
                flex 
                items-center 
                z-30 
                w-full">
                <div className="
                    container 
                    mx-auto 
                    px-6 flex 
                    items-center 
                    justify-between">
                    <div className="
                        uppercase 
                        text-gray-800 
                        font-black 
                        text-3xl">
                        <a href="/">
                            REMEDIOS.APP
                        </a>
                    </div>
                    <div className="
                        flex 
                        items-center">
                        <nav className="
                            font-sen 
                            text-gray-800 
                            uppercase 
                            text-lg 
                            lg:flex 
                            items-center 
                            hidden">
                            <a href="/" className="
                                py-2 
                                px-6 
                                flex">
                                Home
                            </a>
                            <a href="/remedios/cadastrar" className="py-2 px-6 flex">
                                Cadastrar remédio
                            </a>
                            <a href="/remedios" className="py-2 px-6 flex">
                                Listar remédios
                            </a>
                        </nav>
                        <button className="
                            lg:hidden 
                            flex 
                            flex-col 
                            ml-4 
                            relative group" onClick={onClickMenu}>
                            <span className="
                                w-6
                                h-1 
                                bg-gray-800 
                                mb-1
                                transform 
                                transition-transform 
                                duration-200 
                                ease-in group-hover:rotate-45 
                                group-hover:translate-y-2" />
                            <span className="
                                w-6
                                h-1 
                                bg-gray-800 
                                mb-1 opacity-100 
                                transition-opacity 
                                duration-200 
                                ease-in group-hover:opacity-0" />
                            <span className="
                                w-6 h-1 
                                bg-gray-800 
                                mb-1 
                                transform 
                                transition-transform 
                                duration-200 
                                ease-in group-hover:-rotate-45 
                                group-hover:-translate-y-2" />
                        </button>

                    </div>
                </div>
            </header>
            {showVerticalNav ? <VerticalNavigation /> : ""}
            
        </div>
    )
}