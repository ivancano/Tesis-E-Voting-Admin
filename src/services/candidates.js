import axios from 'axios';

const CandidateService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            axios.get(process.env.REACT_APP_BACKEND_URL+'candidates')
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    getByParty: (partyId) => {
        return new Promise((resolve, reject) => {
            axios.get(process.env.REACT_APP_BACKEND_URL+'candidates?partyId='+partyId)
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
            axios.get(process.env.REACT_APP_BACKEND_URL+'candidates/'+id)
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
            axios.post(process.env.REACT_APP_BACKEND_URL+'candidates', params)
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
            axios.post(process.env.REACT_APP_BACKEND_URL+'candidates/batch', params)
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
            axios.put(process.env.REACT_APP_BACKEND_URL+'candidates/'+id, params)
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
            axios.delete(process.env.REACT_APP_BACKEND_URL+'candidates/'+id)
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}

export default CandidateService