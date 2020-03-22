import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-9c3cb.firebaseio.com/'
})