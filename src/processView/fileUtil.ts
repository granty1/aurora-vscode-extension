import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

const PROCESS_FILE_NAME = 'process.json';

export const FileUtil = {
    pathExists: function(p: string) {
		try {
			fs.accessSync(p);
		} catch (err) {
			return false;
		}
		return true;
    },
    createDefaultANesFloder:function(userRoot:string){
        console.log("start  create file        ",path.join(userRoot, '.cprocess', PROCESS_FILE_NAME));
        fs.writeFile(path.join(userRoot, '.cprocess', PROCESS_FILE_NAME),"[]",()=>{
            console.log("create file        ",path.join(userRoot, '.cprocess', PROCESS_FILE_NAME));
        });
    },
    getRomConfigFileList: function(userRoot:string){
        let metaData = fs.readFileSync(path.join(userRoot, '.cprocess', PROCESS_FILE_NAME));
        return JSON.parse(metaData.toString());
    },
	addRomToResposity: function(userRoot:string, srcPath:string){
        let romConfigList = this.getRomConfigFileList(userRoot);
        romConfigList = romConfigList ? romConfigList : [];
        let exist = false;
        romConfigList.forEach((romConfig: { label: string; })=>{
            if(romConfig.label == srcPath){
                exist = true;
            }
        })
        let tmpPath:String
        if(os.platform().indexOf('win') > -1){
            tmpPath = srcPath.substring(0,srcPath.lastIndexOf('\\')+1)+"log\\"
        }
        else{
            tmpPath = srcPath.substring(0,srcPath.lastIndexOf('/')+1)+"log/"
        }
        !exist && romConfigList.push({
			label: srcPath,
            path: tmpPath
        });
        this.writeMetaInfo(userRoot, romConfigList);
    },
	writeMetaInfo:function(userRoot:string, metaInfo:string){
        let pa=path.join(userRoot, '.cprocess', PROCESS_FILE_NAME)
        vscode.window.showInformationMessage(pa);
        fs.writeFileSync(pa,JSON.stringify(metaInfo));
    }
}