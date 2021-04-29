import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

const SCRIPTS_FILE_NAME = 'scripts.json';

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
        fs.mkdirSync(path.join(userRoot, '.cprocess'));
        fs.mkdirSync(path.join(userRoot, '.cprocess', 'menu'));
        fs.writeFile(path.join(userRoot, '.cprocess', 'menu', SCRIPTS_FILE_NAME),"[]",()=>{

        });
    },
    getRomConfigFileList: function(userRoot:string){
        let metaData = fs.readFileSync(path.join(userRoot, '.cprocess', 'menu', SCRIPTS_FILE_NAME));
        return JSON.parse(metaData.toString());
    },
	addRomToResposity: function(userRoot:string, srcPath:string){
        let romConfigList = this.getRomConfigFileList(userRoot);
        romConfigList = romConfigList ? romConfigList : [];
        let exist = false;
        romConfigList.forEach((romConfig: { path: string; })=>{
            if(romConfig.path == srcPath){
                exist = true;
            }
        })
        !exist && romConfigList.push({
			label: srcPath,
            path: srcPath
        });
        this.writeMetaInfo(userRoot, romConfigList);
    },
	writeMetaInfo:function(userRoot:string, metaInfo:string){
        let pa=path.join(userRoot, '.cprocess', "menu",SCRIPTS_FILE_NAME)
        vscode.window.showInformationMessage(pa);
        fs.writeFileSync(pa,JSON.stringify(metaInfo));
    }
}