import fs from 'fs';


const deleteFiles = (filePath)=>{
    fs.unlink(filePath, (err)=>{
        if(err){
            throw(err);
        }
    })
}

export default deleteFiles;