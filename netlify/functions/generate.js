exports.handler = async function(event) {

const { industry, country, keyword, url } = JSON.parse(event.body);

const fetch = require("node-fetch");

const prompt = `
You are an expert market research analyst from IMARC Group.

Generate structured output:

Industry: ${industry}
Country: ${country}
Keyword: ${keyword}
URL: ${url}

Output format:

1. Market Overview (70 words and scracth market size value only from URL )

2. Market Trends & Insights (3 detailed paragraphs with real time value if available)

3. Market Growth Drivers (5 bullet points, and each bullet points have 20 words with real value data)

4. Market Segments (Scratch only form URL)

5. Market Recent News and Developments (Share latest news and development with recent Month & Year for example: Month Year: paragraph with real time value) 

6. FAQ (3 questions)

7. LinkedIn Post (engaging + hook + CTA)

8. IMARC Press Release (professional format)
`;

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{ role: "user", content: prompt }
],
temperature: 0.7
})
});

const data = await response.json();

return {
statusCode: 200,
body: JSON.stringify({
result: data.choices[0].message.content
})
};

};
