import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const TodoInput = () => {
  return (
    <div className="grid grid-cols-[400px_auto] gap-4 justify-center">
      <input
        className="px-2 rounded-md"
        type="text"
        name="title"
        placeholder="Add to-do"
      />
      <button>
        <AiOutlinePlus fontSize={24} fontWeight={700} />
      </button>
    </div>
  );
};

export default TodoInput;
