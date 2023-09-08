//グローバル変数宣言
let tbl;    //画面上のテーブル

//画面読込時
window.onload = function(){
    //画面上のテーブルの情報を取得
    tbl = document.getElementById('tbl')    //画面上のテーブル

    //保持しているテーマ名をテーブルに初期値としてセット
    //Storageに登録されているテーマ名の配列を一旦Json型で取得
    var jsonHeader = localStorage.getItem('themeName');
    //取得したJsonデータを配列に変換
    var themeArray = JSON.parse(jsonHeader);
    //テーマ名の配列に何か登録されている場合のみ
    if(themeArray != null){
        for(var row = 1; row <= 3; row++){   //列数だけ繰り返す
            //Keyを生成
            var key = 'theme' + row;
            //テーマをセットするセルを取得
            var themeCell = document.getElementById(key);
            //取得したテーマ名をヘッダに設定
            themeCell.value = themeArray[row -1];
        }    
    }

    //保持している単語をテーブルに初期値としてセット
    for(var row = 1; row <= 3; row++){   //列数だけ繰り返す

        //storageのKeyを生成
        var storageKey = 'theme' + row;
        //Storageに登録されている配列を一旦Json型で取得
        var json = localStorage.getItem(storageKey);
        //取得したJsonデータを配列に変換
        var wordArray = JSON.parse(json);
        //配列に何か登録されている場合のみ
        if(wordArray != null){
            for(var column = 1; column <= wordArray.length; column++){  //行数だけ繰り返す
                //テーブルの行数が配列の要素数以下の場合
                if(tbl.children[1].children.length < column){
                    //テーブルの行を追加
                    insertRow();
                }
                //Keyを生成
                var key = 'text' + row + '_' + column;
                //単語をセットするセルを取得
                var textCell = document.getElementById(key);
                //セットする単語を取得
                var text = wordArray[column -1];
                //単語をテキストボックスにセット
                textCell.value = text;
            }    
        }
    }
}

//単語登録ボタン押下時
function setWords(notMsgFlg){
    //テーブルヘッダからテーマ名を取得
    //テーマ名を登録する配列を定義
    var themeArray = [];
    for(var row = 1; row <= 3; row++){   //列数だけ繰り返す
        //Keyを生成
        var key = 'theme' + row;
        //テーマ名を取得
        var themeName = document.getElementById(key).value;
        //取得したテーマ名が空欄の場合、テーマ名に"theme + row"を設定
        if(!themeName.trim()){
            themeName = key;
        }
        //テーマ名を配列に追加
        themeArray.push(themeName.trim());
    }
    //テーマ名の配列をJson型に変換
    var jsonHeader = JSON.stringify(themeArray);
    //Storageにテーマ名の配列を登録
    localStorage.setItem('themeName', jsonHeader);
    
    //テーブル本体から単語を取得
    for(var row = 1; row <= 3; row++){   //列数だけ繰り返す
        //単語を登録する配列を定義
        var wordArray = [];

        for(var column = 1; column <= tbl.children[1].children.length; column++){  //行数だけ繰り返す
            //Keyを生成
            var key = 'text' + row + '_' + column;
            //単語を取得
            var text = document.getElementById(key).value;
            //テキストボックスに単語が入っている場合のみ配列に追加
           if(text.trim()){
               wordArray.push(text.trim());
           }
        }
        //配列をJson型に変換
        var json = JSON.stringify(wordArray);
        //storageのKeyを生成
        var storageKey = 'theme' + row;
        //Storageに配列を登録
        localStorage.setItem(storageKey, json);
    }

    //引数に値が入っていない場合
    if(!notMsgFlg){
        //登録完了メッセージを画面表示
        alert('登録しました。');
    }

    //TestCode
    //変数宣言
    //let inputWord ='';
    // for(var row = 1; row < 4; row++){ //列数だけ繰り返す
    //     //Keyを生成
    //     var key = 'theme' + row;
    //     //テーマ名をメッセージにセット
    //     inputWord = inputWord + '[' + localStorage.getItem(key) + '] '

    //     for(var column = 1; column < 6; column++){  //行数だけ繰り返す
    //         //Keyを生成
    //         var key = 'text' + row + '_' + column;
    //         //単語を取得
    //         var text = localStorage.getItem(key);
    //         //テキストボックスが空文字、NULL、UNDEFINEDの場合は次の列へ移行
    //         //それ以外の場合は単語をメッセージにセット
    //         if(!text){
    //             continue;
    //         }
    //         else{
    //             if(column > 1){
    //                 inputWord = inputWord + ', ' + text;
    //             }
    //             else{
    //                 inputWord = inputWord + text;
    //             }
    //         }              
    //     }

    //     //改行コードのセット
    //     if(row < 3){
    //         inputWord = inputWord + '\n';
    //     }
    // }
    // alert('登録しました。\n' + inputWord);
}

//クリアボタン押下時
function clearWords(){
    localStorage.clear();
    alert('クリアしました。');
}

//お題生成ボタン押下時
function createTheme(){
    //変数宣言
    let theme = '今回のお題は\n'; //生成されたお題を格納する文字列

    //お題生成前に単語登録処理を実行
    setWords('notMsg');

    //テーマごとに単語をランダムに取得
    for(var row = 1; row <= 3; row++){   //列数だけ繰り返す
        //Keyを生成
        var key = 'theme' + row;
        //お題にテーマ名を設定
        theme = theme + '[' + document.getElementById(key).value + ']';

        //変数宣言
        var words = []; //単語を格納するリスト
        var word = '';  //ランダムに取得した単語を格納する文字列
        //登録されている単語をリストに格納
        for(var column = 1; column <= tbl.children[1].children.length; column++){   //行数だけ繰り返す
            //Keyを生成
            var key = 'text' + row + '_' + column;
            //単語を取得
            var text = document.getElementById(key).value;
            //取得した単語が空文字、NULL、UNDEFINED以外の場合
            if(text.trim()){
            //単語をリストにセット
            words.push(text);
            }
        }

        //リストから単語をランダムに取得
        var ran = Math.floor(Math.random() * words.length);
        word = words[ran];
        //取得した単語をお題に設定
        if(row <= 2){
            theme = theme + word + ' × ';
        }
        else
        {
            theme = theme + word;
        }
    }

    alert('生成しました。\n' + theme);
}

//行追加ボタン押下時
function insertRow(){
    //行を行末に追加
    let tr = tbl.children[1].insertRow(-1);
    //追加行に列数だけセルを追加
    for(var row = 1; row <= 3; row++){   //列数だけ繰り返す
        //新しいtd要素を作成して変数に格納
        let td = document.createElement("td");
        //新しいinput要素を作成して変数に格納
        let txtbox = document.createElement("input");
        //idの文字列を生成
        let idName = "text" + row + "_" + tbl.children[1].children.length;
        //input要素にid属性を付与
        txtbox.setAttribute("id", idName);
        //input要素にtype属性を付与
        txtbox.setAttribute("type", "text");
        //tdにテキストボックスを追加
        td.appendChild(txtbox);
        //trにtdを追加
        tr.appendChild(td);
    }
}
