const fetchPostApi = async (data,api) => {
    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        });

        const data = await response.json();
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

export { fetchPostApi };