import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Umkm {
  nama_pemilik: string;
  nomor_pemilik: string;
  alamat_pemilik: string;
  nama_usaha: string;
  alamat_usaha: string;
  domisili_usaha: string;
  kodePos_usaha: string;
  email_usaha: string;
  tahunBerdiri_usaha: string;
  jenisbadan_usaha: string;
  kategori_usaha: string;
  image: string;
  deskripsi_usaha: string;
  legalitas_usaha: string;
}

function TableTwo() {
  const [data, setData] = useState<Umkm[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/pemilik");
      const umkmData: Umkm[] = response.data.umkm;

      console.log("Data Umkm:", umkmData); // Tambahkan log untuk memeriksa struktur data
      setData(umkmData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          UMKM
        </h4>
      </div>

      {/* <div className="flex flex-col overflow-auto hover:overflow-scroll"> */}
      {/* <div className="sm:-mx-8 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8"> */}
      <div className="overflow-x-scroll">
        <table className="min-w-full text-center text-sm font-light">
          <thead className="border-b font-medium text-black dark:text-white dark:border-neutral-500">
            <tr>
              <th scope="col" className="text-sm px-10 py-4">
                No
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Nama Pemilik
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Nomor Pemilik
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Alamat Pemilik
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Nama Usaha
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Alamat Usaha
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Domisili Usaha
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Kode Pos Usaha
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Email Usaha
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Tahun Berdiri Usaha
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Jenis Badan Usaha
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Kategori Usaha
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Gambar
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Deskripsi Usaha
              </th>
              <th scope="col" className="text-sm px-10 py-4">
                Legalitas Usaha
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                className="text-black border-b dark:border-neutral-500"
                key={index}
              >
                <td className="whitespace-nowrap px-8 py-4">
                  <p className="text-black dark:text-white font-extrabold">
                    {index + 1}{" "}
                  </p>
                </td>
                <td className="whitespace-nowrap px-8 py-4">
                  <p className="text-black dark:text-white font-normal">
                    {item.nama_pemilik}
                  </p>
                </td>
                <td className="whitespace-nowrap px-8 py-4">
                  <p className="text-black dark:text-white font-normal">
                    {item.nomor_pemilik}
                  </p>
                </td>
                <td className="whitespace-nowrap px-8 py-4">
                  <p className="text-black dark:text-white font-normal">
                    {item.alamat_pemilik}
                  </p>
                </td>

                <td className="whitespace-nowrap px-8 py-4">
                  <p className="text-black dark:text-white font-normal">
                    {item.nama_usaha}
                  </p>
                </td>
                <td className="whitespace-nowrap px-7 py-4">
                  <p className="text-black dark:text-white font-normal">
                    {item.alamat_usaha}
                  </p>
                </td>
                <td className="whitespace-nowrap px-8 py-4">
                  <p className="text-black dark:text-white font-normal">
                    {item.domisili_usaha}
                  </p>
                </td>
                <td className="whitespace-nowrap px-8 py-4">
                  <p className="text-black dark:text-white font-normal">
                    {item.kodePos_usaha}
                  </p>
                </td>
                <td className="whitespace-nowrap px-8 py-4">
                  <p className="text-black dark:text-white font-normal">
                    {item.email_usaha}
                  </p>
                </td>
                <td className="whitespace-nowrap px-8 py-4">
                  <p className="text-black dark:text-white font-normal">
                    {item.tahunBerdiri_usaha}
                  </p>
                </td>
                <td className="whitespace-nowrap px-8 py-4">
                  <p className="text-black dark:text-white font-normal">
                    {item.jenisbadan_usaha}
                  </p>
                </td>
                <td className="whitespace-nowrap px-8 py-4">
                  <p className="text-black dark:text-white font-normal">
                    {item.kategori_usaha}
                  </p>
                </td>
                <td className="whitespace-nowrap px-8 py-4">
                  <Image
                    src={`http://localhost:8000/${item.image}`}
                    className="rounded-3"
                    alt={`Gambar ${item.image}`}
                    width={100}
                    height={100}
                  />
                </td>
                <td className="whitespace-nowrap px-8 py-4">
                  <p className="text-black dark:text-white font-normal">
                    {item.deskripsi_usaha}
                  </p>
                </td>
                <td className="whitespace-nowrap px-8 py-4">
                  <p className="text-black dark:text-white font-normal">
                    {item.legalitas_usaha}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableTwo;
