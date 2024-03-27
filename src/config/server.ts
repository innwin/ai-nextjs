export const getServerSideConfig = () => {
    if (typeof process === "undefined") {
        throw Error(
            "[Server Config] you are importing a nodejs-only module outside of nodejs",
        );
    }

    return {
        geminiApiKey: process.env.GEMINI_API_KEY!
    };
};