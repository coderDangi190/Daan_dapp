"use client";
import Link from "next/link"
import { getContract } from "thirdweb";
import { useActiveAccount } from "thirdweb/react"
import { client } from "../client";
import { sepolia } from "thirdweb/chains";
import { CHARITY_DONATION } from "../constants/contracts";
import { useReadContract } from "thirdweb/react";

export default function DonatePage() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Donate Page</h1>
        <p className="mb-6">This is a simple static donate page with no client components or hooks.</p>

        <Link href="/" className="bg-pink-600 text-white px-4 py-2 rounded-md inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
