import { toast } from "react-toastify";

export const successtoast = (note) => toast(`✅ ${note}`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    progressClassName : "success-progress-bar",
    });

export const failuretoast = (note) => toast(`❌ ${note}`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    progressClassName: "failure-progress-bar",
    });

export const normaltoast = (note) => toast(`${note}`, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    progressClassName: "failure-progress-bar",
    });
    

export const promisetoast = (promise,pendingmessage,successmessage,errormessage) => 
    toast.promise( promise , {
    pending : pendingmessage,
    error : errormessage,
    success : successmessage,
},{
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
});