import React from "react";
import { toast } from "react-toastify";

export const showToast = (message, type = "success") => {
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(message);

  const content = isHTML
    ? React.createElement("div", {
        dangerouslySetInnerHTML: { __html: message },
      })
    : message;

  switch (type) {
    case "success":
      toast.success(content || "Success");
      break;
    case "error":
      toast.error(content || "Something went wrong ❌");
      break;
    case "warning":
      toast.warning(content || "Warning ⚠️");
      break;
    case "info":
      toast.info(content || "Info ℹ️");
      break;
    default:
      toast(content);
  }
};
