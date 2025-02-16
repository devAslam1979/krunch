"use client";
import Image from "next/image";
import MovingBanner from "./components/movingBanner";
import withAuth from "./utils/withAuth";
import { API_ENDPOINTS } from "./constants/apiEndpoints";
import api from "./utils/axiosInstance";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Pagination from "./components/pagination";
import { set } from "zod";
import FullPageLoader from "./components/common/FullPageLoader";
const Home = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const [salesData, setSalesData] = useState<any>({});
  const [banner, setBanner] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(salesData?.count / itemsPerPage);

  const fetchSalesData = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_SALES(currentPage));
      if (response.status === 200) {
        console.log("sales data", response?.data);
        setSalesData(response?.data);
        setIsLoading(false);
      }
    } catch (error: any) {
      setError(error);
    }
  };
  const fetchBanner = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.HOME_BANNER);
      if (response.status === 200) {
        console.log("banner data", response?.data);
        setBanner(response?.data);
      }
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchSalesData();
    fetchBanner();
  }, [currentPage]);

  const handleDownloadMenu = async () => {
    setApiError(null);
    try {
      const response = await api.get(API_ENDPOINTS.MENU);
      if (response.status === 200) {
        const pdfUrl = response?.data[0]?.link;
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.setAttribute("download", "Menu.pdf");
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setApiError(response?.data?.message);
      }
    } catch (error: any) {
      setApiError(error?.response?.data?.message);
    }
  };

  const handleDownloadApk = () => {
    const apkUrl = "/apk.apkm";
    const link = document.createElement("a");
    link.href = apkUrl;
    link.setAttribute("download", "krunch.apk");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };
  if (isLoading) {
    return (
      <div>
        <FullPageLoader />
      </div>
    );
  }

  return (
    <div className="relative h-full mb-2 bg-transparent">
      <div className="relative w-full  h-[170px]">
        <Image src={`${baseUrl}${banner?.[0]?.image}`} alt="logo" fill />
      </div>
      <MovingBanner text="Welcome to Krunch! Get amazing deals now!" />

      <div className="flex justify-between items-center mt-3 px-5">
        <button
          onClick={handleDownloadMenu}
          className="bg-[#4d4b49] text-white text-sm font-semibold rounded-full py-2 px-5 transition-colors"
        >
          Download Menu
        </button>
        <button
          onClick={handleDownloadApk}
          className="bg-[#4d4b49] text-white text-sm font-semibold rounded-full py-2 px-5 transition-colors"
        >
          Download App
        </button>
      </div>
      <div className="px-10 mt-3">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-black">Name</span>
          <span className="text-lg font-semibold text-black">{user?.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-normal text-black">Mobile No.</span>
          <span className="text-sm font-normal text-black">{user?.phone}</span>
        </div>
      </div>
      <div className="mt-2 text-black">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className=" w-[97px] py-2 text-center">Order ID</th>
              <th className=" text-center py-2 ">Date</th>
              <th className=" w-[125px] py-2 text-center">
                Krunchified Points
              </th>
            </tr>
          </thead>
        </table>
        {salesData?.count === 0 && (
          <div className="flex justify-center items-center">
            <span className="text-base mt-8 font-semibold text-black">
              No sales found
            </span>
          </div>
        )}
        <div className="overflow-y-auto max-h-[200px]  scrollbar-thin scrollbar-thumb-orange-400 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-gray-200">
          <table className="min-w-full table-auto">
            <tbody>
              {salesData?.results?.map((item: any) => (
                <tr key={item.id} className="border-t">
                  <td className=" w-[97px] py-2 text-center">{item.id}</td>
                  <td className="  py-2 text-center">
                    {formatDate(item.date)}
                  </td>
                  <td
                    className={` w-[125px] py-2 text-center font-semibold ${
                      item.type === "debit" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {item.type === "debit" ? "-" : "+"} {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {salesData?.count > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>
      <div className="fixed md:absolute bottom-0 left-0 w-full bg-[#fefaed]">
        <div className="grid grid-cols-[97px_1fr_125px] py-2 border-t border-orange-400 pr-4">
          <div></div>
          <span className="text-2xl font-semibold text-black text-center">
            Total
          </span>
          <span className="text-2xl font-semibold text-green-600 text-center ">
            +{user?.points}
          </span>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
