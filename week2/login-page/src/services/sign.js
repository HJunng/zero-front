import axios from './axios/axios';
import authAxios from './axios/authAxios';
import router from '@/router';

import { getDatabase, ref, push, equalTo, query, orderByChild, onValue } from 'firebase/database';

// pamas id, password
export const signInUser = async (data) => {
  try {
    const { id, password } = data;
    await axios.post('/signIn', { id, password }); 
    router.push('/login');
  } catch (err) {
    console.log(err);
  }
}
export const signInFirebawse = (id, password) => {
  const db = getDatabase();
  push(ref(db, 'users/'), {
    username: id,
    password,
  });
};

export const getUserInFirebase = (id = 'dinnerKang') => {
  const db = getDatabase();
  const userRef = ref(db, 'users/');
  const queryRef = query(userRef, orderByChild('username'), equalTo(id));
  
  onValue(queryRef, (snapshot) => {
    const data = snapshot.val();
    console.log('getUserInFirebase', data);
    // updateStarCount(postElement, data);
  });
}

export const getUserInfoList = async () => {
  try {
    const { data } = await authAxios.get('/userInfo');
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const getUserInfo = async (id) => {
  try {
    const { data } = await authAxios.get(`/userInfo/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const getGoogleUser = async () => {
  try {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    await googleAuth.signIn();
    const googleUser = await googleAuth.currentUser.get();
    const profile = await googleUser.getBasicProfile();
    console.log(googleUser.getBasicProfile().getId());
    console.log(googleUser.getBasicProfile().getEmail());
    console.log(googleUser.getBasicProfile().getName());

    await axios.post('/signIn', {
      id: profile.getId(),
      email: profile.getEmail(),
      name: profile.getName(),
      isSocial: true,
    })
  } catch (err) {
    console.log(err);
  }
}

export const signInSocial = async (id, email, name) => {
  try {
    await axios.post('/signIn', {
      id,
      email,
      name,
      isSocial: true,
    });
  } catch (err) {
    console.log(err);
  }
}