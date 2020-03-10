function ajax(options) {
    var defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function() {},
        error: function() {}
    };
    Object.assign(defaults, options);
    var xhr = new XMLHttpRequest();
    var params = '';
    for (var arr in defaults.data) {
        params += arr + '=' + defaults.data[arr] + '&';
        params = params.substr(0, params.length - 1);
    }
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params;
    }
    xhr.open(defaults.type, defaults.url, true);
    if (defaults.type == 'post') {
        xhr.setRequestHeader('Content-type', defaults.header['Content-type']);
        if (defaults.header['Content-type'] == 'application/json') {
            xhr.send(JSON.stringify(defaults.data));
        } else {
            xhr.send(defaults.data);
        }
    } else {
        xhr.send();
    };
    xhr.onload = function() {
        var contentType = defaults.header['Content-type'];
        var responseText = xhr.responseText;
        if (contentType == 'application/json') {
            responseText = JSON.parse(responseText);
        }
        if (xhr.status == 200) {
            defaults.success(responseText, xhr);
        } else {
            defaults.error(responseText, xhr);
        }
    }
    xhr.error = function() {
        defaults.error(xhr);
    }
}