import React, { useState } from "react";

export default function ModalEdit({closeModal, novelTextSize, novelBackgroundColor, novelAligiment, novelPading, changeTextSize, changeBackgroundColor, changeAligiment, changePading}) {
  
  return (
    <div>
      
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded shadow-lg z-50">
            <div className="flex flex-col w-80 bg-slate-600 p-4 text-white">
              <div>
                Màu nền
                <div className="flex flex-row mt-2">
                  <button className="w-8 h-8 bg-red-500 " ></button>
                  <button className="w-8 h-8 bg-blue-500"  ></button>
                  <button className="w-8 h-8 bg-green-500" ></button>
                  <button className="w-8 h-8 bg-yellow-500"  ></button>
                  <button className="w-8 h-8 bg-purple-500"></button>
                  <button className="w-8 h-8 bg-pink-500" ></button>
                  <button className="w-8 h-8 bg-gray-500" ></button>
                  <button className="w-8 h-8 bg-black" ></button>
                  <button className="w-8 h-8 bg-white" ></button>
                </div>
              </div>
              <div className="mt-4">
                Font chữ
                <div className="flex flex-row mt-2">
                  {/* Các nút chỉnh font chữ sẽ được thêm ở đây */}
                </div>
              </div>
              <div className="mt-4">
                Kích cỡ chữ
                <div className="flex flex-row mt-2 justify-center items-center space-x-2">
                  <button className="px-2 py-1 bg-gray-700 text-white rounded">-</button>
                  <input type="text" value="16" placeholder={novelTextSize} className="w-12 text-center"/>
                  <button className="px-2 py-1 bg-gray-700 text-white rounded">+</button>
                </div>
              </div>
              <div className="mt-4">
                Căn lề
                <div className="flex flex-row mt-2 justify-center items-center space-x-2">
                  <button className="px-2 py-1 bg-gray-700 text-white rounded">-</button>
                  <input type="text" value="16" placeholder={novelPading} className="w-12 text-center"/>
                  <button className="px-2 py-1 bg-gray-700 text-white rounded">+</button>
                </div>
              </div>
              <div className="mt-4">
                Căn chỉnh
                <div className="flex flex-row mt-2 justify-center space-x-2">
                  <button className="px-2 py-1 bg-gray-700 text-white rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                  </button>
                  <button className="px-2 py-1 bg-gray-700 text-white rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                  </button>
                  <button className="px-2 py-1 bg-gray-700 text-white rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
             Đóng
            </button>
          </div>
        </div>
      
    </div>
  );
}
