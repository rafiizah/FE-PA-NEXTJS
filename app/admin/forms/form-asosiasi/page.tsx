import Breadcrumb from "@/components/Charts/Breadcrumbs/Breadcrumb";
import CheckboxNine from "@/components/Checkboxes/CheckboxNine";
import CheckboxSix from "@/components/Checkboxes/CheckboxSix";
import CheckboxSeven from "@/components/Checkboxes/CheckboxSeven";
import CheckboxEight from "@/components/Checkboxes/CheckboxEight";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Form Asosiasi Page | SI UMKM",
  description: "This is Form Asosiasi page ",
  // other metadata
};

const FormAsosiasi = () => {
  return (
    <>
      <Breadcrumb pageName="FormAsosiasi" />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          {/* <!-- UMKM Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Asosiasi Form
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nama Lengkap Asosiasi
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Nama Lemgkap Asosiasi"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nama Singkat Asosiasi
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Nama Singkat Asosiasi"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Alamat Asosiasi
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Alamat Asosiasi"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Kode Pos Asosiasi
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan kode Pos Asosiasi"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email Asosiasi
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan Email Asosiasi"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nomer WA Aktif Asosiasi
                    </label>
                    <input
                      type="number"
                      placeholder="Masukkan Nomer WA Aktif Asosiasi"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Website Asosiasi
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Website Asosiasi"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nama Pimpinan
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Nama Pimpinan"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Tahun Berdiri Asosiasi
                    </label>
                    <input
                      type="number"
                      placeholder="Masukkan Tahun Berdiri Asosiasi"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jenis Bidang Asosiasi
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Jenis Bidang Asosiasi"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jumlah Anggota UMKM
                    </label>
                    <input
                      type="number"
                      placeholder="Masukkan Jumlah Anggota UMKM"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className=" block text-black dark:text-white">
                    Legalitas Usaha
                  </label>
                </div>
                <div className="flex mb-7 gap-12">
                  <CheckboxSix />
                  <CheckboxSeven />
                  <CheckboxEight />
                  <CheckboxNine />
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

export default FormAsosiasi;
