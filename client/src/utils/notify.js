import Swal from 'sweetalert2';

export const notifySuccess = (title) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title,
    showConfirmButton: false,
    timer: 1500
  });
};

export const notifyError = (error) => {
  Swal.fire({
    icon: "error",
    title: "সমস্যা হয়েছে",
    text: error?.response?.data?.message || error?.message || 'কিছু একটা ভুল হয়েছে',
  });
};

export const confirmAction = async (text = "আপনি কি নিশ্চিত?") => {
  const result = await Swal.fire({
    title: "আপনি কি নিশ্চিত?",
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "হ্যাঁ, নিশ্চিত"
  });
  return result.isConfirmed;
};