export const testTypes = [
  { id: 0, label: "Flexural", units: ["MPa", "N/m²", "N/mm²"] },
  { id: 1, label: "Tensile", units: ["MPa", "N/m²", "N/mm²"] },
  { id: 2, label: "Hardness", units: ["HV", "BHN"] },
  { id: 3, label: "Impact", units: ["Joules", "Kilo-Joules"] },
];

export const inputcont = "flex flex-grow flex-col items-start my-3";
export const labelstyle = "";
export const inputstyle =
  "px-2 py-3 tbase w-full rounded-sm border-[1px] border-gray-300 hover:border-black focus:outline-[rgb(62,130,215)]";

export const chartTypes = ["Bar Chart", "Line Chart"];

export const AutoFull = { state: window.innerWidth < 768 ? true : false };

export const AutoWidth = { width: window.innerWidth < 768 ? null : 300 };
