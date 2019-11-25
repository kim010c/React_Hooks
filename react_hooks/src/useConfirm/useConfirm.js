/* eslint no-restricted-globals: ["off"] */

const useConfirm = (message = "", onCheck, onCancel) => {
  if (!onCheck || typeof onCheck !== "function") {
    return;
  }
  if (onCancel && typeof onCancel !== "function") {
    return;
  }
  const confirmAction = () => {
    if (confirm(message)) {
      onCheck();
    } else {
      onCancel();
    }
  };
  return confirmAction;
};
export default useConfirm;
