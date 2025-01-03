import ScanbotSDK from "scanbot-web-sdk";
import "./scanbot.css";
import { DOCUMENT_SCANNER_CONTAINER, LICENSE_KEY } from "./constants";
import { useEffect, useState } from "react";

const Scanbot = () => {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const initSDK = async () => {
      try {
        await ScanbotSDK.initialize({
          licenseKey: LICENSE_KEY,
          engine: "wasm",
        });
      } catch (error) {
        console.error("Scanbot initialization error:", error);
      }
    };
    initSDK();
  }, [LICENSE_KEY]);

  const scannerConfig = {
    containerId: DOCUMENT_SCANNER_CONTAINER,
    text: {
      hint: {
        OK: "Capturing your document...",
        OK_SmallSize: "The document is too small. Try moving closer.",
        OK_BadAngles:
          "This is a bad camera angle. Hold the device straight over the document.",
        OK_BadAspectRatio:
          "Rotate the device sideways, so that the document fits better into the screen.",
        OK_OffCenter: "Try holding the device at the center of the document.",
        Error_NothingDetected:
          "Please hold the device over a document to start scanning.",
        Error_Brightness: "It is too dark. Try turning on a light.",
        Error_Noise: "Please move the document to a clear surface.",
      },
    },
    style: {
      outline: {
        polygon: {
          fillCapturing: "rgba(0, 255, 0, 0.2)",
          strokeCapturing: "green",
          fillSearching: "rgba(255, 0, 0, 0.2)",
          strokeSearching: "red",
        },
        label: {
          position: "absolute",
          top: "90%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          borderRadius: "0.25em",
          padding: "0.5em",
          fontFamily: "sans-serif",
          fontSize: "1em",
        },
        path: {
          stroke: "green",
          strokeWidth: 4,
        },
      },
      captureButton: {
        color: "white",
      },
    },
    preferredCamera: "camera2 0, facing back",
    onDocumentDetected: (result) => handleDocumentDetection(result),
  };

  const scannerInstance = () =>
    ScanbotSDK.instance.createDocumentScanner(scannerConfig);

  const handleDocumentScanner = async () => {
    try {
      (await scannerInstance()).enableAutoCapture();
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const handleDocumentDetection = async (result) => {
    const { cropped } = result; //the value of cropped is of type Uint8Array image
    const uint8Array = new Uint8Array(cropped);
    const blob = new Blob([uint8Array], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(blob);
    if (imageUrl) {
      setImgUrl(imageUrl);
      handlePostDocumentCapture();
    }
  };

  const handlePostDocumentCapture = async () => {
    (await scannerInstance()).disableAutoCapture();
    (await scannerInstance())?.dispose();
  };

  return (
    <div>
      <h2>Document Scanner</h2>

      <div
        id={DOCUMENT_SCANNER_CONTAINER}
        style={{ position: "relative", height: "100%", width: "100%" }}
      >
        <h3>Scanbot</h3>
        <button onClick={() => handleDocumentScanner()}>
          Open Document Scanner
        </button>
      </div>

      {imgUrl && (
        <>
          <h2>Preview of Scanned Document</h2>
          <img
            src={imgUrl}
            alt="Scanned Document"
            style={{ maxWidth: "100%" }}
          />
        </>
      )}
    </div>
  );
};

export default Scanbot;
