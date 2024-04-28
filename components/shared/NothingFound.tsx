import {MdEmail} from "react-icons/md";

export const NothingFound = () => {
  return (
    <div className="flex h-[500px] flex-col space-y-4 center ">
      <MdEmail size={100} />
      <p>这里空空如也</p>
      <p>稍后再来看看吧！</p>
    </div>
  );
};
