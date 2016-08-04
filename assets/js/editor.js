//client side javascript
AlloyEditor.editable("titleText");
AlloyEditor.editable("pageContent");


document.getElementById("save-changes-btn").addEventListener("click", function save() {
    post("/post", buildFormObject(), "post");
});

function post(path, params, method) {
    method = method || "post";

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    //lets do it the old fashion way
    var arr = Object.keys(params);
    for(var c = 0; c < arr.length; c++) {
        var key = arr[c];

    // for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }
    console.log("sending form with", form)
    document.body.appendChild(form);
    form.submit();
}

function buildFormObject() {
    return {
        titleText : document.getElementById("titleText").innerHTML,
        pageContent : document.getElementById("pageContent").innerHTML
    };
}
