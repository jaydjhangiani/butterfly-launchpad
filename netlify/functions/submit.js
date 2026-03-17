import { google } from "googleapis";

export const handler = async (event) => {
    try {
        const data = JSON.parse(event.body);

        console.log(process.env.GOOGLE_PRIVATE_KEY.slice(0, 50));
        console.log(process.env.GOOGLE_CLIENT_EMAIL);
        console.log(process.env.GOOGLE_SHEET_ID);

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "FormResponses!A:F",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[
                    data.name,
                    data.email,
                    data.countryCode,
                    data.phone,
                    data.referralSource,
                    new Date().toISOString(),
                ]],
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed" }),
        };
    }
};