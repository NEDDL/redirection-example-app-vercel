// import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
// import { db } from "../../../src/database/firebaseConfig";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const jsonData = await getData();
    res.status(200).json(jsonData);
  } catch (err) {
    console.log("Error: ", err);
    res.status(400).end();
  }
};

export async function getData() {
  const redirections = [
    {
      source: "/test",
      destination: "/redirection-page",
      status: "301",
    },
    {
      source: "/gone",
      destination: "/api/410",
      status: "410",
    },
  ];

  return redirections;
}

// The code below is my original code that fetches the data from Firebase

// export async function getData() {
//   const redirectionsCollectionRef = await collection(db, "redirections");
//   const activeRedirections = await query(
//     redirectionsCollectionRef,
//     where("active", "==", true)
//   );
//   const documentSnap = await getDocs(activeRedirections);
//   const redirections = await documentSnap.docs.map((doc) => ({
//     source: doc.data().source.substr(20),
//     destination: doc.data().destination?.substr(20) || "/api/410",
//     status: doc.data().status,
//   }));
//   return redirections;
// }
