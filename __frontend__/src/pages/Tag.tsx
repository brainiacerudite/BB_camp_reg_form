import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../libs/apiClient";

const Tag = () => {
  const [tag, setTag] = useState<string | undefined>("");

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const getTag = async () => {
    try {
      const res = await apiClient.get(`/tag?id=${id}`);
      setTag(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTag();
  }, [id]);

  return (
    <div className="flex justify-center items-center">
      <img src={tag} alt="img" />
    </div>
  );
};

export default Tag;
