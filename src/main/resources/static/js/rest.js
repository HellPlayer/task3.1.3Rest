$(document).ready(function () {
    getUsers();
    addNewUser();


    function getUsers() {
        fetch("http://localhost:8080/rest/users/", {
            method: "GET"
        }).then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then((data) => {
                    console.log('creating a table');
                    makeTable(data);
                });
            }
        )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });

        function makeTable(data) {
            let wrapColumn = function (value) {
                return "<td>" + value + "</td>";
            };
            $("#usersTable tbody").append("<tr>" +
                "<th>ID</th>" +
                "<th>Username</th>" +
                "<th>Password</th>" +
                "<th>E-Mail</th>" +
                "<th>Role</th>" +
                "<th>Edit</th>" +
                "<th>Delete</th>" +
                "</tr>");
            for (let i = 0; i < data.length; i += 1) {
                let trId = data[i].id;
                let editButton = '<button type="button" class="btn btn-info eBtn">Edit</button>';
                let deleteButton = '<button type="button" class="btn btn-danger dBtn">Delete</button>';
                $("#usersTable tbody").append("<tr id=" + trId + ">" +
                    wrapColumn(data[i].id) +
                    wrapColumn(data[i].username) +
                    wrapColumn(data[i].password) +
                    wrapColumn(data[i].email) +
                    wrapColumn(data[i].roles) +
                    wrapColumn(editButton) +
                    wrapColumn(deleteButton) +
                    "</tr>")
            }

            $('#usersTable .eBtn').on('click', function (event) {
                event.preventDefault();
                let trId = $(this).closest('tr').attr('id');
                let url = "http://localhost:8080/rest/users/" + trId
                fetch(url, {
                    method: 'GET'
                }).then((res) => res.json())
                    .then((data) => {
                        let roles = data.roles;
                        $('.myForm #id').val(data.id);
                        $('.myForm #username').val(data.username);
                        $('.myForm #password').val(data.password);
                        $('.myForm #email').val(data.email);
                        $('.myForm #userRoles').val(roles);
                        if (roles.includes('USER')) {
                            $('#USER').prop('checked', true);
                        }
                        if (roles.includes('ADMIN')) {
                            $('#ADMIN').prop('checked', true);
                        }
                    })
                $('.myForm #editModal').modal();
                document.getElementById('editBtn').addEventListener('click', ev => {
                    ev.preventDefault();

                    let id = document.getElementById('id').value;
                    let username = document.getElementById('username').value;
                    let password = document.getElementById('password').value;
                    let email = document.getElementById('email').value;

                    let roleUser = document.getElementById('USER')
                    let roleAdmin = document.getElementById('ADMIN')
                    let rolesArr;
                    if (roleAdmin.checked) {
                        rolesArr = [roleAdmin.value]
                    }
                    if (roleUser.checked) {
                        rolesArr = [roleUser.value]
                    }
                    if (roleAdmin.checked && roleUser.checked) {
                        rolesArr = [roleAdmin.value, roleUser.value]
                    }
                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: id,
                            username: username,
                            password: password,
                            email: email,
                            roles: rolesArr
                        })
                    }).then(res => res.json())
                        .then(data => {
                            $('#usersTable tbody').empty();
                            getUsers();
                        })
                        .catch(function (error) {
                            console.log('Request failed', error);
                        });
                }, {once: true})
            });

            $('#usersTable .dBtn').on('click', function (event) {
                event.preventDefault();
                $('#delModal').modal();
                document.getElementById('delBtn').addEventListener('click', ev => {
                    ev.preventDefault();
                    let trId = $(this).closest('tr').attr('id');
                    let url = "http://localhost:8080/rest/users/" + trId
                    fetch(url, {
                        method: "DELETE"
                    }).catch(function (err) {
                        console.log('Fetch Error :-S', err);
                    });
                    $(this).parents('tr').remove();
                }, {once: true})
            });
        }
    }

    function addNewUser() {
        document.getElementById('newUserForm').addEventListener('submit', ev => {
            ev.preventDefault();
            let username = document.getElementById('newUsername').value;
            let password = document.getElementById('newPassword').value;
            let email = document.getElementById('newEmail').value;

            let roleUser = document.getElementById('USER')
            let roleAdmin = document.getElementById('ADMIN')
            let rolesArr;
            if (roleAdmin.checked) {
                rolesArr = [roleAdmin.value]
            }
            if (roleUser.checked) {
                rolesArr = [roleUser.value]
            }
            if (roleAdmin.checked && roleUser.checked) {
                rolesArr = [roleAdmin.value, roleUser.value]
            }

            fetch("http://localhost:8080/rest/users/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: null,
                    username: username,
                    password: password,
                    email: email,
                    roles: rolesArr
                })
            }).then(res => res.json())
                .then(data => {
                    $('#usersTable tbody').empty();
                    getUsers();
                })
                .catch(function (error) {
                    console.log('Request failed', error);
                });
            formClear();
        });

        function formClear() {
            $("#newUsername").val("");
            $("#newPassword").val("");
            $("#newEmail").val("");
            $('#USER').prop('checked', false);
            $('#ADMIN').prop('checked', false);
            console.log('clear form');
        }
    }
});




