
import { Outlet } from 'react-router'
export default function ApiDocs() {
    return (
        <div className="container mx-auto px-6 py-10 text-justify">
            <Outlet />
        </div>
    );
}