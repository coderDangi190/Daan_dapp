"use client";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import {client } from "@/app/client";
import { useParams } from "next/navigation";
import { useReadContract } from "thirdweb/react";
export default function CampaignPage(){
    const {charityAddress} = useParams();

    const contract = getContract({
        client: client,
        chain: sepolia,
        address: charityAddress as string,
    });
    const { data:name, isPending:isLoadingname } = useReadContract({
        contract,
        method: "function name() view returns (string)",
        params: [],
      });
    const { data:description} = useReadContract({
        contract,
        method: "function description() view returns (string)",
        params: [],
    });
    const { data:deadline , isPending:timeloading } = useReadContract({
        contract,
        method: "function deadline() view returns (uint256)",
        params: [],
    });
    const deadlineDate = new Date(parseInt(deadline?.toString()as string)* 1000);
    const deadlinePassed = deadlineDate < new Date();

    const { data:charityGoal , isPending:isLodingGoal } = useReadContract({
        contract,
        method: "function goal() view returns (uint256)",
        params: [],
    });
    const { data:totalRaised, isPending:donatedamount} = useReadContract({
        contract,
        method:"function totalDonated() view returns (uint256)",
        params: [],
    });
    const { data:status, isPending:loadingstatus } = useReadContract({
        contract,
        method: "function status() view returns (uint8)",
        params: [],
    });
    const { data:owner, isPending:loadingOwner } = useReadContract({
        contract,
        method: "function owner() view returns (address)",
        params: [],
    });
    const totalBalance = totalRaised?.toString();
    const totalGoal = charityGoal?.toString();
    let BalancePercentage = (parseInt(totalBalance as string) / parseInt(totalGoal as string)) * 100;

    if(BalancePercentage >= 100){
        BalancePercentage = 100;
    }

    return(
        <div className="mx-auto max-w-7xl px-2 mt-4 sm:px-6 lg:px-8">
            <div>
                {!isLoadingname &&(
                    <p className="text-4xl font-semibold">{name}</p>
                )}
            </div>
            <div className="mt-4">
                <p className="text-lg font-semi" >Description:</p>
                <p>{description}</p>
            </div>
            <div className="mt-4">
                <p className="text-lg font-semi">Goal:</p>
                {!isLodingGoal && (
                    <p>{charityGoal ? Number(charityGoal) / 10**18 : 0} ETH</p>
                )}
            </div>
            <div className="mt-4">
                <p className="text-lg font-semi">Deadline:</p>
                {!timeloading && (
                    <p>{deadlineDate.toDateString()}</p>
                )}
            </div> 
            <div className="mt-4">
                <p className="text-lg font-semi">Status:</p>
                {!loadingstatus && (
                    <p>{status == 0 ? "Active" : status == 1 ? "Completed" : "Failed"}</p>
                )}
            </div>
            <br />
            {!isLodingGoal && !donatedamount &&(
                <div className="mb-4">
                    <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                        <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right" style={{ width: `${BalancePercentage?.toString()}` }}>
                            <p className="text-white dart:text-white text-xs p-1">${totalRaised?.toString()}</p>
                        </div>
                        <p className="absolute top-0 right-0 text-white dark:text-white text-xs p-1">
                            {BalancePercentage >=100 ? "":`${BalancePercentage?.toString()}%`}
                        </p>
                    </div>
                </div>
            )}
            
        </div>
    )
}