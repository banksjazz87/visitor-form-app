/**
 * 
 * @param url string
 * @param data object
 * @returns Promise type of any
 * @description this method is used to handle the post requests.
 */


const postCall = async(url: string, data: object): Promise<any> => {
    try {
        const response = await fetch(url, {
            method: "Post", 
            mode: "cors", 
            cache: "no-cache",
            credentials: "same-origin", 
            headers: {
                "Content-Type": "application/json", 
            }, 
            redirect: "follow", 
            referrerPolicy: "no-referrer", 
            body: JSON.stringify(data)
        });

        return response.json();

    } catch (e: any) {
        console.error(`The following error occurred while submiting the form: ${e}`);
    }
}

export default postCall;