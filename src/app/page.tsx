"use client";

import {getContract} from "thirdweb"
import { ConnectButton, lightTheme } from "thirdweb/react";
import { client } from "./client";
import { sepolia } from "thirdweb/chains";
import { CHARITY_DONATION } from "./constants/contracts";
import { useReadContract } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";

import Footer from "./components/footer";

import Link from 'next/link';
import CampaignCard from "./components/CampaignCard";


import Image from "next/image";

import block from "/assets/block.png"
import people from "/assets/people.png"



export default function Home() {
  const account = useActiveAccount();

  const contract = getContract({
    client : client,
    chain :sepolia,
    address: CHARITY_DONATION
  })
  const { data: charities, isPending} = useReadContract({
    contract,
    method:
      "function getAllCampaigns() view returns ((uint256 charityId, address charityAddress, address owner, string name, uint256 goal, uint256 deadline, uint256 totalDonated)[])",
    params: [],
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 text-white">


<div className="w-[80%] m-auto relative flex py-[100px] justify-between">
        <div className="">
         {/* top text */}
  <div className="mt-7 justify-start text-blue-700 text-sm font-semibold font-epilogue">Web 3 Powered Tech</div>
<div className="justify-start"><span className="text-white text-7xl font-semibold font-epilogue leading-[85px]">Donate </span><span className="text-white text-7xl  font-bold font-epilogue leading-[85px] italic">Crypto<br/></span><span className="text-white text-7xl font-semibold font-epilogue leading-[85px]">Make Real Impact.</span></div>
       {/* ?paragraph 
        */}
          <p className="mt-7 justify-start text-white text-lg font-normal font-epilogue leading-normal tracking-wide">A transparent, decentralized platform connecting donors directly with verified<br /> charities. Track your impact in real-time with blockchain verification.</p>
       

{/* get started now  */}

<div className="flex  sm:flex-row gap-4 justify-start mt-7 items-center ">

<Link href={`/dashboard/${account?.address}`} className="bg-blue-700 text-white px-8 py-3 rounded-full inline-flex items-center font-epilogue font-semibold">
                Donate Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>


              {/* peoples */}
              <div className="flex items-center w-[100px]">  <Image src={people} alt="People" /></div>

            
              </div>

     </div>

{/* block image */}
<div className="flex items-center w-[37%]"><Image src={block} alt="Block app asset"/></div>


</div>



{/* Stats Section - Static */}
      <section className="py-12 bg-black/30 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">$2.4M+</p>
              <p className="text-gray-400 text-sm">Total Donated</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">12,500+</p>
              <p className="text-gray-400 text-sm">Donors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">142</p>
              <p className="text-gray-400 text-sm">Verified Charities</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">100%</p>
              <p className="text-gray-400 text-sm">Transparent</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Static */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform leverages blockchain technology to ensure transparency and direct impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-pink-500"
                >
                  <path d="M18 8V7a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-1" />
                  <path d="M10 7h6l3 5-3 5h-6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
              <p className="text-gray-400">
                Connect your MetaMask or other Web3 wallet to get started. We support multiple blockchains.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-500"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Choose a Charity</h3>
              <p className="text-gray-400">
                Browse verified charities and select one that aligns with your values and interests.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-500"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Track Your Impact</h3>
              <p className="text-gray-400">
                Follow your donation on the blockchain and see the real-world impact through verified updates.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/*Featured Charities - Static  */}
    <section className="py-20 bg-black/30 border-y border-gray-800">
      {/* <div> */}
      <div className="container mx-auto px-4">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold mb-4">Featured Charities</h2>
             <p className="text-gray-400 max-w-2xl mx-auto">
               All charities are thoroughly verified and audited to ensure your donations make the maximum impact.
             </p>
           </div>
        <div className="grid grid-cols-3 gap-4">
          {!isPending && charities && (
            charities.length > 0 ? (
              charities.slice(0, 3).map((charity) => (
          <CampaignCard 
            key={charity.charityAddress}
            charityAddress={charity.charityAddress}
          />               
              ))
            ) : (
              <p>No Campaigns found</p>
            )
          )}
        </div> 
        <div className="text-center mt-10">
           <Link href={`/dashboard/${account?.address}`} className ="border border-gray-700 text-white px-8 py-3 rounded-full inline-flex items-center"
           >
             View All Charities
             <svg
               xmlns="http://www.w3.org/2000/svg"
               width="20"
               height="20"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
               className="ml-2"
                 >
                   <path d="M5 12h14" />
                   <path d="m12 5 7 7-7 7" />
                 </svg>
               </Link>
             </div> 
      </div>
    </section>

            {/* CTA Section - Static */}
      <section id="donate" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-gray-300 mb-8">
              Join thousands of donors who are using crypto to create real-world impact with complete transparency.
            </p>
            <Link href={`/dashboard/${account?.address}`} className="bg-blue-700 text-white px-8 py-3 rounded-full inline-flex items-center">
              Start Donating Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    
{/* footer component */}
<Footer/>


    </div>
  );
}




