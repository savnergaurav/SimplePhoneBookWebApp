var group_list = [];
var contact_group_list = [];
var back_end_port = "8080";
var my_host = "http://" + window.location.hostname + ":" + back_end_port;

function clear_elements(lst) {
    for (var i = 0; i < lst.length; i++) {
        lst[i].value = "";
    }
}

function edit_contact(id, row) {
    id = $("#contacts tr:nth-child(" + row + ") td:nth-child(1)").html();
    $('#edit-contact').children("input[name='id']").val(id);
    fname = $("#contacts tr:nth-child(" + row + ") td:nth-child(2)").html();
    $('#edit-contact').children("input[name='fname']").val(fname);
    lname = $("#contacts tr:nth-child(" + row + ") td:nth-child(3)").html();
    $('#edit-contact').children("input[name='lname']").val(lname);
    email = $("#contacts tr:nth-child(" + row + ") td:nth-child(4)").html();
    $('#edit-contact').children("input[name='email']").val(email);
    phonenum = $("#contacts tr:nth-child(" + row + ") td:nth-child(5)").html();
    $('#edit-contact').children("input[name='phonenum']").val(phonenum);
    $('#edit-contact').show();
}

function del_contact(id) {
    // alert('needs implementation\najax to delete contact with id :' + id);
    //ajax to delete contact with id 'id'
    $.ajax({
        url: my_host + "/contacts/" + id,
        type: "delete",
        success: function (result) {
            alert(result);
            getTable();
        },
        contentType: "application/json",
        error: function () {
            alert("error");
        }
    });

}

function group_contact_proceed(id, row) {
    $('#contact-group').children("input[name='id']").val(id);
    fname = $("#contacts tr:nth-child(" + row + ") td:nth-child(2)").html();
    $('#contact-group').children("p[name='fname']").html('Fname : ' + fname);
    lname = $("#contacts tr:nth-child(" + row + ") td:nth-child(3)").html();
    $('#contact-group').children("p[name='lname']").html('Lname : ' + lname);
    email = $("#contacts tr:nth-child(" + row + ") td:nth-child(4)")
        .html();
    $('#contact-group').children("p[name='email']").html('Email : ' + email);
    phonenum = $(
        "#contacts tr:nth-child(" + row + ") td:nth-child(5)").html();
    $('#contact-group').children(
        "p[name='phonenum']").html('Phonenum : ' + phonenum);
    txt = "<table class='table table-striped table-bordered'><tr>"
    for (var i = 0; i < group_list.length; i++) {
        //if ele in contact_group_list make checked=true
        txt += '<td><input class="group_selection" type="checkbox" name="' + group_list[i]['name'] + '" id_="' +
            group_list[i]['id'] +
            '" value="' +
            group_list[i]['name'] + '">&nbsp;' +
            group_list[i]['name'] + '</td>'
        if (i != 0 && (i + 1) % 5 == 0) {
            txt += '</tr>';
            if (i != group_list.length - 1)
                txt += '<tr>';
        }
    }
    txt += "</table>";
    $('#grp_list_chk').html(txt);
    $('#contact-group').show();
}

function group_contact(id, row) {
    //populate contact_group_list from ajax
    group_contact_proceed(id, row);
}

function del_group(id) {
    // alert('needs implementation\najax to delete group with id :' + id);
    //ajax to delete group with id 'id'
    $.ajax({
        url: my_host + "/groups/" + id,
        type: "delete",
        success: function (result) {
            alert(result);
            getTable();
        },
        contentType: "application/json",
        error: function () {
            alert("error");
        }
    });
}

function rename_group(id, row) {
    $('#edit-group').children("input[name='id']").val(id);
    g_name = $("#groups tr:nth-child(" + row + ") td:nth-child(2)").attr('cont');
    $('#edit-group').children("input[name='g_name']").val(g_name);
    $('#edit-group').show();
}

function show_g_contacts(row) {
    curr = $('#sub_butn_' + row).html();
    if (curr == "Hide") {
        $("#group_table tr:nth-child(" + row + ") td:nth-child(3)").children('.sub_table').hide();
        $('#sub_butn_' + row).html('Show');
    } else {
        $("#group_table tr:nth-child(" + row + ") td:nth-child(3)").children('.sub_table').show()
        $('#sub_butn_' + row).html('Hide');
    }

}

function getTable() {
    $.ajax({
        url: my_host + "/groups",
        type: "GET",
        success: function (result) {
            group_list = []
            var tab_txt =
                "<table id='group_table' class='table table-striped table-bordered'>";
            tab_txt +=
                "<tr><th style='display:none'>ID</th><th>Group name</th><th>Contacts</th></tr>"
            for (var i = 0; i < result.length; i++) {
                i_num = i + 2
                group_list.push({
                    'id': result[i]['id'],
                    'name': result[i]['name']
                });
                var cnt = result[i]['contact'].length;
                tab_txt += "<tr><td style='display:none'>" + result[i]['id'] +
                    "</td><td cont='" +
                    result[i]['name'] + "'>" +
                    result[i]['name'] +
                    "&nbsp;<div style='width:100%;text-align:right;display:inline-block;'><button style='display:none' onclick='rename_group(\"" +
                    result[i]['id'] + "\"," + i_num +
                    ")'>Rename</button>&nbsp;<button onclick='del_group(\"" +
                    result[i]['id'] + "\")'>Delete</button></div></td><td valign='top'>"
                cnt;
                if (cnt > 0) {
                    i_num = i + 2
                    tab_txt += cnt +
                        "&nbsp;<button id='sub_butn_" + i_num +
                        "' onclick='show_g_contacts(" +
                        i_num +
                        ")'>Show</button><br><br><table style='display: none' class='sub_table table table-striped table-bordered '>";
                    tab_txt +=
                        "<tr><th style='display:none'>ID</th><th>fname</th><th>lname</th><th>email</th><th>phonenum</th></tr>";
                    for (var j = 0; j < cnt; j++) {
                        tab_txt += "<tr><td style='display:none'>" + result[i]['contact'][j]
                            ['id'] +
                            "</td>" + "<td>" + result[i]['contact'][j]['fname'] +
                            "</td>" + "<td>" + result[i]['contact'][j]['lname'] +
                            "</td>" + "<td>" + result[i]['contact'][j]['email'] +
                            "</td>" + "<td>" + result[i]['contact'][j]['phonenum'] +
                            "</td>" + "</tr>";
                    }
                    tab_txt += "</table>"
                } else {
                    tab_txt += "0</td>"
                }

                tab_txt += "</tr>";
            };
            tab_txt += "</table>";
            $("#groups").html(tab_txt);
        },
        error: function () {
            alert("error");
        }
    });

    $.ajax({
        url: my_host + "/contacts",
        type: "GET",
        success: function (result) {
            var tab_txt = "<table class='table table-striped table-bordered'>";
            tab_txt +=
                "<tr><th style='display:none'>ID</th><th>fname</th><th>lname</th><th>email</th><th>phonenum</th><th>&nbsp;</th></tr>";
            for (var i = 0; i < result.length; i++) {
                i_num = i + 2;
                tab_txt += "<tr><td style='display:none'>" + result[i]['id'] +
                    "</td>" + "<td>" + result[i]['fname'] +
                    "</td>" + "<td>" + result[i]['lname'] +
                    "</td>" + "<td>" + result[i]['email'] +
                    "</td>" + "<td>" + result[i]['phonenum'] +
                    "</td>" + "<td>" + "<button onclick='edit_contact(\"" + result[i]['id'] +
                    "\"," + i_num +
                    ")'>Edit</button>&nbsp;&nbsp;<button onclick='del_contact(\"" +
                    result[
                        i]['id'] +
                    "\")'>Delete</button>&nbsp;&nbsp;<button onclick='group_contact(\"" +
                    result[i]['id'] +
                    "\"," + i_num + ")'>Group</button>" + "</tr>";
            }
            tab_txt += "</table>";
            $("#contacts").html(tab_txt);
        },
        error: function () {
            alert("error");
        }
    });
}
$(document).ready(function () {
    getTable();
    $(".clear").click(function () {
        eles = $(this).parent('div').children("input");
        clear_elements(eles);
    });
    $(".close_").click(function () {
        $(this).parent('div').hide();
    });
    $("#g_save").click(function () {
        par = $(this).parent('div');
        my_json = JSON.stringify({
            "name": $(this).parent('div').children("input[name='g_name']").val(),
        })
        $.ajax({
            url: my_host + "/groups",
            type: "post",
            data: my_json,
            contentType: 'application/json',
            error: function (e) {
                alert("error");
            },
            success: function (res) {
                alert(res);
                par.hide();
                getTable();
            }
        });
    });

    $("#create-new-contact").click(function () {
        $("#create-contact").show();
    });
    $("#create-new-group").click(function () {
        $("#create-group").show();
    });
    $("#c_save").click(function () {
        par = $(this).parent('div');
        my_json = JSON.stringify({
            "fname": $(this).parent('div').children("input[name='fname']").val(),
            "lname": $(this).parent('div').children("input[name='lname']").val(),
            "email": $(this).parent('div').children("input[name='email']").val(),
            "phonenum": $(this).parent('div').children(
                "input[name='phonenum']").val()
        })
        $.ajax({
            url: my_host + "/contacts",
            type: "post",
            data: my_json,
            success: function (result) {
                console.log($(this).parent('div').children(
                    "input[name='fname']").val())
                alert(result);
                par.hide();
                getTable();
            },
            contentType: "application/json",
            error: function () {
                alert("error");
            }
        });
    });

    $("#c_save_edit").click(function () {
        par = $(this).parent('div');
        my_json = JSON.stringify({
            "id": $(this).parent('div').children("input[name='id']").val(),
            "fname": $(this).parent('div').children("input[name='fname']").val(),
            "lname": $(this).parent('div').children("input[name='lname']").val(),
            "email": $(this).parent('div').children("input[name='email']").val(),
            "phonenum": $(this).parent('div').children(
                "input[name='phonenum']").val()
        });
        id = par.children('input[name="id"]').val();
        // alert('needs implementation\najax to update set contact at id :' + id + ' with data\n' + my_json);
        //ajax to update set contact with my_json at id 'id'
        console.log(my_json);
        $.ajax({
            url: my_host + "/contacts/" + id,
            type: "put",
            data: my_json,
            success: function (result) {
                alert(result);
                par.hide();
                getTable();
            },
            contentType: "application/json",
            error: function () {
                alert("error");
            }
        });
    });

    $("#g_save_edit").click(function () {
        par = $(this).parent('div');
        my_json = JSON.stringify({
            "id": $(this).parent('div').children("input[name='id']").val(),
            "name": $(this).parent('div').children("input[name='g_name']").val(),
        });
        id = par.children('input[name="id"]').val();
        // alert('needs implementation\najax to update set group at id :' + id + ' with data\n' + my_json);
        //ajax to update set group with my_json at id 'id'
        $.ajax({
            url: my_host + "/groups/" + id,
            type: "put",
            data: my_json,
            success: function (result) {
                alert(result);
                par.hide();
                getTable();
            },
            contentType: "application/json",
            error: function () {
                alert("error");
            }
        });
    });

    $("#g_c_save").click(function () {
        par = $(this).parent('div');
        var selected_groups = [];
        $('.group_selection:checkbox:checked').each(function () {
            selected_groups.push($(this).attr('id_'));
        });
        alert(JSON.stringify(selected_groups));
        contact_id = $(this).parent('div').children('input[name="id"]').val();
        // alert(
        //     'needs implementation\najax to update set and insert group_contact_conn_table for contact_id :' +
        //     contact_id +
        //     ' with group_ids\n' + JSON.stringify(selected_groups));
        //ajax to update set and insert group_contact_conn_table for contact_id with groups in selected_groups
        $.ajax({
            url: my_host + "/groups/contact/" + contact_id,
            type: "post",
            data: JSON.stringify(selected_groups),
            success: function (result) {
                alert(result);
                par.hide();
                getTable();
            },
            contentType: "application/json",
            error: function () {
                alert("error");
            }
        });
    });
});