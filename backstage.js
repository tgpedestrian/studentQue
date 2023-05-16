///////////////首頁搜尋///////////////

$('#searchQusBackstage').on('click',function(e){
    e.preventDefault()

    let title = $('#queTitleBackstage').val()
    let startTime = $('#startDateSearch').val()
    let endTime = $('#endDateSearch').val()
    console.log(startTime);
    console.log(endTime);
    search(title, startTime, endTime)

})

///////////////刪除問卷///////////////

$(document).on('click','button[id*=deleteHomePage]',function(e){

    let delIds = [];
    $('input[id*=ckb]:checked').each(function() {
        if ($(this).prop('checked') == true) {  
        delIds.push($(this).prop('id').split('_')[2])
        }
    })

    delete_questionnaire(delIds)
    // console.log(delIds);
}) 