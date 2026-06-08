"use client";
import {useState} from "react";
import Link from "next/link";

function AiAssistantPage() {
    const [responseData, setResponseData] = useState<any>(null);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        {/*Get the values of what is written in the prompt and send to the openAI endpoint and return a response. This response will be placed inside -response- */}
        try {
            setError("");
            setLoading(true);
            const apiResponse = await fetch("/api/openAI", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ prompt }),
                    });
            const data = await apiResponse.json();
            console.log("API Response:", data);
            if (!apiResponse.ok) {
            throw new Error("Failed to get AI response");
        }
            setResponseData(data);
        } catch (error) {
            setError("An error occurred while fetching the AI response.");
        } finally {
            setLoading(false);
        }
        
    }

    return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-4">AI Assistant</h1>
        <p className="text-lg"> View, create, edit and manage status of employees </p>
        <div className="w-full flex flex-row max-w-2xl mt-6  items-start gap-4">
            <form
            onSubmit={handleSubmit} className="flex flex-col border p-4 rounded-lg gap-4 w-full max-w-md mt-4">
                <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Send a request to the AI assistant..."
                className="border p-2 rounded w-full h-64">
                </textarea>
                <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2">
                    Send
                </button>
            </form>
            <div className="mt-4">
                <h2 className="text-2xl font-bold mb-2">Response:</h2>
                <div>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(responseData, null, 2)}</pre>
                    {/* Display AI response here */}
                    {responseData?.success === true && (
                    <div className="space-y-2">
                        <p className="text-green-600 font-semibold">
                            {responseData.message}
                        </p>

                        <Link
                            href="/employees"
                            className="inline-block bg-green-600 text-white px-4 py-2 rounded"
                        >
                            See Employees
                        </Link>
                    </div>
                    )}                    
                </div>
            </div>

        </div>


    </main>
    )
}

export default AiAssistantPage;