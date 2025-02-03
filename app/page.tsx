import Image from "next/image";
import MovingBanner from "./components/movingBanner";
import Footer from "./components/footer";
export default function Home() {
  const dummyData = [
    { id: 1, points: 50, date: "2025-01-01", type: "credit" },
    { id: 2, points: 120, date: "2025-01-02", type: "credit" },
    { id: 3, points: 75, date: "2025-01-03", type: "credit" },
    { id: 4, points: 200, date: "2025-01-04", type: "debit" },
    { id: 5, points: 85, date: "2025-01-05", type: "credit" },
    { id: 6, points: 150, date: "2025-01-06", type: "debit" },
    { id: 7, points: 30, date: "2025-01-07", type: "credit" },
    { id: 8, points: 180, date: "2025-01-08", type: "credit" },
    { id: 9, points: 95, date: "2025-01-09", type: "credit" },
    { id: 10, points: 160, date: "2025-01-10", type: "debit" },
  ];

  console.log(dummyData);
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div className="relative h-full mb-2 bg-transparent">
      <div className="relative w-full  h-[170px]">
        <Image src="/images/img1.jpg" alt="logo" fill />
      </div>
      <MovingBanner text="Welcome to Krunch! Get amazing deals now!" />

      <div className="flex justify-between items-center mt-3 px-5">
        <button className="bg-[#4d4b49] text-white text-sm font-semibold rounded-full py-2 px-5 transition-colors">
          Download Menu
        </button>
        <button className="bg-[#4d4b49] text-white text-sm font-semibold rounded-full py-2 px-5 transition-colors">
          Download App
        </button>
      </div>
      <div className="px-10 mt-3">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-black">Name</span>
          <span className="text-lg font-semibold text-black">Md Aslam</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-normal text-black">Mobile No.</span>
          <span className="text-sm font-normal text-black">7667658083</span>
        </div>
      </div>
      <div className="mt-2 text-black">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className=" w-[97px] py-2 text-center">Order ID</th>
              <th className=" text-center py-2 ">Date</th>
              <th className=" w-[125px] py-2 text-center">
                Krunchified points
              </th>
            </tr>
          </thead>
        </table>
        <div className="overflow-y-auto max-h-[220px]  scrollbar-thin scrollbar-thumb-orange-400 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-gray-200">
          <table className="min-w-full table-auto">
            <tbody>
              {dummyData.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className=" w-[97px] py-2 text-center">{item.id}</td>
                  <td className="  py-2 text-center">
                    {formatDate(item.date)}
                  </td>
                  <td
                    className={` w-[125px] py-2 text-center font-semibold ${
                      item.type === "debit" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {item.type === "debit" ? "-" : "+"} {item.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed md:absolute bottom-0 left-0 w-full bg-[#fefaed]">
        <div className="grid grid-cols-[97px_1fr_125px] py-2 border-t border-orange-400">
          <div></div>
          <span className="text-2xl font-semibold text-black text-center">
            Total
          </span>
          <span className="text-2xl font-semibold text-black text-center ">
            2000
          </span>
        </div>
        <div className="border-t ">
          <Footer />
        </div>
      </div>
    </div>
  );
}
