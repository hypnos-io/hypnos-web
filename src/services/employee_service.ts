import { api } from '../api/axios';
import axios from 'axios';
import { Employee } from "../entities/employee";
import { VITE_CLOUD_IMAGES_NAME, VITE_UPLOAD_PRESET } from '../constants';

const PATH = '/employees';

export class EmployeeService {

  async create(
    registration: string,
    fullName: string,
    password: string,
    admissionDate: Date,
    role: Number,
    imageURL: string,
  ): Promise<Employee> {

    const employeeData = {
      registration: registration,
      fullName: fullName,
      password: password,
      admissionDate: admissionDate,
      role: role,
      imageURL: imageURL,
    };

    try {
      const response = await api.post<Employee>(PATH, employeeData);
      const createdEmployee: Employee = response.data;
      return createdEmployee;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create employee');
    }
  }

  async fetchAll (): Promise<Employee[]> {
      const {data} = await api.get<Employee[]>(PATH)
      return data
  }

  async uploadToCloudinary(image) {

    try {
      // upload image to Cloudinary
      const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${VITE_CLOUD_IMAGES_NAME}/image/upload`;
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", VITE_UPLOAD_PRESET);
      formData.append("cloud_name", VITE_CLOUD_IMAGES_NAME);
      const response = await axios.post(cloudinaryUploadUrl, formData);
  
      // get the URL of the uploaded image from Cloudinary
      const cloudinaryImageURL = response.data.secure_url;
  
      return cloudinaryImageURL;
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id_employee: string): Promise<void> {
    try {
      const response = await api.delete(`${PATH}/${id_employee}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete employee');
    }
  }  

}



