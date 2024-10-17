import React from 'react';

export default function Submitting() {
    return (
        <div className="fixed inset-0 flex items-center justify-center w-full px-4 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center w-full max-w-xs sm:max-w-sm">
                <div className="loader border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 animate-spin"></div>
                <p className="mt-4 text-base sm:text-lg text-gray-700">잠시만 기다려주세요!</p>
            </div>
        </div>
    );
}
