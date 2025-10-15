import React,{useEffect} from "react";

export default function ExternalScriptsLoader() {
  useEffect(() => {
    const scriptUrls = [
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js",
      "lib/wow/wow.min.js",
      "lib/easing/easing.min.js",
      "lib/waypoints/waypoints.min.js",
      "lib/lightbox/js/lightbox.min.js",
      "lib/owlcarousel/owl.carousel.min.js",
      "/js/main.js"
    ];

    const scriptElements = [];

    scriptUrls.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      scriptElements.push(script);
    });

    // Cleanup on unmount
    return () => {
      scriptElements.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return null;
}