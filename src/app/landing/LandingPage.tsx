import { poppins } from "@/lib/fonts/fonts";
import { AccountTab } from "@/components/landing/tab/AccountTab";

const LandingPage = () => {
  return (
    <div className="h-full w-full flex justify-center items-center bg-gradient-to-b from-zinc-50 to-zinc-200">
      <div className="h-[84%] w-[30%] border shadow-lg bg-white rounded-2xl p-7 flex flex-col items-center justify-center gap-1">
        <div className="w-full flex flex-col justify-center items-center mb-3">
          <h1 className={`text-3xl font-bold ${poppins.className}`}>hello</h1>
          <h3 className={`${poppins.className} text-sm`}>
            please choose how you want to proceed
          </h3>
        </div>

        <AccountTab></AccountTab>
      </div>
    </div>
  );
};

export default LandingPage;
