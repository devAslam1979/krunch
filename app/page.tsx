"use client";

import Image from "next/image";
import MovingBanner from "./components/movingBanner";
import withAuth from "./utils/withAuth";
import { API_ENDPOINTS } from "./constants/apiEndpoints";
import api from "./utils/axiosInstance";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Pagination from "./components/pagination";
import FullPageLoader from "./components/common/FullPageLoader";
import { BannerResponse, SalesResponse } from "./types/common";
import ServerError from "./components/common/ServerError";
import { formatDate } from "./utils/helper";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const [salesData, setSalesData] = useState<SalesResponse>(
    {} as SalesResponse
  );
  const [banner, setBanner] = useState<BannerResponse>();
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil((salesData?.count || 0) / itemsPerPage);

  const fetchSalesData = useCallback(async () => {
    try {
      const { data, status } = await api.get(
        API_ENDPOINTS.GET_SALES(currentPage)
      );
      if (status === 200) setSalesData(data);
    } catch (error) {
      setError(error);
    }
  }, [currentPage]);

  const fetchBanner = useCallback(async () => {
    try {
      const { data, status } = await api.get(API_ENDPOINTS.HOME_BANNER);
      if (status === 200) setBanner(data);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchSalesData(), fetchBanner()]).finally(() =>
      setIsLoading(false)
    );
  }, [fetchSalesData, fetchBanner]);

  const handleDownloadMenu = async () => {
    setError(null);
    try {
      const { data, status } = await api.get(API_ENDPOINTS.MENU);
      if (status === 200 && data?.[0]?.link) {
        const link = document.createElement("a");
        link.href = data[0].link;
        link.setAttribute("download", "Menu.pdf");
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error: any) {
      setError(error?.response?.data?.message);
    }
  };

  const handleDownloadApk = () => {
    const link = document.createElement("a");
    link.href = "/apk.apkm";
    link.setAttribute("download", "krunch.apk");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const salesList = useMemo(
    () =>
      salesData?.results?.map((item) => (
        <tr key={item.id} className="border-t">
          <td className="w-[97px] py-2 text-center">{item.id}</td>
          <td className="py-2 text-center">{formatDate(item.date)}</td>
          <td
            className={`w-[125px] py-2 text-center font-semibold ${
              item.type === "debit" ? "text-red-600" : "text-green-600"
            }`}
          >
            {item.type === "debit" ? "-" : "+"} {item.amount.toFixed(2)}
          </td>
        </tr>
      )),
    [salesData]
  );

  if (isLoading) return <FullPageLoader />;
    if (error?.response?.status === 500) {
      return <ServerError />;
    }

  return (
    <div className="relative h-full mb-2 bg-transparent">
      {banner?.[0]?.image && (
        <div className="relative w-full h-[170px]">
          <Image src={`${baseUrl}${banner[0].image}`} alt="Banner" fill />
        </div>
      )}

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
              <th className="w-[97px] py-2 text-center">Order ID</th>
              <th className="text-center py-2">Date</th>
              <th className="w-[125px] py-2 text-center">Krunchified Points</th>
            </tr>
          </thead>
        </table>

        {salesData?.count === 0 ? (
          <div className="flex justify-center items-center">
            <span className="text-base mt-8 font-semibold text-black">
              No sales found
            </span>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-orange-400 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-gray-200">
            <table className="min-w-full table-auto">
              <tbody>{salesList}</tbody>
            </table>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        )}
      </div>

      <div className="fixed md:absolute bottom-0 left-0 w-full bg-[#fefaed]">
        <div className="grid grid-cols-[97px_1fr_125px] py-2 border-t border-orange-400 pr-4">
          <div></div>
          <span className="text-2xl font-semibold text-black text-center">
            Total
          </span>
          <span className="text-2xl font-semibold text-green-600 text-center">
            +{user?.points?.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
