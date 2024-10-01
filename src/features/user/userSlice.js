import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => {

        if (typeof object[key] !== 'object') formData.append(key, object[key])
        else {
            if (key !== 'uploadedID') {
                formData.append(key, JSON.stringify(object[key]))
            }
            else {
                formData.append(key, (object[key][0]))
            }
        }
    })
    return formData;
}

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ data, history }, thunkAPI) => {
        try {
            const res = await axios.post('/api/login', data)
            // const data = await res.json();
            if (res.data.status === 200) {
                localStorage.setItem("authUser", JSON.stringify(res.data));
                localStorage.setItem("authToken", res.data.token)
                history.push("/dashboard");
                return { ...res.data };
            } else {
                return thunkAPI.rejectWithValue(res.data);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const signupUser = createAsyncThunk(
    'users/signupUser',
    async ({ data, history }, thunkAPI) => {
        try {
            var bodyFormData = getFormData(data)
            const res = await axios.post('/api/sign-up', bodyFormData)
            // const data = await res.json();
            if (res.data.status === 200) {
                // history.push("/login");
                return { ...res.data };
            } else {
                return thunkAPI.rejectWithValue(res.data);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async ({ history }, thunkAPI) => {
        try {
            const res = await axios.post('/api/logout')
            if (res.data.status === 200) {
                history.push("/login");
                localStorage.removeItem("authUser");
                localStorage.removeItem("authToken");
                userSlice.actions.clearState()

            } else {
                return thunkAPI.rejectWithValue(res.data)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async ({ history, data }, thunkAPI) => {
        try {
            const res = await axios.post('api/update-password', data)
            if (res.data.status === 200) {
                return { ...res.data }
            }
            else {
                return thunkAPI.rejectWithValue(res.data)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        id:'',
        role: '',
        sex: '',
        is_password_reset: 0,
        position: '',
        user_name: '',
        isFetching: false,
        isSuccess: false,
        isLoginError: false,
        isSignUpError: false,
        isSignUpSuccess: false,
        errorMessage: '',
        SignUpSuccessMessage: '',
        updatePasswordSuccessMessage:'',
        division:''
    },
    reducers: {
        clearState: (state) => {
            state.isFetching = false;
            state.isSuccess = false;
            state.isLoginError = false;
            state.isSignUpError = false;
            state.isSignUpSuccess = false;
            state.updatePasswordError = null;
            state.updatePasswordSuccessMessage=null;
            return state;
        },
    },
    extraReducers: {
        [signupUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSignUpError = false
            state.isSignUpSuccess = true;
            state.SignUpSuccessMessage = payload.message
        },
        [signupUser.pending]: (state) => {
            state.isFetching = true;
        },
        [signupUser.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isSignUpError = true;
            state.isSignUpSuccess = false;
            state.errorMessage = payload.message;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.name = payload.name;
            state.id=payload.id;
            state.role = payload.role;
            state.division = payload.division
            state.sex = payload.sex;
            state.is_password_reset = payload.is_password_reset;
            state.position = payload.position;
            state.user_name = payload.user_name
            state.isFetching = false;
            state.isSuccess = true;
            state.isLoginError = false;
            state.errorMessage = '';
            state.isSignUpError = false
            state.isSignUpSuccess = false;
            return state;
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isLoginError = true;
            state.errorMessage = payload.message;
            state.isSignUpError = false
            state.isSignUpSuccess = false;
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
        },
        [logoutUser.fulfilled]: (state) => {
            state.name = '';
            state.id='';
            state.role = '';
            state.sex = '';
            state.is_password_reset = 0;
            state.position = '';
            state.user_name = '';
            state.isFetching = false;
            state.isSuccess = false;
            state.isLoginError = false;
            state.isSignUpError = false;
            state.isSignUpSuccess = false;
            state.errorMessage = '';
        },
        [logoutUser.rejected]: (state, { payload }) => {
            state.name = '';
            state.id='';
            state.role = '';
            state.sex = '';
            state.is_password_reset = 0;
            state.position = '';
            state.user_name = '';
            state.isFetching = false;
            state.isSuccess = false;
            state.isLoginError = false;
            state.isSignUpError = false;
            state.isSignUpSuccess = false;
            state.errorMessage = '';
        },
        [updatePassword.pending]: (state) => {
            state.isFetching = true;
        },
        [updatePassword.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.is_password_reset = 0;
            state.updatePasswordError = null
            state.updatePasswordSuccessMessage=payload.message
        },
        [updatePassword.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.updatePasswordError = payload.message;
            state.updatePasswordSuccessMessage=null;
        }
    },
});