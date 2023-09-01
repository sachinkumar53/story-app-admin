import { doc, getDoc } from "firebase/firestore";
import { usersRef } from "../firebase/FirebaseApp";

export async function getAuthorNameById(authorId: string): Promise<string> {
    const docRef = doc(usersRef, authorId);
    const userSnapshot = await getDoc(docRef);
    const userData = userSnapshot.data();
    if (userData !== undefined) {
        return userData.name;
    } else {
        return "unknown";
    }
}