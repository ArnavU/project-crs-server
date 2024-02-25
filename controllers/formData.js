import axios from "axios";

const sortData = (arr) => {
	arr.sort((obj1, obj2) => {
		return obj2.percentile - obj1.percentile;
	});

	// filter out all the objects whose percentile is 0
	arr = arr.filter((obj) => {
		return obj.percentile != 0;
	});

	return arr;
};

const filterByPerOrRank = (arr, parameter, num) => {
    
    if(parameter === 'percentile') {
        arr = arr.filter((obj) => {
            return obj.percentile <= num;
        })
    }
    else if(parameter === 'rank') {
        arr = arr.filter((obj) => {
            return obj.rank >= num;
        })
    }

    return arr;
} 

const filterByBranch = (arr, branch) => {
    
    const filteredData = arr.filter((obj) => {
        return obj.course.toLowerCase().includes(branch.toLowerCase());
    })

    return filteredData.length==0 ? arr : filteredData;
}

const filterByCollege = (arr, college) => {
	arr = arr.filter((obj) => {
		return obj.college.toLowerCase().includes(college.toLowerCase());
	})

	return arr;
}
// ################################## Route Controller ##################################
// '/api/v1/form/cet/:gender/:category/:percentile/:rank/:college/:branch/:year/:round'
export const getCetData = async (req, res) => {
	let { gender, category, percentile, rank, college, branch, year, round } =
		req.params;
	percentile = Number(percentile);
	rank = Number(rank);

	try {
		const allotmentData = await axios.get(
			`${process.env.BASE_URI}/api/v1/colleges/cet/${category}/${gender}/${year}/${round}`
		);

        // 1) sort data according to percentile
		let sortedData = null; 

        // 2) filter according to percentile or rank
		let filteredByPercentileOrRank = null; 

        // 3) filter according to the branch provided
        let filteredByBranch = null;

		// 4) filter according to college
		let filteredByCollege = null;
        
        // 1) sort
		sortedData = sortData(allotmentData.data.data);

        // 2) filter by %ile or rank
		if (!isNaN(percentile)) {
            filteredByPercentileOrRank = filterByPerOrRank(sortedData, "percentile", percentile);
		} else if (!isNaN(rank)) {
            filteredByPercentileOrRank = filterByPerOrRank(sortedData, "rank", rank);
		} else {
			// neither rank nor percentile provided
			return res.status(404).json({
				success: false,
				message: "Provide atleast percentile or rank",
			});
		}

        // 3) filter by branch
        if(branch != "null") {
            filteredByBranch = filterByBranch(filteredByPercentileOrRank, branch);
        }
        else {
            filteredByBranch = filteredByPercentileOrRank;
        }

		// 4) filter by college name
		if(college != "null") {
			filteredByCollege = filterByCollege(filteredByBranch, college);
		}
		else {
			filteredByCollege = filteredByBranch;
		}

		const userInput = {
			gender, category, percentile, rank, college, branch, year, round
		}

		let message = "data fetched successfully";
		if(filteredByCollege.length === 0) {
			message = "Cannot get results with the following query";
		}

		return res.status(200).json({
			success: true,
			message,
			userInput,
			data: filteredByCollege,
		});
	} catch (err) {
		res.status(404).json({
			success: false,
			message: err.message,
		});
	}
};

