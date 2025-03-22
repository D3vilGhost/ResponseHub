import React, { useState } from 'react';
import { GitPullRequestCreateArrow, FilePlus2 } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import API_KEY from '../components/dashboard/API_KEY';
import CallRecords from '../components/dashboard/CallRecords';
import FixedResponse from "../components/dashboard/FixedResponse"
import CreateFixedResponse from '../components/dashboard/CreateFixedResponse';
import EditFixedResponse from '../components/dashboard/EditFixedResponse';
import ConfirmDelete from '../components/dashboard/ConfirmDelete';
export default function Dashboard({ loading, setLoading }) {
    const [showCreateFixedRespone, setShowCreateFixedResponse] = useState(false);
    const [showEditFixedResponse, setShowEditFixedResponse] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [currentResponseData, setCurrentResponseData] = useState(null);

    // above state represents data under consideration whether create, edit or delele

    return (
        <div className="container mx-auto px-6 py-8">

            <DashboardHeader />
            <API_KEY API_KEY='abc' />
            {/* User's Fixed APIs */}
            <div className='mb-6 bg-white p-4 rounded-xl shadow-md '>
                {/* Header */}
                <div className="flex items-center w-full gap-4 mb-6 ">
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <GitPullRequestCreateArrow className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className='flex-grow'>
                        <p className="text-lg font-semibold">Your Fixed API Endpoints</p>
                    </div>
                    <div
                        className="flex-shrink-0 content-center items-center justify-center gap-2 w-fit"
                    >
                        <div className='bg-gradient-to-r from-green-300 to-green-500 text-black p-2 rounded-lg 
                            hover:opacity-90 transition-opacity hover:underline hover:scale-110 hover:cursor-pointer
                            flex items-center gap-2 justify-center
                            '
                            onClick={() => {
                                setShowCreateFixedResponse(true);
                            }}>
                            <FilePlus2 /> Create
                        </div>
                    </div>
                </div>
                {/* Available APIS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 z-0">
                    <FixedResponse
                        setShowConfirmDelete={setShowConfirmDelete}
                        setShowEditFixedResponse={setShowEditFixedResponse}
                        setCurrentResponseData={setCurrentResponseData}
                        data={
                            {
                                endpoint: "Hello",
                                method: "GET",
                                response: `{\n\ta:"abc",\n\tb:"abc"\n}`
                            }
                        }
                        onEdit={
                            (data) => {
                                setShowEditFixedResponse(true);
                                setCurrentResponseData(data);
                            }
                        }
                        onDelete={
                            (data) => {
                                setShowConfirmDelete(true);
                                setCurrentResponseData(data);
                            }
                        }
                    />
                </div>
            </div>

            {/* Different forms */}
            <div>
                {/* Create New Response Form  */}
                {showCreateFixedRespone && (
                    <CreateFixedResponse
                        onCancel={() => {
                            setShowCreateFixedResponse(false);
                        }}
                        onSave={(data) => {
                            alert("Please change logic of save in Dashboard.jsx");

                            setShowCreateFixedResponse(false);
                        }}
                    />
                )}

                {/* Edit Fixed Response form */}
                {showEditFixedResponse && (
                    <EditFixedResponse
                        currentResponseData={currentResponseData}
                        setCurrentResponseData={setCurrentResponseData}
                        onCancel={() => {
                            setShowEditFixedResponse(false);
                        }}
                        onSave={() => {
                            alert("Please change logic of edit in FixedResponse.jsx");
                            setShowEditFixedResponse(false);
                        }}
                    />
                )}

                {/* Confirm Delete form */}
                {showConfirmDelete && (
                    <ConfirmDelete
                        onCancel={() => {
                            setShowConfirmDelete(false);
                            setCurrentResponseData(null);
                        }}
                        onConfirm={() => {
                            alert("Please change logic of delete in Dashboard.jsx");
                            setShowConfirmDelete(false);
                        }}
                    />
                )}

            </div>

            {/* API Call's history */}
            <CallRecords
                onClearRecords={() => {
                    if (confirm("Your History will be cleared. This action is irreversible!")) {
                        alert("Sorry logic hasn't been created yet!")
                    }
                }} />
        </div >
    );
}