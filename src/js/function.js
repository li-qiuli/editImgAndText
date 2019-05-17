
window.onload=function(){
    var imgModel=' <img id="imgConent" class="div_HA9n1i" src="./imgs/224823.jpg"/>'
    var textModel='<p>235345346</p>'
    $('#img').click(function(){ 
        $('#addText') .append(imgModel)
  })

    $('#addContent').click(function(){ 
        $('#addText') .append(textModel)
    })
    var removeDom=null
    $('#change').click(function(){
        // removeDom.replace(tinymce.activeEditor.getContent())
        removeDom[0].outerText=tinymce.activeEditor.getContent()
        console.log(2211,removeDom[0].outerText=6)
        console.log(222,tinymce.activeEditor.getContent())
    })


    
    $("#addText").on("click","p",function(){ 
        $(this)[0].style.border='1px solid red'
        tinymce.activeEditor.setContent($(this)[0].outerText)
        removeDom=  $(this)
    });
    $("#addText").on("click","img",function(){ 
        $(this)[0].style.border='1px solid red'
        tinymce.activeEditor.setContent($(this)[0].currentSrc)
         removeDom=  $(this)
    });
    $("#removeText").click(
        function(){
            removeDom.remove() 
        }
    )




    $(document).on("click", "#test", function (e) {
        var message=$('#addText')[0].innerHTML
        bootbox.dialog({
            buttons: {
                ok: {
                    label: '关闭',
                    className: 'btn-myStyle'
                }
            },
            message:message,
            title: "预览效果",
        });
    })
}