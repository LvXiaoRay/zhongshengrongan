var HOST = 'http://61.147.96.16:9001';
//var HOST = 'http://61.147.96.16:8000';
function ajax(type, url, params) {
    if(params) params["_"] = new Date().getTime();
    var dtd = $.Deferred();
    var data = new FormData();
    for(var key in params) {
        data.append(key, params[key]);
    }
    $.ajax({
        url: HOST + url,
        data: type == "POST" ? data : params,
        type: type,
        contentType: type != "POST",
        processData: type != "POST",
        headers: readToken() == "" || readToken() == null ? undefined : {
            "X-User-Token": readToken()
        }

    }).done(function(data) {
        dtd.resolve(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        dtd.reject(jqXHR.status, errorThrown, jqXHR);
    });
    return dtd;
}

function _get(url, params) {
    return ajax("GET", url, params);
}

function _post(url, params) {
    return ajax("POST", url, params);
}

function _delete(url, params) {
    return ajax("DELETE", url, params);
}

function readToken() {
    return localStorage.getItem("token");
}

function saveToken(token) {
    localStorage.setItem("token", token);
}
