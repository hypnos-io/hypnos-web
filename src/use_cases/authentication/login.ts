import axios from 'axios';

const login = async (registration: string, password: string) => {
    const url = 'http://localhost:3000/login/';

    try {
        const response = await axios.post(url, {
            registration: registration,
            password: password,
        })

        if (response.status === 200) {
            console.log(response.headers['set-cookie']);


            //window.location.href = '/';
        } else if (response.status === 400) {
            console.log('Não foi possui realizar o login'); 
        }
    } catch (error) {
        console.log(error);
    }
};

export default login;