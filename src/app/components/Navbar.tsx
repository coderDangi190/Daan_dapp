'use client'
import Link from "next/link";
import { useActiveAccount , ConnectButton ,lightTheme} from "thirdweb/react";
import { client } from "@/app/client";

import Image from "next/image";

import logo from "/assets/logo.png"

const Navbar = ()=>{
    const account = useActiveAccount();
    return(
        <nav className="border-b border-gray-800 backdrop-blur-md bg-black/30 sticky top-0 z-50 ">
            <div className="container mx-auto px-[100px] sm:px-4 py-4 flex items-center justify-between  w-[75%] sm:w-[95%]">
                <div className="flex items-center gap-2 ">
                  <Link href="/">
                <Image   src={logo} alt="Daan App Logo" width={100}/>
                </Link>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-white font-medium transition-colors">
                      Home
                    </Link>
                    <Link href={`/dashboard/${account?.address}`}  className="text-gray-300 hover:text-white transition-colors">
                      Campaigns
                    </Link>
                    <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                      How it Works
                    </Link>
                    <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                      About
                    </Link>
                 
                    
                    {account && (
                      <Link href={`/dashboard/${account?.address}`} className="text-gray-300 hover:text-white transition-colors">
                        Dashboard
                      </Link> 
                    )}                                                               
                </div>
                <div>
                  <ConnectButton 
                  client={client}
                  theme ={lightTheme()}
                  connectButton={{label:"Connect wallet",

style:{
                    backgroundColor:"#1D4ED8",
                    color:"white",
                    borderRadius:"9999px",
                    padding:"10px 20px",
                   
                  },
                


                  }}
                
                  />        
                </div>

            </div>
        </nav>

    )
}
export default Navbar;