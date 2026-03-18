exports.handler = async function(event) {

const { industry, country, keyword, url } = JSON.parse(event.body);

const prompt = `
You are an expert market research analyst.

Industry: ${industry}
Country: ${country}
Keyword: ${keyword}
URL: ${url}

Generate:
1. Market Overview
2. Trends & Drivers
3. Opportunities
4. Analyst Insights
5. LinkedIn Post
6. IMARC Press Release
`;

try {

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [{ role: "user", content: prompt }],
temperature: 0.7
})
});

const data = await response.json();

// 🔍 Debug check
if (!data.choices) {
return {
statusCode: 200,
body: JSON.stringify({
result: "API Error: " + JSON.stringify(data)
})
};
}

return {
statusCode: 200,
body: JSON.stringify({
result: data.choices[0].message.content
})
};

} catch (error) {

return {
statusCode: 500,
body: JSON.stringify({
result: "Server Error: " + error.message
})
};

}

};
