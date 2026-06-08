import OpenAI from "openai";
import {supabase} from "@/services/supabase";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request) {
    try {
        const body = await request.json();
        const prompt = body.prompt;   
        const completion = await client.chat.completions.create(
            {
                model:"gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `
                        You are an HR assistant.
                        
                        Your job is to:
                        - Create employees
                        - View employees
                        - Manage employees

                        RULES:
                        - Always respond in JSON format;
                        - No explanations;
                        - No markdowns

                        JSON FORMAT:
                        CREATE:
                        {
                        "action": "create",
                        "full_name": "",
                        "email": "",
                        "role": "",
                        "is_active": true
                        }   

                        VIEW:
                        {
                        "action": "view",
                        "query": ""
                        }
                        `
                    },
                    {
                        role: "user",
                        content: prompt,
                    }
                ]
        })



        const apiResponse = completion.choices[0].message.content;   
        const employeeData = JSON.parse(apiResponse);

        let result = null;

        if (employeeData.action === "create") {
            const { data , error } = await supabase.
            from("employees")
            .insert({
                full_name: employeeData.full_name,
                email: employeeData.email,
                role: employeeData.role,
                is_active: employeeData.is_active
            }).
            select();
            if (error) {
                throw new Error(error.message);
            }
            result = data;
        }   

        
        
        return Response.json({ 
            success: true,
            message: `Employee ${employeeData.full_name} was ${employeeData.action} successfully`,
            data: employeeData,
            dbResult: result

        });        
        
    } catch (error) {
        return Response.json({
            success: false,
            error: error.message
        });
    }
}