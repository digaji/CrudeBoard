import axios from "axios";
import { backendUrl } from "../misc/Constants";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";

interface tableData {
  email: string;
  percentage: number;
  liveMask: boolean | null;
}

const dummyTable: tableData[] = [{ email: "Loading...", percentage: 100, liveMask: true }];

const AdminData = (props: { cookies: Cookies }): JSX.Element => {
  const [tableData, setTableData] = useState(dummyTable);

  useEffect(() => {
    let interval = setInterval(async () => {
      const axiosApp = axios.create({
        baseURL: backendUrl,
        withCredentials: true,
        headers: {
          sessionid: props.cookies.get("sessionId"),
        },
      });

      const res = await axiosApp.get("/admin");
      // Make sure that the tableData is always sorted in order by email
      setTableData(
        res.data.sort((a: tableData, b: tableData) => {
          if (a.email < b.email) {
            return -1;
          }

          if (a.email > b.email) {
            return 1;
          }
          return 0;
        })
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      {tableData.map((row: any, index: any) => (
        <tr key={index} className="border-b border-gray-700 bg-white">
          <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium">
            {row.email}
          </th>
          <td className="px-6 py-4 text-center">{row.percentage}%</td>
          <td className={`my-3 mx-4 mt-4 block rounded-lg py-2 drop-shadow-md ${row.liveMask ? "bg-green-500" : "bg-red-500"}`}></td>
        </tr>
      ))}
    </>
  );
};

export default function Admin(props: { cookies: Cookies }) {
  return (
    <div className="mt-24 table-auto">
      <table className="mx-auto max-w-5xl text-left text-sm">
        <thead className="text-md bg-crude-blue uppercase text-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              Email Address
            </th>
            <th scope="col" className="px-6 py-3">
              Percentage of Mask Wearing (Daily)
            </th>
            <th scope="col" className="px-6 py-3">
              Mask On
            </th>
          </tr>
        </thead>
        <tbody>
          <AdminData cookies={props.cookies} />
        </tbody>
      </table>
    </div>
  );
}
