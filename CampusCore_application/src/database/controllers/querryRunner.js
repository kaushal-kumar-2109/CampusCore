import * as SQLite from "expo-sqlite";
import { getUserDataQuery } from "./userQuery";

/* ******************** get userdata query runner function start here ******************** */
const getUserData = async (db) => {
    try{
        if (!db) {
            db = await SQLite.openDatabaseAsync("campuscore.db");
        } 
        const user = await db.getFirstAsync(getUserDataQuery);
        if(!user || user == null || user === "null"){
            return ({status:404,message:"User Not FOund"});
        }
        return({status:200,message:"User found",data:user});
    }catch(err){
        console.log("Error in geting user data error : ",err.message);
    }

}
/* ******************** get userdata query runner function ends here ******************** */

export {getUserData};