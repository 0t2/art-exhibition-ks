### 高雄市政府文化局-展覽活動

:point_right:一個目前只有登入 + 收藏功能的網頁:point_left:

資料來源: [高雄市政府文化局-展覽活動], [高雄市文化局文化中心展覽訊息]

#### 簡易使用
1. Firebase 建立專案
    1. 專案設定 -> 服務帳戶 -> Firebase Admin SDK -> 產生新的私密金鑰 
        - 將下載的檔案重新命名為 firebase.json 並放到 src/main/resources 底下
    2. 專案設定 -> 一般 -> 將 Firebase 加入您的網路應用程式 -> 複製 config 到以下兩個檔案
        - art-exhibition-khcc/src/environments/environment.prod.ts
        - art-exhibition-khcc/src/environments/environment.ts
    3. Authentication -> 登入方式 -> 啟用
    4. Database => 規則
        ```json
          {
            "rules": {
              "users": {
                "$uid": {
                  ".write": "$uid === auth.uid",
                  ".read": "$uid === auth.uid"
                }
              },
              ".read": true,
              ".write": "auth != null"
            }
          }
        ```
5. 用 [VS Code] 打開 art-exhibition-khcc 資料夾，執行 `npm run build` (需在 Linux 或 [Bash on Windows] 才可執行)
6. 用 [IntelliJ IDEA]，執行 ArtExhibitionKsApplication

#### Spring Boot
1. 取得資料並轉存至 Firebase
2. 下載圖片至本機，~~減少對高雄市政府文化局網站的攻擊~~
3. 定期更新資料

#### Angular(art-exhibition-khcc)
1. UI: [Angular Flex Layout] + [Angular Material]
2. Data: [AngularFire2]



[高雄市政府文化局-展覽活動]: https://data.kaohsiung.gov.tw/opendata/DetailList.aspx?CaseNo1=AS&CaseNo2=4&Lang=C&FolderType=U
[高雄市文化局文化中心展覽訊息]: http://www.khcc.gov.tw/home02.aspx?ID=$5703&IDK=2&EXEC=L
[VS Code]: https://code.visualstudio.com/
[Bash on Windows]: https://msdn.microsoft.com/zh-tw/commandline/wsl/
[IntelliJ IDEA]: https://www.jetbrains.com/idea/
[Angular Flex Layout]: https://github.com/angular/flex-layout
[Angular Material]: https://material.angular.io/
[AngularFire2]: https://github.com/angular/angularfire2
