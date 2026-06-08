"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

type AssistantResponse = {
    success?: boolean;
    message?: string;
    error?: string;
    data?: unknown;
    dbResult?: unknown;
};

const SUGGESTED_PROMPTS = [
    {
        label: "Create Engineer",
        prompt: "Create employee named Ada Lovelace, email ada@minihr.com, role Software Engineer.",
    },
    {
        label: "Create HR Generalist",
        prompt: "Create employee named Jordan Miles, email jordan.miles@minihr.com, role HR Generalist.",
    },
    {
        label: "View Active Team",
        prompt: "Show all active employees.",
    },
    {
        label: "Deactivate Employee",
        prompt: "Deactivate employee Ada Lovelace.",
    },
    {
        label: "Activate Employee",
        prompt: "Activate employee Ada Lovelace.",
    },
    {
        label: "Change Role",
        prompt: "Change Ada Lovelace's role to Senior Software Engineer.",
    },
];

function AiAssistantPage() {
    const [responseData, setResponseData] = useState<AssistantResponse | null>(null);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isPromptEmpty = prompt.trim().length === 0;
    const promptLength = prompt.length;
    const hasResponse = useMemo(() => responseData !== null, [responseData]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isPromptEmpty || loading) {
            return;
        }

        try {
            setError("");
            setLoading(true);
            setResponseData(null);

            const apiResponse = await fetch("/api/openAI", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const data: AssistantResponse = await apiResponse.json();
            if (!apiResponse.ok) {
                throw new Error(data.error || "Failed to get AI response.");
            }

            if (!data.success) {
                throw new Error(data.error || "The assistant could not complete this request.");
            }

            setResponseData(data);
        } catch (caughtError) {
            const message = caughtError instanceof Error
                ? caughtError.message
                : "An error occurred while fetching the AI response.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }


    function clearAll() {
        setPrompt("");
        setResponseData(null);
        setError("");
    }

    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
            <section className="mx-auto w-full max-w-6xl">
                <div className="rounded-2xl bg-gradient-to-r from-cyan-100 via-emerald-100 to-lime-100 border border-white/70 px-6 py-7 shadow-sm">
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight">AI Assistant</h1>
                    <p className="mt-2 max-w-3xl text-slate-700">
                        Ask in plain language to create, update, activate, or deactivate employees.
                        Use one of the prompt starters below or write your own.
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
                    <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">Send A Request</h2>
                        <p className="mt-1 text-sm text-slate-600">
                            Tip: include full name, email, and role when creating. Use name or email to identify employees when updating.
                        </p>


                        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                            <div className="rounded-xl border border-slate-200 p-3">
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Example: Create employee named Sam Lee, email sam.lee@minihr.com, role Product Designer."
                                    className="h-56 w-full resize-none rounded-lg bg-slate-50 p-3 text-sm text-slate-900 outline-none ring-0"
                                />
                                <div className="mt-2 text-right text-xs text-slate-500">
                                    {promptLength} characters
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={isPromptEmpty || loading}
                                    className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                                >
                                    {loading ? "Processing..." : "Send To Assistant"}
                                </button>
                                <button
                                    type="button"
                                    onClick={clearAll}
                                    className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                                >
                                    Clear
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">Assistant Output</h2>

                        {loading && (
                            <div className="mt-4 rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900">
                                Working on your request...
                            </div>
                        )}

                        {error && (
                            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        {!loading && !error && !hasResponse && (
                            <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600">
                                Your response will appear here after you submit a prompt.
                            </div>
                        )}

                        {responseData?.success && (
                            <div className="mt-4 space-y-3">
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                                    {responseData.message || "Request completed successfully."}
                                </div>

                                <Link
                                    href="/employees"
                                    className="inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                                >
                                    View Employees
                                </Link>

                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AiAssistantPage;