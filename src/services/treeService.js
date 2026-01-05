import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;//so we can use the same url to other controllers if there is

const index = async () => {
    try {
        const response = await axios.get(BASE_URL)//axios can do the return res.json() already so no need to writ it
        return response.data.pets //response.data is the json {pets:[] that are in the api} 

    }
    catch (error) {

        console.log(error)
    }
}

const show = async (id) => {//GET THE ID FROM THE COMPONNT
    try {
        const response = await axios.get(`${BASE_URL}/${id}`)
        return response.data.pet//the response get us one pet check the one pet in post man

    }
    catch (error) {
        console.log(error)
    }
}

const create = async (formData) => {
    try {
        const response = await axios.post(BASE_URL, formData)
        return response.data.pet
    }
    catch (error) {
        console.log(error)
    }
}

const update = async (petId, formData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${petId}`, formData)
        return response.data.pet
    }
    catch (error) {
        console.log(error)
    }
}

const deleteOne = async (petId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${petId}`)
        return response.data.pet

    }

    catch (error) {
        console.log(error)
    }


}

export {
    index,
    show,
    create,
    update,
    deleteOne,

}