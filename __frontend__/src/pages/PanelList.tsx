import { ChangeEvent, useEffect, useState } from "react";
import FilterList from "../assets/icons/filter_list.svg";
import AddBtn from "../assets/icons/add-frame.svg";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import apiClient from "../libs/apiClient";

const useDebouncedValue = (inputValue, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

const PanelList = () => {
  interface DataType {
    id: number;
    name: string;
    image: string;
    village: string;
    culture: string;
  }

  // const [errors, setErrors] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listCount, setListCount] = useState<number>(0);
  const [lists, setLists] = useState<DataType[] | null>([]);
  const [search, setSearch] = useState<string>("");

  const fetchLists = async (searchText = null) => {
    setIsLoading(true);
    try {
      const url = searchText
        ? `/panel/search?search=${searchText}`
        : "/panel/list";
      const res = await apiClient.get(url);
      setListCount(res.data.count);
      setLists(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const debouncedSearchTerm = useDebouncedValue(search, 1500);

  useEffect(() => {
    fetchLists(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/register");
  };

  const handleGoToTag = (id: any) => {
    navigate(`/tag?id=${id}`);
  };

  return (
    <div className="relative h-screen space-y-5 py-4 px-4 xl:px-40 bg-defaultBgImage bg-bgGlassMorphism backdrop-blur-sm">
      <div className="mt-4 flex items-center">
        <div className="w-full p-1 mr-2 border-gradient rounded-2xl backdrop-blur-sm">
          <input
            value={search}
            onChange={handleSearchChange}
            type="text"
            className="px-4 py-3 relative w-full text-base bg-transparent text-white placeholder:text-[#cbcbaa66] rounded-lg outline-none"
            placeholder="Search ..."
          />
        </div>
        <div className="cursor-pointer p-[0.9rem] bg-btnGradientColor rounded-xl">
          <FilterList />
        </div>
      </div>

      {isLoading && (
        <>
          <hr className="mt-10" />
          <div className="pt-20 flex justify-center">
            <Spinner className="!h-12 !w-12" />
          </div>
        </>
      )}
      {!isLoading && lists.length > 0 && (
        <>
          <hr className="md:pt-2" />
          <div className="font-medium text-white">
            <span className="text-gray-400">Count:</span> {listCount}
          </div>
          <div className="relative mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-4 xl:grid-cols-3">
            {lists.map(({ id, name, image, village, culture }) => {
              return (
                <div
                  onClick={()=> handleGoToTag(id)}
                  key={id}
                  className="w-full flex items-center space-x-4 p-4 bg-yellow-100 border border-yellow-700 shadow-md rounded-lg hover:bg-yellow-600"
                >
                  <div className="bg-slate-400 rounded-md w-16 h-16 overflow-hidden">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">{name}</div>
                    <div className="font-medium text-base">{village}</div>
                    <div className="font-medium text-base">{culture}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div
        className="fixed bottom-6 right-6 xl:bottom-8 xl:right-40"
        onClick={handleAdd}
      >
        <div className="cursor-pointer p-4 bg-btnGradientColor2 rounded-xl">
          <AddBtn />
        </div>
      </div>
    </div>
  );
};

export default PanelList;
