import React from 'react'
import { Link } from 'react-router'
export default function KnowAbout() {
    return (
        <section className='mb-10'>
            <div className="text-2xl font-semibold mb-2">Click Here To Know About</div>
            <hr />
            <ul className="list-disc pl-6 py-4">
                <li>
                    <Link to="/docs/request" className='text-xl text-blue-600 hover:text-blue-900 hover:underline'>Request Format</Link>
                </li >
                <li>
                    <Link to="/docs/response" className='text-xl text-blue-600 hover:text-blue-900 hover:underline'>Response Format</Link>
                </li>
            </ul >
        </section >
    )
}
