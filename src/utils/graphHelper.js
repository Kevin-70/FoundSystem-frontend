export default {
    applications2LineY(applications) {
        let y_data = [];
        for (let i = 0; i < applications.length; i++) {
            y_data.push(applications[i].appAmount);
        }
        return y_data;
    },
    applications2LineX(applications) {
        let x_data = [];
        for (let i = 0; i < applications.length; i++) {
            x_data.push(applications[i].createdDate);
        }
        return x_data;
    },
    getCatagoryPie(applications) {
        console.log('getCatagoryPie')
        console.log(applications)
        let catagory = [];
        let values = [];
        for (let i = 0; i < applications.length; i++) {
            console.log(applications[i].expendCategory)
            if (catagory.indexOf(applications[i].expendCategory[1]) === -1) {
                catagory.push(applications[i].expendCategory[1]);
                values.push(applications[i].appAmount);
            } else {
                values[catagory.indexOf(applications[i].expendCategory[1])] += applications[i].appAmount;
            }
        }

        return { name: catagory, values: values };
    },
    getGroupExpendurePie(expenditure) {
        let catagory = [];
        let values = [];

        for (let i = 0; i < expenditure.length; i++) {
            if (catagory.indexOf(expenditure[i].expenditureNumber) === -1) {
                catagory.push(expenditure[i].expenditureNumber);
                values.push(expenditure[i].totalAmount);
            } else {
                values[catagory.indexOf(expenditure[i].expenditureNumber)] += applications[i].totalAmount;
            }
        }
        let result = { name: [], values: [] }
        for (let i = 0; i < catagory.length; i++) {
            result.name.push(catagory[i])
            result.values.push(values[i])
        }
        // console.log('getGroupExpendurePie')
        // console.log(result)
        return result;

    }
}