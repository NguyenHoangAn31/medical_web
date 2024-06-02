import * as request from "../../ultils/request";

export const getAllDoctor = async () => {
    try {
        const response = await request.get('doctor/all');
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllDoctorWithStatus = async () => {
    try {
        const response = await request.get('doctor/allwithallstatus');
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const detailDoctor = async (id) => {
    try {
        const response = await request.get(`doctor/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const updateDoctor = async (id, price, departmentid) => {
    try {
        const response = await request.put(`doctor/updatepriceanddepartment/${id}/${price}/${departmentid}`);
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
};