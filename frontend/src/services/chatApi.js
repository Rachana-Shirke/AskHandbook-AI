import api from "./api";

export async function askQuestion(question) {

    console.log("Sending Question:", question);

    const response = await api.post("/chat/", {
        question: question
    });

    console.log("Response:", response.data);

    return response.data;
}