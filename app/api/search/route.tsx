import { openDb } from "@/app/lib/db";

export async function POST(request: Request) {
    const db = await openDb();
    console.log('Database connection established');

    const { input } = await request.json();
    const result = await db.get("SELECT * FROM recipes WHERE FictionName LIKE ? ORDER BY random() LIMIT 1;", [input]);
    // Now 'input' contains the data sent in the request body
    console.log('Result:', result);
    console.log('Input:', input);
    db.close();
    if (result) {
        // Serialize result to JSON format
        const jsonResult = JSON.stringify(result);
        // Return JSON response
        return new Response(jsonResult, {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    /*return new Response(result,{
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });*/
}}