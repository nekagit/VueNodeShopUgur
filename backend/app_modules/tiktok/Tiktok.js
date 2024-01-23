const BASE_URL = 'https://open.tiktokapis.com/v2/user/info/';
const FIELDS = '' +
    'open_id,' +
    'union_id,' +
    'bio_description,' +
    'profile_deep_link,' +
    'is_verified,' +
    'follower_count,' +
    'following_count,' +
    'likes_count,' +
    'video_count,' +
    'avatar_url,' +
    'display_name';

const axios = require('axios');

const getUserInfo = async function (ACCESS_TOKEN){
    return new Promise( async (resolve, reject) => {
        try {
            const response = await axios.get(`${BASE_URL}?fields=${FIELDS}`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            });
            //console.log(response);
            if(response.status === 200 && response.data){
                if(response.data.data && response.data.data.user){
                    const userInfos = response.data.data.user;
                    //console.log("TIKTOK USER INFO", userInfos);
                    resolve(userInfos);
                }
            }
            resolve(response);
        } catch (error) {
            console.error('Error fetching user info:', error.response.data);
            reject(error);
        }
    })
}

module.exports = {
    getUserInfo,
}