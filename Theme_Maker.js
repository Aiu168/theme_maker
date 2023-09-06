//画面読込時
window.onload = function(){
    //保持しているテーマ名をテーブルに初期値としてセット
    for(var row = 1; row < 4; row++){   //列数だけ繰り返す
        //Keyを生成
        var key = 'theme' + row;
        //テーマをセットするセルを取得
        var themeCell = document.getElementById(key);
        //取得したテーマ名をヘッダに設定
        themeCell.value = localStorage.getItem(key);
    }

    //保持している単語をテーブルに初期値としてセット
    for(var row = 1; row < 4; row++){   //列数だけ繰り返す
        for(var column = 1; column < 6; column++){  //行数だけ繰り返す
            //Keyを生成
            var key = 'text' + row + '_' + column;
            //単語をセットするセルを取得
            var textCell = document.getElementById(key);
            //セットする単語を取得
            var text = localStorage.getItem(key);
            //テキストボックスが空文字、NULL、UNDEFINEDの場合は次の列へ移行
//            if(!text){
//                continue;
//            }
//            else{
                //単語をKeyと共に保持
                textCell.value = text;
//            }
        }
    }
}

//単語登録ボタン押下時
function setWords(){
    //変数宣言
    let inputWord ='';
    let tbl = document.getElementById('tbl')    //画面上のテーブル
    //テーブルヘッダからテーマ名を取得
    for(var row = 1; row < 4; row++){   //列数だけ繰り返す
        //Keyを生成
        var key = 'theme' + row;
        //テーマ名を取得
        var themeName = document.getElementById(key).value;
        //テーマ名をKeyと共に保持
        localStorage.setItem(key, themeName);
    }
    
    //テーブル本体から単語を取得
    for(var row = 1; row < 4; row++){   //列数だけ繰り返す
        for(var column = 1; column < 6; column++){  //行数だけ繰り返す
            //Keyを生成
            var key = 'text' + row + '_' + column;
            //単語を取得
            var text = document.getElementById(key).value;
            //テキストボックスが空文字、NULL、UNDEFINEDの場合は次の列へ移行
//            if(!text){
//                continue;
//            }
//            else{
                //単語をKeyと共に保持
                localStorage.setItem(key, text);
//            }
        }
    }

    //TestCode
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

    alert('登録しました。');
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

    //テーマごとに単語をランダムに取得
    for(var row = 1; row < 4; row++){   //列数だけ繰り返す
        //Keyを生成
        var key = 'theme' + row;
        //お題にテーマ名を設定
        theme = theme + '[' + localStorage.getItem(key) + ']';

        //変数宣言
        var words = []; //単語を格納するリスト
        var word = '';  //ランダムに取得した単語を格納する文字列
        //登録されている単語をリストに格納
        for(var column = 1; column <6; column++){   //行数だけ繰り返す
            //Keyを生成
            var key = 'text' + row + '_' + column;
            //単語を取得
            var text = localStorage.getItem(key);
            //取得した単語が空文字、NULL、UNDEFINEDの場合は次の列へ移行
            //それ以外の場合は単語をリストにセット
            if(!text){
                continue;
            }
            else{
                words.push(text);
            }              
        }

        //リストから単語をランダムに取得
        var ran = Math.floor(Math.random() * words.length);
        word = words[ran];
        //取得した単語をお題に設定
        if(row < 3){
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
// function addColumn(){
//     //変数宣言
//     let tbl = document.getElementById('tbl');   //画面のテーブル
//     let tr = document.createElement("tr");      //空の行要素

//     for(var row = 1; row < 4; row++){   //列数だけ繰り返す
//         //新しいtd要素を作成して変数に格納
//         let td = document.createElement("td");
//         //新しいinput要素を作成して変数に格納
//         let txtbox = document.createElement("input");
//         //tdにテキストボックスを追加
//         td.appendChild(txtbox);
//         //trにtdを追加
//         tr.appendChild(td);
//     }

//     //完成したtrをテーブルに追加
//     tbl.appendChild(tr);
// }
