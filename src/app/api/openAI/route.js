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
                        - Update employees (name, email, role, or active status)

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

                        UPDATE (set null for fields that should NOT change):
                        {
                        "action": "update",
                        "identifier": "name or email of the employee to find",
                        "full_name": null,
                        "email": null,
                        "role": null,
                        "is_active": null
                        }

                        Examples:
                        - "Deactivate John Doe" -> action update, identifier "John Doe", is_active false, rest null
                        - "Activate jane@company.com" -> action update, identifier "jane@company.com", is_active true, rest null
                        - "Change John's role to Manager" -> action update, identifier "John", role "Manager", rest null
                        - "Update Ada's email to ada@new.com" -> action update, identifier "Ada", email "ada@new.com", rest null
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
            const { data, error } = await supabase
                .from("employees")
                .insert({
                    full_name: employeeData.full_name,
                    email: employeeData.email,
                    role: employeeData.role,
                    is_active: employeeData.is_active,
                })
                .select();
            if (error) throw new Error(error.message);
            result = data;
        }

        if (employeeData.action === "update") {
            const identifier = employeeData.identifier;

            // Find employee by email or by name
            let findQuery = supabase.from("employees").select("id, full_name");
            if (identifier.includes("@")) {
                findQuery = findQuery.eq("email", identifier);
            } else {
                findQuery = findQuery.ilike("full_name", `%${identifier}%`);
            }

            const { data: found, error: findError } = await findQuery;
            if (findError) throw new Error(findError.message);
            if (!found || found.length === 0) {
                throw new Error(`No employee found matching: ${identifier}`);
            }

            // Only include non-null fields in the update payload
            const updates = {};
            if (employeeData.full_name !== null) updates.full_name = employeeData.full_name;
            if (employeeData.email !== null) updates.email = employeeData.email;
            if (employeeData.role !== null) updates.role = employeeData.role;
            if (employeeData.is_active !== null) updates.is_active = employeeData.is_active;

            const { data, error } = await supabase
                .from("employees")
                .update(updates)
                .eq("id", found[0].id)
                .select();
            if (error) throw new Error(error.message);
            result = data;
        }

        // Build a human-readable response message
        let message;
        if (employeeData.action === "create") {
            message = `Employee ${employeeData.full_name} was created successfully.`;
        } else if (employeeData.action === "update") {
            const updatedName = result?.[0]?.full_name ?? employeeData.identifier;
            message = `Employee ${updatedName} was updated successfully.`;
        } else {
            message = `Action '${employeeData.action}' processed successfully.`;
        }

        return Response.json({
            success: true,
            message,
            data: employeeData,
            dbResult: result,
        });        
        
    } catch (error) {
        return Response.json({
            success: false,
            error: error.message
        });
    }
}