import axios from "axios"

const generateApi = async () => {
    const texts = {
        1: {
            isReplace: true,
            text: 'This text replace on prev'
        }
    }

    const images = {
        2: {
            isReplace: true,
            image: 'This image url or other replace on prev'
        }
    }

    try {
        const response = await axios.post(`${process.env.api_back}/design/review`, {
            designId: 1, // your id design
            texts,
            images,
            key: '' // it will be needed for indexing
        })
    } catch (error) {
        console.log(error)
    }
}

export default generateApi