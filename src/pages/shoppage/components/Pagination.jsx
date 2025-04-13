import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center items-center mt-8 space-x-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-6 py-2 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-800 transition duration-300 disabled:opacity-50"
            >
                <i className="fa-solid fa-chevron-left"></i> Previous
            </button>

            <span className="text-xl font-semibold text-gray-800">
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-6 py-2 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-800 transition duration-300 disabled:opacity-50"
            >
                Next <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Pagination;
