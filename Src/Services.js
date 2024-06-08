import AsyncStorage from '@react-native-async-storage/async-storage';
import { ID, Account, Client, Databases,Users, Teams } from 'appwrite';
import Snackbar from 'react-native-snackbar';

const appwriteClient = new Client();
export const COLLECTION_ID = "665516e3003276b86a56"
export const DATABASES_ID = "665516d10010ade0b602"


const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "663f74e9000dc2479cbc";

appwriteClient
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

const account = new Account(appwriteClient);
export const database = new Databases(appwriteClient)
export const team = new Teams(appwriteClient);


// Create a new user account in Appwrite
export async function createAccount( email, password, name ) {
    try {
        const userAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        );
        if (userAccount) {
            // Automatically log in the user after creating the account
            const data = await loginWithAppwrite( email, password );
          return data ;
        } else {
            return userAccount;
        }
    } catch (error) {
        Snackbar.show({
            text: String(error),
            duration: 5000
        });
        console.log("Appwrite service :: createAccount() :: " + error);
    }
}

// Login user account
export async function loginWithAppwrite( email, password ) {
    try {
        const data =  await account.createEmailPasswordSession(email, password);
        AsyncStorage.setItem('user',JSON.stringify(data));
        return data ;
    } catch (error) {
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG
        });
        console.log("Appwrite service :: login() :: " + error);
    }
}

// Get current user
export async function getCurrentUser() {
    try {
        const data = await account.get(); 
        if(data?.$id){
            AsyncStorage.setItem('user',JSON.stringify(data));
        }
        console.log(data)
        return data;
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser() :: " + error);
    }
}

// Logout user
export async function logout() {
    try {
        return await account.deleteSession('current');
    } catch (error) {
        console.log("Appwrite service :: logout() :: " + error);
    }
}
export const listUsers = async () => {
    try {
      const response = await team.list();
    //   console.log(response)
      return response // returns the list of users
    } catch (error) {
      console.error('Failed to list users:', error);
      return [];
    }
  };
  export const createTeam = async (id,name,role) => {
    try {
      const response = await team.create(id,name,role);
    //   console.log(response)
    //   return response.users; // returns the list of users
    return response
    } catch (error) {
      console.error('Failed to list users:', error);
      return [];
    }
  };
  
