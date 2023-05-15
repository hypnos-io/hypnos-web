import axios from 'axios';

const isAuthenticated = async () => {
    try {
        const response = await axios.get('http://localhost:3000/authenticated/');
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 400) {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

export default isAuthenticated;