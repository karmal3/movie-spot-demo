import React from 'react'
import PropTypes from 'prop-types';

export default function CustomModal({ children, open, onClose }) {
    return (
        open &&
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
            <div onClick={onClose} className="absolute bg-[#111111] bg-opacity-80 inset-0 z-0"></div>
            <div className="w-full px-2" style={{ maxWidth: "853px" }}>
                {/* <div className="flex justify-end relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white shadow-sm outline-none cursor-pointer hover:text-red-500 transition transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div> */}
                <div className="w-full relative" style={{ paddingBottom: "56.25%" }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

CustomModal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element.isRequired
    ]),
}

