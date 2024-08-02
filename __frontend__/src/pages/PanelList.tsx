import { ChangeEvent, useState } from "react";
import FilterList from "../assets/icons/filter_list.svg";
import AddBtn from "../assets/icons/add-frame.svg";
import images from "../constants/images";
import { useNavigate } from "react-router-dom";

const PanelList = () => {
  const [name, setName] = useState<string>("");
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/register");
  };

  return (
    <div className="relative h-screen space-y-5 py-4 px-4 xl:px-40 bg-gray-50">
      <div className="flex gap-4 items-center">
        <div className="w-full p-1 border-gradient rounded-2xl backdrop-blur-sm">
          <input
            value={name}
            onChange={handleNameChange}
            type="text"
            className="px-2 py-3 relative w-full text-base bg-transparent text-[#303030] placeholder:text-[#9D9D8566] rounded-lg outline-none"
            placeholder="Name"
          />
        </div>
        <div className="cursor-pointer">
          <FilterList />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row flex-wrap">
        {data.map(({ id, name, image }) => {
          return (
            <div
              key={id}
              className="w-full flex gap-4 p-4 bg-white border shadow-md rounded-lg md:basis-[300px] md:flex-shrink-0"
            >
              <div>
                <img src={image} alt={name} className="w-20" />
              </div>
              <div>
                <h4>{name}</h4>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="fixed bottom-8 right-8 cursor-pointer"
        onClick={handleAdd}
      >
        <AddBtn />
      </div>
    </div>
  );
};

export default PanelList;

interface DataType {
  id: number;
  name: string;
  image: string;
}

const data: DataType[] = [
  {
    id: 1,
    name: "John Doe",
    image: images.avatar.src,
  },
  {
    id: 2,
    name: "John Doe",
    image: images.avatar.src,
  },
  {
    id: 3,
    name: "John Doe",
    image: images.avatar.src,
  },
  {
    id: 4,
    name: "John Doe",
    image: images.avatar.src,
  },
  {
    id: 5,
    name: "John Doe",
    image: images.avatar.src,
  },
  {
    id: 6,
    name: "John Doe",
    image: images.avatar.src,
  },
  {
    id: 7,
    name: "John Doe",
    image: images.avatar.src,
  },
];
