import OpenAI from "openai"; 
import {openai_key } from "../../constants/secret.js";


const getGptResult = async (collegeName, customKey) => {
    const key = openai_key;

	const openai = new OpenAI({
		apiKey: customKey || key,
		dangerouslyAllowBrowser: true,
	});

	const gptQuery = `Given a college name, just provide its official link, image url, establishment year and some information.
    The sample output is: "<official_link>, <establishment_year>, <courses_offered>, <achievements_and_information>, <Campus_size_details>, <Accreditation_status>, <Affiliation>, <Fee_structure_details>, <Placement_statistics_details>, <Contact_information_type_with_its_value>". 
    The output must contain only 10 strings and semicolon(;) seperated so that i can use str.split(';') method to get the array of required result.
    Now give the similar output semicolon(;) seperated for the college: ${collegeName}`;

    try {

        const gptResults = await openai.chat.completions.create({
            messages: [{ role: "user", content: gptQuery }],
            model: "gpt-3.5-turbo",
        });
        return gptResults.choices[0].message.content;
    }
    catch(err) {
        console.log(err)
        throw new Error(err.error.message);
    }

};

export default getGptResult;
