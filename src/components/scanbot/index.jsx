import ScanbotSDK from "scanbot-web-sdk";
import { useRef, useState } from "react";

const Scanbot = () => {
    const DOCUMENT_SCANNER_CONTAINER = "document-scanner-view";
    // const [sdkInstance, setSdkInstance] = useState(null)

    const LICENSE_KEY =
        "hEH0Wbx1pZJdQXqRVrvGc0yiGpAEPX" +
        "/2P8qVF0qND02w5r/e9VyIsXVItu/9" +
        "E3b9caVgSNPpg4DAnE1rUn9v1SNLqW" +
        "5fM/ripSXPMnkNUkoUdrYkI4rK/1lE" +
        "XjQcjoxRu0BBoLKVuMGZ4tYe3kalp2" +
        "eqMljYfdfMht4MScgMHLto33HwpLCK" +
        "xkISTMYDnNevrY1Yjea0j55ktc/vRl" +
        "pLrd1TMa49HbqGEkn/fhcVNY800el6" +
        "7Cq51HzgnI2cElCL5kb0Vl9QdzT8KX" +
        "bT+pBnDmvBuTWG7AXtUF+caXrL4UPH" +
        "z0cG14HxAMNfvcjqJauliZYBANciZB" +
        "9sDP7s3WIy/g==\nU2NhbmJvdFNESw" +
        "psb2NhbGhvc3R8c2NhbmJvdC10ZXN0" +
        "LnZlcmNlbC5hcHAKMTczNjI5NDM5OQ" +
        "o4Mzg4NjA3Cjg=\n";

    // Pass the license key to the Scanbot SDK to initialize it.
    // Please refer to the corresponding setup guide in our documentation:
    // https://docs.scanbot.io

    // useEffect(() => {
    //     const initialize = async () => {
    //         const init = await ScanbotSDK.initialize({
    //             licenseKey:LICENSE_KEY,
    //             scannermode: "document",
    //         })
    //         if(init) setSdkInstance(init)
    //     }
    //     initialize()
    // },[])

    const scanbotSdkRef = useRef(null);
    const [scannedImage, setScannedImage] = useState(null);

    const handleDcoumentScanner = async () => {
        try {
            const config = {
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
                            strokeCapturing: "green",
                            strokeSearching: "yellow",
                            fillCapturing: "transparent",
                            fillSearching: "transparent",
                            strokeWidth: "2px"
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
                            fontSize: "1em"
                        },
                        path: {
                             stroke: "green",
                             strokeWidth: 4,
                        }
                    },
                    captureButton: {
                        color: "white"
                    },
                },
                preferredCamera: 'camera2 0, facing back',
                onerror: (error) => { console.log("error while running the scanner", error) }
            };
            const sdkInstance = await ScanbotSDK.initialize({
                licenseKey: LICENSE_KEY
            })

            // await sdkInstance.createDocumentScanner(config);
            // if(documentScanner) documentScanner.dispose();

            // Initialize the Scanbot Web SDK
            scanbotSdkRef.current = sdkInstance.detectAndCropDocument(config)

            // Start the camera when the component loads
            scanbotSdkRef.current.startCamera();

            // Listen for scan completion
            scanbotSdkRef.current.on("scanComplete", (scanResult) => {
                // Handle the scan result here
                if (scanResult.document) {
                    // Extract the scanned image from the result
                    const scannedImageUrl = scanResult.document.croppedImage;
                    console.log("Scanned Image URL:", scannedImageUrl);
                    setScannedImage(scannedImageUrl); // Store the image URL in state
                    sdkInstance.dispose()
                }
        })

        } catch (error) {
            console.log("error while scanning", error)
        }
    }
    const scannerDimensionObject = {
        width:'600px',
        height:"400px",
        border:"2px solid red",
    }

    return (
        <div>
            <h2>Document Scanner</h2>

            {/* Document Scanner UI Container */}
            <div id={DOCUMENT_SCANNER_CONTAINER} style={scannerDimensionObject}>
                <h3>Scanbot</h3>
                <button onClick={() => handleDcoumentScanner()}>Click Me!!!</button>
            </div>
        </div>

    )
}


export default Scanbot;