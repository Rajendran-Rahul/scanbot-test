import ScanbotSDK from "scanbot-web-sdk";

const Scanbot = () => {
    const DOCUMENT_SCANNER_CONTAINER = "document-scanner-view";

    const LICENSE_KEY =
        "DuPrNE/G7iEBjaISOl3xJm4HvhaQyF" +
        "WXm7fqXbIVU5pVJn+qTxPUjda0uy+x" +
        "zOBBL6Tki9F58uw+w8LNLFQtJUDNg/" +
        "zWTBG/Bn5LRD3aPALGohll0RLeNnFs" +
        "6Fht2gZl7k/FSbLzLKswYpKCNlKUyH" +
        "qog4QgzIVLb4P0z7WkHcidWkOlliWK" +
        "V7XL3iynYydebiH6B8rG5cIW2N9Ktm" +
        "Z4n9lhQFBpqEqmx2jlg3Wn3hDFYyJS" +
        "7GCE362mH7EtcXeM5gS17GIQmgkcEi" +
        "4YJsSIs2bgVJ+1GtulkG1SPEyp1gkN" +
        "8kzgdWt2lVJUbm3HcCtN5cjd5T4Uce" +
        "1z0q5X6nN9Iw==\nU2NhbmJvdFNESw" +
        "psb2NhbGhvc3R8eW9zaS5oZWFsdGgK" +
        "MTczNjI5NDM5OQo4Mzg4NjA3Cjg=\n";

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
            const sdkInstance = await ScanbotSDK.initialize({
                licenseKey: LICENSE_KEY
            })
            const documentScanner = sdkInstance.createDocumentScanner(config)

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