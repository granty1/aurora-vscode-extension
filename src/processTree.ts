import * as vscode from 'vscode'
import * as path from 'path';
import * as os from "os";
import { FileUtil } from "./fileUtil";

export class ProcessTree implements vscode.TreeDataProvider<TreeNode> {
    private _onDidChangeTreeData: vscode.EventEmitter<TreeNode | undefined | void> = new vscode.EventEmitter<TreeNode | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<TreeNode | undefined | void> = this._onDidChangeTreeData.event;
	readonly userRoot 

    constructor(context: vscode.ExtensionContext){
		
		this.userRoot = os.homedir();
        if(!FileUtil.pathExists(path.join(this.userRoot, '.cprocess'))) {
            //if not exists create default ahost floder
            try{
                FileUtil.createDefaultANesFloder(this.userRoot);
            }catch(e){
                vscode.window.showInformationMessage('Ahost need Administrator permission!');
            }
        }
    }
	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
    getTreeItem(element: TreeNode): vscode.TreeItem{
        return element;
    }
    getChildren(element?: TreeNode){
		let romConfigFileList = FileUtil.getRomConfigFileList(this.userRoot);
        console.log(`romConfigFileList ${JSON.stringify(romConfigFileList)}`);
        if( romConfigFileList && romConfigFileList.length > 0){
            let hostConfigs:any = [];
            romConfigFileList.forEach((romConfig:any) => {
                hostConfigs.push(new TreeNode(romConfig.path));
            })
            return hostConfigs;
        }else{
            return Promise.resolve([]);
        }
    }
	deleteProcess(item : any){
		let romConfigList = FileUtil.getRomConfigFileList(this.userRoot);
        if(romConfigList && romConfigList.length > 0){
            let deleteIndex = -1;
            romConfigList.forEach((romConfig:any,index:number)=>{
                if(romConfig.label == item.label){
                    deleteIndex = index;
                }
            });
            deleteIndex > -1 && romConfigList.splice(deleteIndex,1);
            FileUtil.writeMetaInfo(this.userRoot,romConfigList);
            this.refresh();
        }
	}
}

export class TreeNode extends vscode.TreeItem {

	constructor(
		public readonly label: string
	) {
		super(label, vscode.TreeItemCollapsibleState.None);
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
	};

}
