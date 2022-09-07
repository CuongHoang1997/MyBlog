import React from "react";

const ImageUpload = (props) => {
  const {
    name,
    className = "",
    progress = 0,
    image = "",
    handleDelete = () => {},
    handleResetUpload,
    ...rest
  } = props;
  return (
    <label
      className={`cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed
       w-full min-h-[350px] rounded-lg ${className} relative overflow-hidden`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={() => {}}
        {...rest}
      />

      {!image && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img
            src="/images/upload.png"
            alt="upload-img"
            className="max-w-[80px]"
          />
          <p className="font-semibold">Chọn hình ảnh</p>
        </div>
      )}
      {image && (
        <>
          <img src={image} className="w-full h-full object-cover" alt="" />
          <button
            className="p-3 bg-white rounded-full text-gray-600 absolute z-10 m-auto opacity-0 hover:opacity-100 "
            onClick={handleDelete}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </>
      )}
      {!image && (
        <div
          className="absolute w-10 h-1 bg-green-400 bottom-0 left-0 
      transition-all image-upload-progress"
          style={{ width: `${progress}%` }}
        ></div>
      )}
    </label>
  );
};

export default ImageUpload;
