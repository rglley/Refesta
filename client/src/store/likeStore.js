import { create } from 'zustand';

import instance from '@util/token_interceptor';

const baseURL = `${import.meta.env.VITE_PUBLIC_API_SERVER}`;

const useLikeStore = create((set) => ({
  // 좋아하는 페스티벌 리스트 조회
  likeFestivalList: [],
  getLikeFestivalList: async () => {
    try {
      const res = await instance.get(`${baseURL}/members/festivals`);
      set((state) => ({
        likeFestivalList: res.data.data.festivalList,
      }));
    } catch (e) {
      console.log(e);
    }
  },

  // 좋아하는 아티스트 리스트 조회
  likeArtistList: [],
  getLikeArtistList: async () => {
    try {
      const res = await instance.get(`${baseURL}/members/artists`);
      set((state) => ({
        likeArtistList: res.data.data.artistList,
      }));
    } catch (e) {
      console.log(e);
    }
  },
  // 아티스트 좋아요 토글
  toggleArtistLike: (id) =>
    set((state) => {
      const updateList = state.likeArtistList.map((artist) => {
        if (artist.artistId === id) {
          return { ...artist, like: !artist.like };
        }
        return artist;
      });
      return { likeArtistList: updateList };
    }),

  // 페스티벌 좋아요 토글
  toggleFestivalLike: (id) =>
    set((state) => {
      const updateList = state.likeFestivalList.map((festival) => {
        if (festival.festivalId === id) {
          return { ...festival, like: !festival.like };
        }
        return festival;
      });
      return { likeFestivalList: updateList };
    }),
}));

export default useLikeStore;
