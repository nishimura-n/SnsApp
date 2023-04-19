import axios from "axios"

export const loginCall = async(user, dispatch)  => {
    dispatch({type: "LOGIN_START"});
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`,user)
        .catch(error => {
            if (error.code === "ERR_BAD_REQUEST") {
                alert("Eメールまたはパスワードが違います");
            } 
        });
        dispatch({type: "LOGIN_SUCCESS", payload: response.data})
    }catch (err){
        dispatch({type: "LOGIN_ERROR", payload: err})
    }
}