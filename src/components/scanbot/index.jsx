import ScanbotSDK from "scanbot-web-sdk";
import { useEffect, useState } from "react";

const Scanbot = () => {
    const DOCUMENT_SCANNER_CONTAINER = "document-scanner-view";
    const [sdkInstance, setSdkInstance] = useState(null)

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

    useEffect(() => {
        const initialize = async () => {
            const init = await ScanbotSDK.initialize({
                licenseKey:LICENSE_KEY
            })
            if(init) setSdkInstance(init)
        }
        initialize()
    },[])

    const handleDcoumentScanner = async () => {
        try {
            const config = {
                containerId: DOCUMENT_SCANNER_CONTAINER,
                onDocumentDetected: () => { console.log("document detected") },
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
                    // Note that alternatively, styling the document scanner is also possible using CSS classes.
                    // For details see https://docs.scanbot.io/document-scanner-sdk/web/features/document-scanner/document-scanner-ui/
                    outline: {
                        polygon: {
                            fillCapturing: "rgba(0, 255, 0, 0.2)",
                            strokeCapturing: "green",
                            fillSearching: "rgba(255, 0, 0, 0.2)",
                            strokeSearching: "red",
                        }
                    }
                },
                preferredCamera: 'camera2 0, facing back',
                onerror: (error) => { console.log("error while running the scanner", error) }
            };

            const documentScanner = await sdkInstance.createDocumentScanner(config)

            console.log("documentScanner result", documentScanner)

        } catch (error) {
            console.log("error while scanning", error)
        }
    }

    return (
        <div style={{ height: "100%" }}>
            <h2>Document Scanner</h2>

            {/* Document Scanner UI Container */}
            <div id={DOCUMENT_SCANNER_CONTAINER}>
                <h3>Scanbot</h3>
                <button onClick={() => handleDcoumentScanner()}>Click Me!!!</button>
            </div>
        </div>

    )
}


export default Scanbot;