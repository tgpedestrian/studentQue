///-----創建問卷-----///
function create_questionnaire(epName, textName, strDate, endDate) {

    let objPostData = {
        title: epName,
        description: textName,
        startTime: strDate,
        endTime: endDate,
    }
$.ajax({
    url: "http://localhost:8080/create_questionnaire",
    method: 'POST',
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(objPostData),
    success: function (response) {
        let { message } = response
        // alert(message)
        
        
    },
    error: function (e) {
        console.log(e)
        alert('Failed')
    },
})
}


///-----創建題目-----///
function create_questionnaire2(title, description, startTime, endTime, qaList) {
    
    let objPostData = {
        title: title,
        description: description,
        startTime: startTime,
        endTime: endTime,
        qaList: qaList
    }
$.ajax({
    url: "http://localhost:8080/create_questionnaire",
    method: 'POST',
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(objPostData),
    success: function (response) {
        let {message } = response
        // alert(message)
    
    
    },
    error: function (e) {
        console.log(e)
        alert('Failed')
    },
})
}


///-----確認問卷名稱是否重複-----///
function check_title_duplicate(epName) {
    let objPostData = {
        title: epName
    }

$.ajax({
    url: "http://localhost:8080/check_title_duplicate",
    method: 'POST',
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(objPostData),
    success: function (response) {
        let {message } = response
        if(message==='問卷名稱已存在'){
            alert(message)
        }
    
    },
    error: function (e) {
        console.log(e)
        alert('Failed')
    },
})
}
//修改問卷
// function update_questionnaire(epName, textName, strDate, endDate) {
//     let objPostData = {
//         title: epName,
//         description: textName,
//         startTime: strDate,
//         endTime: endDate
//     }
// $.ajax({
//     url: "http://localhost:8080/update_questionnaire",
//     method: 'POST',
//     contentType: "application/json",
//     dataType: "json",
//     data: JSON.stringify(objPostData),
//     success: function (response) {
//         let {message } = response
//         alert(message) 
    
//     },
//     error: function (e) {
//         console.log(e)
//         alert('Failed')
//     },
// })
// }

	///-----填寫問卷-----///
    function write_questionnaire(name, phone, Email, age, ansString, finishTime, questionnaireTitle, gender) {

        let objPostData = {
        name: name,
        phone: phone,
        Email: Email,
        age: age,
        ansString:ansString,
        finishTime:finishTime,
        questionnaireTitle:questionnaireTitle,
        gender:gender
        }
     $.ajax({
        url: "http://localhost:8080/write_questionnaire",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (response) {
            let { message } = response
            // alert(message)
            
            },
            error: function (e) {
                console.log(e)
                alert('Failed')
            },
        })
        }


        ///-----讀取填問卷-----///
    function read_all_users(questionnaireTitle) {
        let suppage = '';
        let nextpage = '';
        suppage = '<button id="sup-page" class="page-btn">上一页</button>&nbsp;&nbsp;&nbsp;';
        nextpage = '&nbsp;&nbsp;&nbsp;<button id="next-page" class="page-btn">下一页</button>';
        let objPostData = {
            questionnaireTitle:questionnaireTitle
       
        }
     $.ajax({
        url: "http://localhost:8080/read_all_users",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (response) {
            let { message,usersList } = response
            // alert(message)
            //==
            changePageForPeople(1, usersList);

            var page = document.querySelector('.page_btnForPeople'); //要塞按鈕的位置

            var btnNum = Math.ceil(usersList.length / 10); //算出每頁要顯示10筆資料所需要的按鈕 ##

            console.log(btnNum + "btnNum")

            let str = '';

            // //看要幾個按鈕，塞進span並且顯示在heml元素的容器
            for (var i = 0; i < btnNum; i++) {
                str += `<span id="spanPage">${i + 1}</span>`;

            };

            // //塞進html元素中的容器
            page.innerHTML = suppage + str + nextpage;

            // //使用 querySelectorAll 選出下面所有的按鈕
            var btn = document.querySelectorAll('.page_btnForPeople span')

            // //選取到了每顆按鈕後，我們分別去做綁定監聽的動作
            for (var i = 0; i < btn.length; i++) {
                btn[i].addEventListener('click', changePageForPeople.bind(this, (i + 1), usersList))
            }

            // //監聽上一頁、下一頁
            const nextPageBtn = document.querySelector('#next-page');
            const supPageBtn = document.querySelector('#sup-page');
            supPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber <= 1) {
                    changePageForPeople(1, usersList);
                } else {
                    //回到當前頁面的上一筆
                    changePageForPeople(pageNumber - 1, usersList);
                }
            });

            nextPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber >= btn.length) {

                    changePageForPeople(pageNumber, usersList);
                } else {
                    //回到當前頁面的下一筆
                    changePageForPeople(pageNumber + 1, usersList);
                }
            });

            //==
        //     $('#tab3feedBack').empty()
        //     $('#tab3feedBack').append(`<thead>
        //     <tr>
        //         <th>#</th>
        //         <th>姓名</th>
        //         <th>填寫時間</th>
        //         <th>觀看細節</th>
        //     </tr>
        //     </thead>`)

        //     $.each(usersList, function(index, value){
        //         let num = index + 1
        //     $('#tab3feedBack').append(`<tr><td>${num}</td><td>${value.name}</td/><td>${value.finishTime}</td/><td><button id="GotofeedbackBtn_${value.id}">前往</button></td></tr>`)
            
        // })
        
            },
            error: function (e) {
                console.log(e)
                alert('Failed')
            },
        })
        }


        ///-----上一頁 下一頁 問卷回饋分頁-----///
        function changePageForPeople(page, data) {

            //全域變數:用於得知當前頁數
            pageNumber = page;
            console.log(pageNumber + "頁")
        
            //代表每頁出現 10 筆資料
            var items = 10;
        
            //按鈕按下 1，會出現 1～10筆資料，但陣列索引值卻是 0～9 的資料，以此類推
            var pageIndexStart = (page - 1) * items
        
            var pageIndexEnd = page * items
        
            //每次近來這function先清空
            $('#tab3feedBack').empty()
        
        
            $('#tab3feedBack').append(`<thead>
                    <tr>
                        <th>#</th>
                        <th>姓名</th>
                        <th>填寫時間</th>
                        <th>觀看細節</th>
                    </tr>
                    </thead>`)
        
            //索引1-10資料
            for (var i = pageIndexStart; i < pageIndexEnd; i++) {
                if (i >= data.length) { break; }
                let num = i + 1;
                //解構，看第幾筆資料
                let item = data[i]
                let time = (item.finishTime).replace('T', ' ')
                $('#tab3feedBack').append(`<tr><td>${num}</td><td>${item.name}</td/><td>${time}</td/><td><button id="GotofeedbackBtn_${item.id}">前往</button></td></tr>`)
            }
        };


        ///-----讀取使用者資料-----///
        function read_user_info(usersId) {
            let objPostData = {
                usersId:usersId
           
            }
         $.ajax({
            url: "http://localhost:8080/read_user_info",
            method: 'POST',
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(objPostData),
            success: function (response) {
                let { message,user } = response
                // alert(message)
            
                $('#userName').val(user.name)
                $('#userGender').val(user.gender)
                $('#userPhone').val(user.phone)
                $('#userEmail').val(user.email)
                $('#userAge').val(user.age)
                $('#userFinish').val(user.finishTime.replace('T',' '))

                let qa = user.userAns.split(',')
                for(let item of qa){
                    let question = item.split('=')[0].trim()
                    let answer = item.split('=')[1].trim()

                    if(answer.includes(';')){
                        manyAns = answer.split(';')

                        for(let item2 of manyAns){
                            $('#topic1').find('#'+question +'_'+item2).prop("checked",true)
                        }
                    }else{
                        $('#topic1').find('#'+question +'_'+answer).prop("checked",true)
                    }

                
                    // $("#check123").prop("checked",true)
                }
                
            
                
                },
                error: function (e) {
                    console.log(e)
                    alert('Failed')
                },
            })
            }  

            ///-----顯示統計資料帶入問卷Id-----///
            function ans_statistics(questionnaireId) {
                let objPostData = {
                    questionnaireId : questionnaireId
                
                }
            $.ajax({
                url: "http://localhost:8080/ans_statistics",
                method: 'POST',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(objPostData),
                success: function (response) {
                    let { message,qaStatisticsMap } = response
                    // alert(message)
                    
                    $('#tab4statistics').empty()
                    $.each(qaStatisticsMap, function(key,value){
                    
                        $('#tab4statistics').append(`<canvas id="myChart_${key}"></canvas> 
                        <br>
                        <hr>
                        <br>`)
                        
                        let ansList = []
                        let statistics = []
                        let question = key

                        let staticsMap = value
                        $.each(staticsMap, function(key2,value2){
                            ansList.push(key2)
                            statistics.push(value2)
                        })

                        const ctx = document.getElementById('myChart_'+question);

                    new Chart(ctx, {
                    type: 'pie',
data: {
    labels: ansList,
    datasets: [{
    label: question,
    data: statistics,
    borderWidth: 1
    }]
},
options: {
    scales: {
    y: {
        beginAtZero: true
    }
    }
}
});
                    })
                    
                
                    
                    },
                    error: function (e) {
                        console.log(e)
                        alert('Failed')
                    },
                })
                }  






