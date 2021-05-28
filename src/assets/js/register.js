function validateInput(email, password, passwordConfirm){
    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    if(email.match(EMAIL_REG)){
        $('#email').removeClass('is-invalid');
    }else{
        $('#email').addClass('is-invalid');
    }
    if(password.length > 2){
        $('#password').removeClass('is-invalid');
    }else{
        $('#password').addClass('is-invalid');   
    }
    if(passwordConfirm === password){
        $('#passwordConfirm').removeClass('is-invalid');
    }else{
        $('#passwordConfirm').addClass('is-invalid');
    }
    if(!email.match(EMAIL_REG) || password.length <= 2 || password !== passwordConfirm)
        return true;
    return false;
}
function handleClickRegisterBtn(){
    $('#registerBtn').on('click', function(event){
        event.preventDefault();
        let email = $('#email').val();
        let password = $('#password').val();
        let passwordConfirm = $('#passwordConfirm').val();
        let fullName = $('#fullName').val();

        let check = validateInput(email, password, passwordConfirm);
        if(!check){
            $.ajax({
                url: `${window.location.origin}/register-new-user`,
                method: "POST",
                data: {fullName: fullName, email: email, password: password, passwordConfirm: passwordConfirm},
                success: function(data){
                    alert('Created User Successfully!')
                    window.location.href = '/login';
                },
                error: function(error){
                    alert(error.responseText);
                }
            });
        } 
    });
}
$(document).ready(function(){
    handleClickRegisterBtn();
});