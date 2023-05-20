export default {
    applications2Line(applications) {
        let x_data = [];
        let y_data = [];
        for (let i = 0; i < applications.length; i++) {
            x_data.push(applications[i].createdDate);
            y_data.push(applications[i].appAmount);
        }
        return x_data, y_data;
    }
} 