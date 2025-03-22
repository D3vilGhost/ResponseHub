import { ChevronLeft, ChevronRight } from 'lucide-react'
export default function Pagination({
    goToPreviousPage,
    goToNextPage,
    recordsPageNumber
}) {
    return (
        <div className=' flex gap-1 items-center justify-center m-2 p-2 text-center'>

            <div className={`rounded-md p-2 w-10 
                    ${(recordsPageNumber == 1) ?
                    "bg-gray-200 hover:cursor-not-allowed" :
                    "bg-orange-200 hover:bg-orange-300 hover:scale-105 hover:cursor-pointer"}
                 `}

                onClick={goToPreviousPage}
            >
                <ChevronLeft />
            </div>
            <div
                className="bg-orange-300 rounded-md p-2 w-10"
            // placeholder={recordsPageNumber}
            // type="number"
            // value={recordsPageNumber}
            >
                {recordsPageNumber}
            </div>
            <div className="rounded-md p-2 w-10 bg-orange-200 hover:bg-orange-300 hover:scale-105 hover:cursor-pointer"
                onClick={goToNextPage}
            >
                <ChevronRight />
            </div>
        </div >
    )
}
