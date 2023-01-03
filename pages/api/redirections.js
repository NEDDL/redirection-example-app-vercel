import * as admin from "firebase-admin";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  async function getData() {
    const firebaseAdminConfig = {
      type: "service_account",
      project_id: "soleilex-d817e",
      private_key_id: "3a4756b1cc6912a68342c67ddc9a09f40bfb6276",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7cIll8a0iqDF1\np1sxxvs6w71P3nKZFvpI+rOItwTTpH9LjqBr6XYRdY94UkmWkhigPumiR1aKYaKc\nBcPskJR0yunToZS0/auYatv8aVJCHgp4c5k4gL5zzNjhcrYszhR8fzRmKZIGa21Q\n3ZZEZPpkH25jZ+mRoFkwej8NvGoeogTyAsD3xXcJYAQby6IUGTWTQIOAoxTaQ8pQ\nS+SV8eJthkBvLcRhRbLXvG3o66wzsOiGRCDVDOomamF31rurMTi2e219kRYEUeSq\n/OlApyNuW+JhqClS9BzWDM+DTdTGLeHBrUDgt1TP1MHE7V26ILg2rYQRtjd2m5Q7\nOZIfx+PxAgMBAAECggEADAqjhQ1U4FpaTRLqkKTWHHUZOyGRDqUzgI88i+6oDHmv\npNi9lRkrON1q0WHF8PqjQt4vz7lSBbNWiTv0lYTHSMaFZY9mmIcIaFMLHWjdvDom\nVY0lnYPl2FYjY75lFjVKCyJ36Q1IIInzvKNzpSKwlFCRnKi/EFgzCqJ73QPK9Hs7\nfNOP4OLTDkR+36jU7efYMxHtTw+63APOppmFwwiR0yQCZvmIyn72CjGQr2/d75JT\nGM5YMZUzxApQEjqRf04kbFMUcf7qE1J6PKOQsF983sMqny+6bLHzF/0O7HT0c+6N\nt9IdF0O8Tj+6WMONtmQh4bbJS+lVkmMhr5FKR/hn0QKBgQDdu15OYEZ8ShSpaQX9\nCbEOD1TXM+LnU+qKJvq0gy3MZUXqEj8jHDEi8055DA+LXpwmyxjytzdR+PKVaD+b\nHvm9SHGAUiwZsO6iRUtVzVIoJ0bgyA/P4241xdeRsrVBVUsWNDrXYYhhJBo5oq9i\nP0v0uRdlxFNH2w9s3/eWIimaiQKBgQDYaGwxBJDnrfowBQrlIPqYKO9YBrO/i8AD\ntnKnUlyqxsKjQCkXj+oqEQ2imEURh1exE/3dsUZwzrciBR+iMIQNBuo/EWD/p9N4\nM6Iz+hAXTuxtN387BeoHecEkPu6mREVF9WbNzObF8njXqnbdrIw9AGF6Bz25lcI8\nBIma/hQEKQKBgQDCB4Ul5p+ngZgFCy8/VyzFlerzCqeDMG6sCCIYtjXsh66ffuob\nCj+BSxIfYMt1dQwF8nHZazSQmd2Fmp0WXAvEdFFGLiIDNU4NV7/tzGcZVg1zA/66\nN1Wo3oCeMZjlHANB4eCfuuyBvPrp9o+s1KDd/N4ZoqwR1ALyjiZ1DV4EqQKBgETE\nAcUdt1H3Ra3mnEysyxR4xX1KO+nc5XoIiqxCjrGxkP3BEI2tLHKLkrKdAi2MvT/G\no3/DqieEeEr2J9Qo6H0fOmYqBpGWaasjdSJhDqXpbVVTMjm2KmSPuuDiooDw5rZR\nQYaZ2qcB4oZdY4ITJ0jnCxJ0pJeJT/w0UOmQXRnpAoGBAKV5aFmElj6YrbVijp1N\navXG9ajw8QBYyXr8Gb/YQ4kmxgLiLUHbn5Zis2/m/xkAMzo8TVlznI1/iOU2TUYS\nQQ+WyFptICA7uA1QwOgNxLUyI9qKwl5WEZtc3rLaojxtfeUww2OdQj5uFt9aR58v\nejmNKGvA2tm/uEdXJGwWzSBQ\n-----END PRIVATE KEY-----\n",
      client_email:
        "firebase-adminsdk-z9kmv@soleilex-d817e.iam.gserviceaccount.com",
      client_id: "104926427130201504693",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-z9kmv%40soleilex-d817e.iam.gserviceaccount.com",
    };

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseAdminConfig),
      });
    }
    const serverDb = admin.firestore();
    const redirectionsRef = serverDb.collection("redirections");
    const snapshot = await redirectionsRef.where("active", "==", true).get();

    const redirections = await snapshot.docs.map((doc) => ({
      source: doc.data().source.substr(20),
      destination: doc.data().destination?.substr(20) || "/api/410",
      status: doc.data().status,
    }));

    return redirections;
  }
  console.log(await getData());

  try {
    const jsonData = await getData();
    res.status(200).json(jsonData);
  } catch (err) {
    console.log("Error: ", err);
    res.status(400).end();
  }
};
