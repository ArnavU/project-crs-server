import {universityModel} from '../models/university.js';

export const getCollege_university_mapping = () => {
    return new Promise(async(res, rej) => {
        const mp = new Map();
        try {
            const data = await universityModel.find();
            for(let obj of data) {
                for(let college of obj.colleges) {
                    mp.set(college, obj.university);
                }
            }
            res(mp);
        }
        catch(e) {
            console.log(`Error occured while find college-university mapping in database`);
        }
        rej(mp);
    })
}
