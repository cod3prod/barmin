import mongoose from 'mongoose';
import Location from './models/location.js'; 
import Review from './models/review.js';
import User from './models/user.js';
import { DB_URL } from './config/config.js';

console.log(DB_URL);

// MongoDB 연결
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("seeding을 위한 MongoDB 연결 성공!"))
    .catch(err => console.log("seeding을 위한 MongoDB 연결 실패:", err));

// 시드 데이터
const seedUsers = [
    { userName: "홍길동", email: "hong@naver.com" },
    { userName: "김철수", email: "kim@naver.com" },
    { userName: "이영희", email: "lee@naver.com" }
];

const seedReviews = [
    { body: "정말 좋은 장소였어요. 다시 방문하고 싶습니다.", rating: 5, author: null },
    { body: "경치가 아름다웠지만, 사람이 너무 많아서 불편했어요.", rating: 3, author: null },
    { body: "위치가 좋고 편안했지만, 시설이 조금 낡았어요.", rating: 4, author: null }
];

const seedLocations = [
    {
        title: "서울숲",
        image: "https://example.com/images/seoul-forest.jpg",
        address: "서울특별시 성동구 서울숲길 273",
        coordinates: {
            latitude: 37.548198,
            longitude: 127.037270
        },
        description: "서울숲은 자연과 예술이 어우러진 도심 속의 공원입니다.",
        author: null,
        reviews: []
    },
    {
        title: "경복궁",
        image: "https://example.com/images/gyeongbokgung.jpg",
        address: "서울특별시 종로구 사직로 161",
        coordinates: {
            latitude: 37.579617,
            longitude: 126.977041
        },
        description: "경복궁은 조선 왕조의 궁궐로, 한국 전통 건축의 대표적인 예입니다.",
        author: null,
        reviews: []
    },
    {
        title: "부산 해운대",
        image: "https://example.com/images/haeundae.jpg",
        address: "부산광역시 해운대구 해운대해변로 140",
        coordinates: {
            latitude: 35.158657,
            longitude: 129.160074
        },
        description: "부산 해운대는 한국의 대표적인 해변으로, 여름철 많은 관광객이 찾는 곳입니다.",
        author: null,
        reviews: []
    }
];

// 데이터 추가 함수
const seedDB = async () => {
    try {
        // 기존 데이터 삭제
        await Location.deleteMany({});
        await Review.deleteMany({});
        await User.deleteMany({});

        // 유저 추가
        const users = await User.insertMany(seedUsers);

        // 리뷰 작성자 설정
        seedReviews[0].author = users[0]._id;
        seedReviews[1].author = users[1]._id;
        seedReviews[2].author = users[2]._id;

        // 리뷰 추가
        const reviews = await Review.insertMany(seedReviews);

        // 위치 데이터에 리뷰 추가
        seedLocations[0].reviews = [reviews[0]._id];
        seedLocations[1].reviews = [reviews[1]._id];
        seedLocations[2].reviews = [reviews[2]._id];

        // 위치 데이터 추가
        await Location.insertMany(seedLocations);

        console.log("DB 시딩 완료!");
    } catch (err) {
        console.error("DB 시딩 중 에러 발생:", err);
    } finally {
        mongoose.connection.close();
    }
};

// 시딩 실행
seedDB();
