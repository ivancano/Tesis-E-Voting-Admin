import axios from 'axios';

const VoterService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            axios.get(process.env.REACT_APP_BACKEND_URL+'voters')
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {
            axios.get(process.env.REACT_APP_BACKEND_URL+'voters/'+id)
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    create: (params) => {
        return new Promise((resolve, reject) => {
            axios.post(process.env.REACT_APP_BACKEND_URL+'voters', params)
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    createBatch: (params) => {
        return new Promise((resolve, reject) => {
            axios.post(process.env.REACT_APP_BACKEND_URL+'voters/batch', params)
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    update: (id, params) => {
        return new Promise((resolve, reject) => {
            axios.put(process.env.REACT_APP_BACKEND_URL+'voters/'+id, params)
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(process.env.REACT_APP_BACKEND_URL+'voters/'+id)
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}

export default VoterService