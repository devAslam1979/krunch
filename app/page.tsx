import Image from "next/image";
export default function Home() {
  const dummyData = [
    { id: 1, points: 50, date: "2025-01-01" },
    { id: 2, points: 120, date: "2025-01-02" },
    { id: 3, points: 75, date: "2025-01-03" },
    { id: 4, points: 200, date: "2025-01-04" },
    { id: 5, points: 85, date: "2025-01-05" },
    { id: 6, points: 150, date: "2025-01-06" },
    { id: 7, points: 30, date: "2025-01-07" },
    { id: 8, points: 180, date: "2025-01-08" },
    { id: 9, points: 95, date: "2025-01-09" },
    { id: 10, points: 160, date: "2025-01-10" },
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
      <div className="h-8 bg-orange-400"></div>
      <div className="flex justify-center items-center mt-3">
        <button className="bg-[#4d4b49] text-white text-base font-semibold rounded-full py-2 px-10 transition-colors">
          Download Menu
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
              <th className="px-4 w-[97px] py-2 text-center">Order ID</th>
              <th className="px-4 text-center py-2 ">Date</th>
              <th className="px-4 w-[125px] py-2 text-center">
                Krunchified points
              </th>
            </tr>
          </thead>
        </table>
        <div className="overflow-y-auto max-h-[220px]">
          <table className="min-w-full table-auto">
            <tbody>
              {dummyData.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 w-[97px] py-2 text-center">{item.id}</td>
                  <td className="px-4 py-2 text-center">
                    {formatDate(item.date)}
                  </td>
                  <td className="px-4 w-[125px] py-2 text-center">
                    {item.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between items-end  w-full px-6 border-t border-orange-400 pt-2">
        <span className="text-2xl font-semibold text-black">Total</span>
        <span className="text-2xl font-semibold text-black">2000</span>
      </div>
    </div>
  );
}
