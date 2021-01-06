<?php
namespace App\Http\Validation;


class LoginValidation{
    public function rules(){
        return[
            'email' => ['required','email'],
            'password' => ['required','string'],
        ];
    }

    public function message(){
        return[
            'email.required' => 'vous devez spécifier votre email',
            'password.required' => 'mot de passe obligatoire',
        ];
    }
}
