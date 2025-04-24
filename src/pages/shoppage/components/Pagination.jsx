// import React from "react";

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//     const handlePrevious = () => {
//         if (currentPage > 1) {
//             onPageChange(currentPage - 1);
//         }
//     };

//     const handleNext = () => {
//         if (currentPage < totalPages) {
//             onPageChange(currentPage + 1);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center mt-8 space-x-4">
//             <button
//                 onClick={handlePrevious}
//                 disabled={currentPage === 1}
//                 className="px-6 py-2 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-800 transition duration-300 disabled:opacity-50"
//             >
//                 <i className="fa-solid fa-chevron-left"></i> Previous
//             </button>

//             <span className="text-xl font-semibold text-gray-800">
//                 Page {currentPage} of {totalPages}
//             </span>

//             <button
//                 onClick={handleNext}
//                 disabled={currentPage === totalPages}
//                 className="px-6 py-2 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-800 transition duration-300 disabled:opacity-50"
//             >
//                 Next <i className="fa-solid fa-chevron-right"></i>
//             </button>
//         </div>
//     );
// };

// export default Pagination;



import React from "react";
import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <motion.button
                    key={i}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onPageChange(i)}
                    className={`w-10 h-10 rounded-full font-medium transition-all ${
                        i === currentPage
                            ? "bg-purple-600 text-white shadow-lg"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                >
                    {i}
                </motion.button>
            );
        }
        return pages;
    };

    return (
        <div className="flex flex-col items-center space-y-4 mt-10">
            <div className="flex items-center space-x-3">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-900 transition"
                >
                    <i className="fa-solid fa-chevron-left mr-2"></i> Prev
                </motion.button>

                <div className="flex gap-2">{renderPageNumbers()}</div>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-full bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-900 transition"
                >
                    Next <i className="fa-solid fa-chevron-right ml-2"></i>
                </motion.button>
            </div>

            <span className="text-gray-600 text-sm">
                Page {currentPage} / {totalPages}
            </span>
        </div>
    );
};

export default Pagination;
