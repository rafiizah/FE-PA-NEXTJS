import Breadcrumb from "@/components/Charts/Breadcrumbs/Breadcrumb";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Form UMKM Page | SI UMKM",
  description: "This is Form UMKM page ",
  // other metadata
};

const FormUmkm = () => {
  return (
    <>
      <Breadcrumb pageName="FormUMKM" />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          {/* <!-- UMKM Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                UMKM Form
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nama Usaha
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Nama Usaha"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Alamat Usaha
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Alamat usaha"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Domsili Usaha
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Domisili Usaha"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Kode Pos Usaha
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan kode Pos Usaha"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email Usaha
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan Email Usaha"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Tahun Berdiri Usaha
                    </label>
                    <input
                      type="number"
                      placeholder="Masukkan Tahun Berdiri Usaha"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jenis Badan Usaha
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Jenis badan Usaha"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Kategori Usaha
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Kategori Usaha"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jenis Produk Usaha
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Jenis Produk Usaha"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Deskripsi Usaha
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Masukkan Deskripsi Usaha"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>

                <div className="mb-4.5">
                  <label className=" block text-black dark:text-white">
                    Legalitas Usaha
                  </label>
                </div>
                <div className="flex mb-7 gap-7">
                  <CheckboxOne />
                  <CheckboxTwo />
                  <CheckboxThree />
                  <CheckboxFour />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormUmkm;
