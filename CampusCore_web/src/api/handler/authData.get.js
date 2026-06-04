const authFetchGetApi = async (api) => {
    try {
        const response = await fetch(api, {
            method: "GET",
            credentials: "include", // send cookies
        });

        const data = await response.json();
        console.log(data);
        return {
            status: response.status,
            data: data,
        };
    } catch (error) {
        return {
            status: 500,
            data: {
                message: "Failed to connect with server",
                error: error.message,
            },
        };
    }
};

export { authFetchGetApi };