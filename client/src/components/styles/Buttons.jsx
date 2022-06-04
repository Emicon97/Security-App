export const Primary = (props) => `
    flex flex-row justify-evenly items-center
    h-10 w-28
    text-white font-semibold
    rounded-md
    bg-[#0243EC]
    hover:bg-[#002583]
    active:bg-[#0243EC] active:ring-4 active:ring-blue-200
`;

export const Secondary = `
    flex flex-row justify-evenly items-center
    h-10 w-28
    text-[#0243EC] font-semibold
    rounded-md
    bg-[#E6EEFF]
    hover:bg-[#CBDBFF] hover:text-[#002583]
    active:bg-[#E6EEFF] active:ring-4 active:ring-blue-200 active:text-[#0243EC]
`;

export const Tertiary = `
    flex flex-row justify-evenly items-center
    h-10 w-28
    text-[#445275] font-semibold
    rounded-md border-2 border-[#b6c2e2]
    bg-[#FFFFFF]
    hover:bg-[#eef1f8] 
    active:bg-[#FFFFFF] active:ring-4 active:ring-[#b6c2e2]
`;

export const Input = (props) => `
    hover:bg-slate-100
    placeholder:italic placeholder:text-slate-400 
    block bg-white w-${props === 'Select' ? '48' : '96'} m-2.5
    border border-slate-300 rounded-md 
    py-2 pl-3 pr-3 shadow-sm 
    focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 
    sm:text-sm
`;
