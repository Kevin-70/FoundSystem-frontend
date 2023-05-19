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
    }
}