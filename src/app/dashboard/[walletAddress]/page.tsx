"use client";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { CHARITY_DONATION } from "@/app/constants/contracts";
import { useActiveAccount ,useReadContract, useSendTransaction } from "thirdweb/react";
import { useState } from "react";
import { prepareContractCall, sendTransaction } from "thirdweb"; // Import missing functions
import { deployPublishedContract } from "thirdweb/deploys";
import CampaignCard from "@/app/components/CampaignCard";
import Link from "next/link";

import Footer from '@/app/components/footer'

export default function DashboardPage() {
    const account = useActiveAccount();

    const[isModalOpen, setIsModalOpen] = useState(false);

    const contract = getContract({
        client: client,
        chain: sepolia,
        address:CHARITY_DONATION ,
    });
    const { data, isPending } = useReadContract({
        contract,
        method:
          "function getAllCampaigns() view returns ((uint256 charityId, address charityAddress, address owner, string name, uint256 goal, uint256 deadline, uint256 totalDonated)[])",
        params: [],
    });

       
    return(

        <div  className="mx-auto max-w-7xl px-4 mt-16 sm:px-6 lg:px-8" >
            <div className="flex flex-row justify-between items-center mb-8">
                <p className="text-4xl font-semibold ">All Campaigns</p>
                {/* create camoaign button */}
                {account && (
                    <button className="px-5 py-3 bg-blue-700 text-white rounded-full" onClick={() => setIsModalOpen(true)}>
                        Create Campaign
                    </button>
                ) }

            </div>

            {/* all campaigns map */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {!isPending && data && (
                    data.length > 0 ? (
                        data
                            .map((campaign, index) => (
                                <CampaignCard
                                    key={index}
                                    charityAddress={campaign.charityAddress}
                                />
                            ))
                    ) : (
                        <div className="items-center flex w-full">
                            <p className="flex text-center w-full justify-center text-2xl py-[150px] text-red-600">
                                No Campaign found. Please create a new campaign.
                            </p>
                        </div>
                    )
                )}
            </div>
            {isModalOpen && (
                <CreateCampaignModal
                    setIsModalOpen={setIsModalOpen}
                />
            )}
            <br /><br />

            <Link href="/" className=" flex justify-center bg-blue-700 text-white px-5 py-3 rounded-full ">
                  Back to Home
            </Link>

            {/* spacer */}
            <div className="h-16"></div>

{/* footer */}
<Footer/>


        </div>
    )
}
type CreateCampaignModalProps = {
    setIsModalOpen: (value: boolean) => void;
}

const CreateCampaignModal = ({ setIsModalOpen }: CreateCampaignModalProps) => {
    const account = useActiveAccount();
    const {mutate:sendTransaction, isPending : isCreating } = useSendTransaction();
    const [charityName, setCharityName] = useState<string>("");
    const [charityDescription, setCharityDescription] = useState<string>("");
    const [charityGoal, setCharityGoal] = useState<number>(1);
    const [charityDeadline, setCharityDeadline] = useState<number>(1);
    const [charityAddress, setCharityAddress] = useState<string>("");

    const [error, setError] = useState(" ");

    const handleCreateCampaign = async () => {
       
        try {
            const contract = getContract({
                client: client,
                chain: sepolia,
                address:CHARITY_DONATION ,
            });
            const transaction = await prepareContractCall({
                contract,
                method:
                  "function createCampaign(string _name, string _description, uint256 _goal, uint256 _durationInDays, address _charityWallet) returns (uint256)",
                params: [
                    charityName,
                    charityDescription,
                    BigInt(charityGoal),
                    BigInt(charityDeadline),
                    charityAddress,
                ],
              });
              await sendTransaction(transaction);
              setIsModalOpen(false);
        }
        catch(error){
            console.error("Error preparing transaction:", error);
            return;
        }
    }

    return (
        <div className="fixed  mt-[75px] inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center backdrop-blur-md">
            <div className="bg-black p-6 rounded-md w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold text-white">Create new Campaign</p>
                <button
                className="text-sm px-4 py-2 bg-red-700 text-white rounded-md"
                onClick={() => setIsModalOpen(false)}
                >
               Cancel
                </button>
            </div>
            <div className="flex flex-col  ">
                <label className="text-white">Campaign Name:</label>
                <input
                type="text"
                value={charityName}
                onChange={(e) => setCharityName(e.target.value)}
                className="mb-4 mt-2 px-4 py-2 bg-gray-900 text-white rounded-md"
                placeholder="Enter campaign name"
                required
                />
                <label className="text-white">Campaign Description:</label>
                <textarea
                value={charityDescription}
                onChange={(e) => setCharityDescription(e.target.value)}
                className="mt-2   bg-gray-900 rounded-md p-2 mb-4 text-white"
                placeholder="Enter campaign description"
                required
                />
                <label className="text-white">Campaign Goal:</label>
                <input
                type="number"
                value={charityGoal}
                onChange={(e) => setCharityGoal(parseInt(e.target.value))}
                className="mt-2   bg-gray-900 rounded-md p-2 mb-4 text-white"
                placeholder="Enter campaign goal"
                required
                />
                <label className="text-white">Campaign Deadline:</label>
                <input
                type="number"
                value={charityDeadline}
                onChange={(e) => setCharityDeadline(parseInt(e.target.value))}
                className="mt-2   bg-gray-900 rounded-md p-2 mb-4 text-white"
                placeholder="Enter campaign deadline in Days."
                required
                />
                <label className="text-white">Charity Address:</label>
                <input
                type="text"
                value={charityAddress}
                onChange={(e) => setCharityAddress(e.target.value)}
                className="mt-2  bg-gray-900 rounded-md p-2 mb-4 text-white"
                placeholder="0x.............."
                required
                />
                <button onClick={handleCreateCampaign}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
                disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create Campaign"}
                </button>
            </div>
            </div>

        </div>

    );
};
