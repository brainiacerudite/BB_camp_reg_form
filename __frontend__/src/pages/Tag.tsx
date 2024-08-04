import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../libs/apiClient";
import DownloadIcon from "../assets/icons/download.svg";
import Spinner from "../components/Spinner";

const Tag = () => {
  const [tag, setTag] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const getTag = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get(`/tag?id=${id}`);
      setTag(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const download = (imageUrl: string) => {
    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);
    link.href = imageUrl;
    link.download = id;
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    getTag();
  }, [id]);

  return (
    <div className="h-svh overflow-auto py-4 px-4 xl:px-40 bg-defaultBgImage bg-no-repeat bg-cover bg-bgGlassMorphism backdrop-blur-sm">
      {isLoading && (
        <>
          <div className="-mt-12 flex items-center justify-center h-full">
            <div className="pt-20 flex justify-center">
              <Spinner className="!h-16 !w-16" />
            </div>
          </div>
        </>
      )}
      {!isLoading && tag && (
        <div className="h-full m-auto max-w-96">
          <div className="py-8 flex justify-center items-center">
            <img src={tag} alt="img" className="object-fill" />
          </div>

          <div className="w-full text-center">
            <button
              type="button"
              onClick={() => download(tag)}
              className="inline-flex px-8 py-4 items-center justify-center space-x-4 cursor-pointer rounded-lg border-gradient bg-btnGradientColor2 before:!rounded-lg before:!p-[1px] hover:opacity-90"
            >
              <span className="-ml-2">
                <DownloadIcon />
              </span>
              <span className="text-xl font-bold text-white">Download</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tag;
