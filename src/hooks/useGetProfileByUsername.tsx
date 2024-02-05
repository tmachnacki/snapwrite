import { toast } from "sonner";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "@/lib/firebase";
import { useUserProfileStore } from "@/store/userProfileStore";

const useGetUserProfileByUsername = (username: string | undefined) => {
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    if(!username) return;
    
    const getUserProfileByUsername = async() => {
      console.log("fetch user");
      setIsLoadingUser(true);
      try {
        const q = query(collection(firestore, "users"), where("username", "==", username));
        const userSnapshot = await getDocs(q);
  
        if (userSnapshot.empty) {
          console.log('emp')
          setUserProfile(null);
          setUserNotFound(true);
        }
        
        let userDoc: DocumentData = {};
        userSnapshot.forEach((doc) => {
          userDoc = doc.data();
        });
        setUserProfile(userDoc);
        setUserNotFound(false);
        
      } catch (error) {
        toast.error("Unable to get user profile", { description: `${error}` })
      } finally {
        setIsLoadingUser(false);
      }
    }

    getUserProfileByUsername();
  }, [setUserProfile, username])

  return { isLoadingUser, userNotFound, userProfile };
}

export { useGetUserProfileByUsername };

