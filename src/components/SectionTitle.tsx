

export default function SectionTitle({
    sectionNumber,
    sectionTitle
}: {
    sectionNumber: number;
    sectionTitle: string;
}) {
    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-center rounded-full bg-gradient-to-r from-[#3A1D90] to-[#5832C9] h-12 w-12">
                <div className="text-black text-2xl font-bold">
                    {sectionNumber}
                </div>
            </div>
            <h2 className="text-3xl font-bold text-center mt-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3A1D90] to-[#5832C9]">
                    {sectionTitle}
                </span>
            </h2>
        </div>
    )
}