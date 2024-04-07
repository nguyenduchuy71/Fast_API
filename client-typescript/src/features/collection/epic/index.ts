import { create } from "zustand";
import axios from "axios";
import { configHeaders, handleErrorStatus } from "@/utils/helpers";
import { triggerNotify } from "@/utils/messages";
import { storage } from "@/firebase/config";
import { ICollectionStore } from "./interface";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

export const useCollectionStore = create<ICollectionStore>((set, get) => ({
  collections: [],
  error: null,
  getCollectionEpic: async () => {
    try {
      const accessToken = sessionStorage.getItem("auth");
      const headers = configHeaders(accessToken);
      const res = await axios.get(`${BASEURL}/collections`, {
        headers,
      });
      const data: [] = res.data;
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      const listImage = await storage.ref().child(userInfo.userId);
      let list_storage_image = [];
      listImage
        .list()
        .then((result) => {
          result.items.forEach(async (imageRef) => {
            const srcImage = await imageRef.getDownloadURL();
            imageRef.getMetadata().then((metadata) => {
              const metadataImage = { ...metadata, srcImage };
              list_storage_image = [...list_storage_image, metadataImage];
              if (data.length === list_storage_image.length) {
                set({ collections: list_storage_image });
              }
            });
          });
        })
        .catch((error) => {
          set({ error });
        });
    } catch (error) {
      handleErrorStatus(error);
    }
  },
  uploadCollectionEpic: async (files) => {
    try {
      const accessToken = sessionStorage.getItem("auth");
      const headers = configHeaders(accessToken, "multipart/form-data");
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      await axios.post(`${BASEURL}/collections`, formData, {
        headers,
      });
      triggerNotify("Upload collections successfull");
    } catch (error) {
      handleErrorStatus(error);
    }
  },
  deteleCollectionEpic: async (imagePath: string) => {
    try {
      const accessToken = sessionStorage.getItem("auth");
      const headers = configHeaders(accessToken);
      const res = await axios.delete(`${BASEURL}/collections/${imagePath}`, {
        headers,
      });
      if (res.data === 204) {
        const updateCollections = get().collections.filter(
          (collection) => collection.fullPath !== imagePath
        );
        set({ collections: updateCollections });
        triggerNotify("Remove image successfull");
      }
    } catch (error) {
      handleErrorStatus(error);
    }
  },
}));
