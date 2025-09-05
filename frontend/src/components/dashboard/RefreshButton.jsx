import { RotateCcw } from "lucide-react";
export default function RefreshButton({ refreshAction }) {
    return (
        <button
            className="bg-gradient-to-r from-green-300 to-green-500 text-black p-2 rounded-lg 
                            hover:opacity-90 transition-opacity hover:underline hover:scale-110 hover:cursor-pointer
                            flex items-center gap-2 justify-center
                            "
            onClick={refreshAction}
        >
            <RotateCcw /> Refresh
        </button>
    );
}
