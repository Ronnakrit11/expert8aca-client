import FileLayout from "./FileLayout";
export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <div className="text-black w-[80%] m-auto mt-24">
      <FileLayout/>
    </div>
  );
}