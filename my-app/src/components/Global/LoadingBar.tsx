import React from "react";

export default function LoadingBar() {
    return (
        <div className="fixed z-10 h-screen w-screen bg-slate-800/90 top-0 left-0">
            <div className="flex justify-center align-middle items-center h-full w-full">
                <div className="flex justify-center items-center h-32 w-32 rounded-full bg-gradient-to-tr from-fuchsia-800 to-white/40 animate-spin">
                    <div className="m-auto my-auto z-20 h-24 w-24 bg-slate-800 rounded-full">
                    </div>
                </div>
            </div>
        </div>
    )
}