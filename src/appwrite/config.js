import conf from "../conf/conf";
import { Client, Databases, ID,Storage,Query } from "appwrite";

export class Service{
   client = new Client();
   databases;
   bucket;


   constructor(){
    this.client
    .setEndpoint(conf.appwriteurl)
    .setProject(conf.appwriteProjectId);

    this.databases=new Databases(this.client);
    this.bucket=new Storage(this.client);
   }

   async createPost({Title,Slug,Content,FeaturedImage,Status,UserId}){
        try{
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            Slug,
            {
                Title,
                Slug,
                Content,
                FeaturedImage,
                Status,
                UserId,
                
            }
        )
        }catch(error){
            console.log('Appwrite service:: createPost :: error',error);
        }
   }

   async updatePost(Slug,{Title,Content,FeaturedImage,Status}){
    try{
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            Slug,
            {
                Title,
                Content,
                FeaturedImage,
                Status
            }
        )
    }catch(error){
        console.log('Appwrite service:: updatePost :: error',error);
    }
   }

   async deletePost(Slug){
    try{
         await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            Slug,//this is our document id
         )
         return true;
    }catch(error){
        console.log('Appwrite service:: deletePost :: error',error);
         return false;
    }
      
   }

   async getPost(Slug){
       try{
           return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            Slug,
           )
       }catch(error){
        console.log('Appwrite service:: deletePost :: error',error);
       }
   }

   async getPosts(queries=[Query.equal("Status","active")]){
    try{
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      )
    }catch(error){
        console.log('Appwrite service:: deletePost :: error',error);

        return false;
    }
   }

   //file upload services

   async uploadFile(file){
    try{
          return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
          )
    }catch(error){
        console.log('Appwrite service:: deletePost :: error',error);
         return false;
    }
   }

   async deleteFile(fileId){
    try{
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId,
          )
          return true;
    }catch(error){
        console.log('Appwrite service:: deletePost :: error',error);

        return false;
    }
   }

   getFilePreview(fileId){
       return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
       )
   }
}
const service=new Service();
export default service;
  