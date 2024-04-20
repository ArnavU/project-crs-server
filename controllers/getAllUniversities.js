import {universityModel} from '../models/university.js';
import { universities } from '../constants/universities.js';

export const getAllUniversitiesMapping = async(req, res) => {
        try {
            const data = await universityModel.find();
            res.json(data);
        }
        catch(e) {
            console.log(`Error occured while find college-university mapping in database`);
        }
}

export const getAllUniversities = (req, res) => {
    res.status(200).json(universities);
}