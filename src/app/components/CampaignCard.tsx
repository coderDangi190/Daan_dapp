import { getContract, prepareContractCall } from "thirdweb";
import { client } from "../client";
import { sepolia } from "thirdweb/chains";
import { useReadContract, useSendTransaction } from "thirdweb/react";
import Link from "next/link";
import { useState } from "react";


type CampaignCardProps = {
    charityAddress: string;
};

export default function CampaignCard({ charityAddress }: CampaignCardProps) {
    // const {mutate: sendTransaction , isLoading, isSuccess} = useSendTransaction();
    

    const contract = getContract({
        client: client,
        chain: sepolia,
        address: charityAddress,
    });
    const { data:charityName } = useReadContract({
        contract,
        method: "function name() view returns (string)",
        params: [],
    });
    const { data: charityDescription} = useReadContract({
        contract,
        method: "function description() view returns (string)",
        params: [],
    });
    const { data: charityGoal,isPending:isLoadingGoal } = useReadContract({
        contract,
        method: "function goal() view returns (uint256)",
        params: [],
    });
    const { data: deadline} = useReadContract({
        contract,
        method: "function deadline() view returns (uint256)",
        params: [],
    });
    const deadlineDate = new Date(parseInt(deadline?.toString()as string)* 1000);
    const deadlinePassed = deadlineDate < new Date();

    const { data:owner, isPending:loadingOwner } = useReadContract({
        contract,
        method: "function owner() view returns (address)",
        params: [],
    });
    const { data:status } = useReadContract({
        contract,
        method: "function status() view returns (uint8)",
        params: [],
    });
    const { data:totalRaised, isPending:loadingbalance } = useReadContract({
        contract,
        method:"function totalDonated() view returns (uint256)",
        params: [],
    });


    const totalBalance = totalRaised?.toString();
    const totalGoal = charityGoal?.toString();
    let BalancePercentage = Math.min((parseInt(totalBalance as string) / parseInt(totalGoal as string)) * 100,100);

    if(BalancePercentage >= 100){
        BalancePercentage = 100;
    }
    const {mutate:sendTransaction, isPending , isSuccess} = useSendTransaction();
    const [amount, setAmount] = useState("");


    
    const handleDonate = () => {
        
        const parsedAmount = parseFloat(amount);
        if(isNaN(parsedAmount) || parsedAmount <= 0){
            console.error("Invalid amount");
            return;
        }
        const value = parsedAmount * 10 ** 18; // Value in wei
        const valueInWei = value.toString();
        try{
            const transaction = prepareContractCall({
                contract,
                method:"function donate() payable",
                params:[],
                value: BigInt(valueInWei),
            });
            sendTransaction(transaction,{
                onSuccess: () => {
                   alert("Donation successful!!, Thankyou for your support");
                    setAmount("");
                },
                onError: (error) => {
                    console.error("Transaction failed:", error);
                },
            })
        }
        catch(error){
            console.error("Error preparing transaction:", error);
            return;
        }

    }

    return(
        <div className="flex flex-col justify-between max-w-sm p-6 bg-gray-800 border border-slate-200 rounded-lg shadow">
            <div>
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">{charityName}</h3>
                <p className="mb-3 font-normal text-gray-300 dark:test-gray-400">{charityDescription}</p>

                {!isLoadingGoal && !loadingbalance &&(
                    <div className="mb-4">
                        <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                            <div className="h-6 bg-blue-700 rounded-full dark:bg-blue-500 text-right" style={{ width: `${BalancePercentage?.toString()}` }}>
                                <p className="text-white dart:text-white text-xs p-1">${totalRaised?.toString()}</p>
                            </div>
                            <p className="absolute top-0 left-[20px] text-white dark:text-white text-xs p-1 font-bold">
                                {BalancePercentage >=100 ? "":`${BalancePercentage?.toString()}%`}
                            </p>
                        </div>
                    </div>
                )}

            </div>
                <Link href={`/campaign/${charityAddress}`} passHref={true} className="text-cyan-400 text-sm hover:underline">
                    View Details
                </Link>
                <div className="pt-4 flex flex-col ">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-md font-medium text-xs"
                        placeholder="Enter eth amount to donate"
                    />
                    <button 
                        onClick={handleDonate} 
                        disabled={isPending} 
                        className=" w-fulll px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-800"
                    >
                        {isPending ? "Processing..." : "Donate Now"}
                    </button>

                </div>
        </div>
    )
}