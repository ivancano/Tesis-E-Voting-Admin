import axios from 'axios';

const ElectionService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            axios.get(process.env.REACT_APP_BACKEND_URL+'elections')
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
            axios.get(process.env.REACT_APP_BACKEND_URL+'elections/'+id)
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
            axios.post(process.env.REACT_APP_BACKEND_URL+'elections', params)
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
            axios.post(process.env.REACT_APP_BACKEND_URL+'elections/batch', params)
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
            axios.put(process.env.REACT_APP_BACKEND_URL+'elections/'+id, params)
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
            axios.delete(process.env.REACT_APP_BACKEND_URL+'elections/'+id)
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    getDetails: (electionId) => {
        return new Promise((resolve, reject) => {
            axios.get(process.env.REACT_APP_BACKEND_URL+'election-details?electionId='+electionId)
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    createDetail: (params) => {
        return new Promise((resolve, reject) => {
            axios.post(process.env.REACT_APP_BACKEND_URL+'election-details', params)
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    deleteDetail: (electionId) => {
        return new Promise((resolve, reject) => {
            axios.delete(process.env.REACT_APP_BACKEND_URL+'election-details/'+electionId)
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    getVotes: (electionId) => {
        return new Promise((resolve, reject) => {
            axios.get(process.env.REACT_APP_BACKEND_URL+'elections/vote-counter/'+electionId)
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    getVotesDetail: (electionId, candidateId) => {
        return new Promise((resolve, reject) => {
            axios.get(process.env.REACT_APP_BACKEND_URL+'elections/vote-counter/'+electionId+'/detail/'+candidateId)
            .then(data => {
                resolve(data.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    },
}

export default ElectionService