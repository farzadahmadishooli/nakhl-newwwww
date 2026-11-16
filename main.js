const {app,BrowserWindow}=require('electron'),fs=require('fs'),path=require('path');
let win,q=false;
async function bak(){try{const d=await win.webContents.executeJavaScript("localStorage.getItem('nakhl-db')");if(!d)return;const dir=path.join(app.getPath('documents'),'Nakhl-Backups');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'nakhl-backup-'+new Date().toISOString().slice(0,10)+'.json'),d)}catch(e){}}
app.whenReady().then(()=>{win=new BrowserWindow({width:1200,height:800,autoHideMenuBar:true,title:'نخل'});win.loadFile('www/index.html');setInterval(bak,120000);win.on('close',async e=>{if(q)return;e.preventDefault();await bak();q=true;win.close()})});
app.on('window-all-closed',()=>app.quit());
