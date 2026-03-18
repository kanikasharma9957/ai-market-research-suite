exports.handler = async function(event) {

const { industry, country, keyword, url } = JSON.parse(event.body);

return {
statusCode: 200,
body: JSON.stringify({
result: `✅ Working!

Industry: ${industry}
Country: ${country}
Keyword: ${keyword}
URL: ${url}`
})
};

};
